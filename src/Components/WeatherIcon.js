import React from 'react'
import Image from 'next/image'
const WeatherIcon = ({iconName}) => {
  return (
      <div className='relative h-20 w-20'>
        <Image src={`https://openweathermap.org/img/wn/${iconName}@2x.png`} width={100} height={100} alt='Weather-icon' className='absolute w-full h-full'/>
    </div>
  )
}

export default WeatherIcon
