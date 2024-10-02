'use client'
import Navbar from "@/Components/Navbar";
import axios from "axios";
import { useQuery } from "react-query";
import { TailSpin } from "react-loader-spinner";
import { format, parseISO } from "date-fns";
import Container from "@/Components/Container";
import Sec_Container from "@/Components/Sec_Container";
import THE_Container from "@/Components/THE_Container";
import For_Container from "@/Components/For_Container";
import { useAtom } from "jotai";
import { loadingCityAtom, placeAtom } from "./atom";
import { useEffect } from "react";
export default function Home() {
  const [place, setPlace] = useAtom(placeAtom)
  const [_, setLoadingCityAtom] = useAtom(loadingCityAtom)
  const { data, error, isLoading } = useQuery('repoData', async () => {
    const { data } = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`);
    return data;
  
  });

  

  const firstData = data?.list[0];
  console.log(firstData);
  console.log('data', data);

  const uniqueDates = [
    ...new Set(
      data?.list.map(
        (entry) => new Date(entry.dt * 1000).toISOString().split("T")[0]
      )
    )
  ];

  const firstDataForEachDate = uniqueDates
    .map((date) => {
      if (!data?.list) return null;
      return data.list.find((entry) => {
        const entryDate = new Date(entry.dt * 1000).toISOString().split('T')[0];
        const entryTime = new Date(entry.dt * 1000).getHours();
        return entryDate === date && entryTime >= 6;
      });
    })
    .filter(Boolean);

  console.log("Unique Dates: ", uniqueDates);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen p-5 mx-auto">
        <TailSpin
          height="80"
          width="80"
          color="#0000FF"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <>
      <Navbar />
      <div className="bg-gray-200">
        <main className="min-h-screen container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Today's Weather */}
          <section className="flex flex-col gap-6">
            <h3 className="flex flex-col sm:flex-row items-start sm:items-end text-2xl gap-2 font-semibold">
              <span>{format(parseISO(firstData?.dt_txt ?? ''), 'EEEE')}</span>
              <span className="text-lg">{format(parseISO(firstData?.dt_txt ?? ''), '(dd-MM-yyyy)')}</span>
            </h3>

            <Container {...firstData} {...data} />

            <div className="weather_condition flex flex-col lg:flex-row gap-5">
              {/* Left Container */}
              <Sec_Container {...firstData} />
              {/* Right Container */}
              <THE_Container {...firstData} {...data} />
            </div>
          </section>

          {/* 7-Day Forecast */}
          <section className="flex flex-col gap-6 mt-5">
            <h3 className="text-2xl font-semibold">Forecast (7 days)</h3>
            <div className="weather_condition_7_Days flex flex-col lg:flex-row gap-7 overflow-x-auto">
              {firstDataForEachDate.map((d, i) => (
                <For_Container
                  key={i}
                  {...firstData}
                  {...data}
                  {...d}
                  date={d?.dt_txt ? format(parseISO(d?.dt_txt), 'dd.MM') : 'Invalid Date'}
                  day={d?.dt_txt ? format(parseISO(d?.dt_txt), 'EEEE') : 'Invalid Day'}
                />
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
