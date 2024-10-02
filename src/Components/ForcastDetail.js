import React from 'react'
import WeatherIcon from './WeatherIcon'
const ForcastDetail = ({list}) => {
  return (
    <div>
      {
        list?.map((d,i)=>(
            <div key={i}>
                <p>{d?.weather[0].description}</p>
                <WeatherIcon  iconName={d?.weather[0].icon ?? ''} />

                </div>
        ))
      }
    </div>
  )
}

export default ForcastDetail
