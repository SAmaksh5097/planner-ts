import React, { useEffect, useState } from 'react'
import { MapPin, Sun, MoonStar } from 'lucide-react'
import axios from 'axios'

const Weather = () => {

    const [coords, setCoords] = useState({lat: 28.6519, lon: 77.2315})
    const [data, setData] = useState({})
    const [temp, setTemp] = useState('Getting data...')

    const getdata = async (lat = coords.lat, lon = coords.lon) => {
        try {
            const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,wind_speed_10m,cloud_cover&current=temperature_2m,relative_humidity_2m,is_day,apparent_temperature,wind_speed_10m,cloud_cover,surface_pressure&timezone=auto`)
            setData(response.data)
            setTemp(response.data.current.temperature_2m)
        } catch (error) {
            console.error("Error fetching weather:", error)
            setTemp("Error")
        }
    }

    useEffect(() => {
        getdata()
    }, [])

    const getlocation = () => {
        if (navigator.geolocation) {
            setTemp("Locating...")
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    setCoords({ lat: latitude, lon: longitude })
                    getdata(latitude, longitude)
                },
                (error) => {
                    console.error("Location error:", error)
                    setTemp("Loc Error")
                    getdata()
                }
            )
        } else {
            alert("Geolocation not supported")
        }
    }

    return (
        <div className='w-full max-w-sm mx-auto p-4 rounded-2xl flex flex-col gap-3 outline-0 relative bg-gradient-to-br from-blue-600 to-indigo-900 text-white transition-all ease-in-out shadow-lg'>
            <div className='flex justify-between items-start'>
                <button 
                    onClick={getlocation}
                    className='flex gap-1 items-center text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded-full transition-colors cursor-pointer'
                    title="Update to current location"
                >
                    <MapPin size={14}/>
                    <span>Locate Me</span>
                </button>
                {data?.current?.is_day === 1 ? <Sun className='text-yellow-300'/> : <MoonStar className='text-slate-300'/>}
            </div>

            <h1 className='flex gap-4 items-center text-2xl font-bold mt-2'>
                <span className='flex text-4xl'>{temp}{typeof temp === 'number' ? '°C' : ''}</span>
            </h1>
            
            <div className='grid grid-cols-2 gap-3 text-sm'>
                <h1 className='text-blue-100'>RealFeel: {data?.current?.apparent_temperature}°C</h1>
                <h1 className='text-blue-100'>Humidity: {data?.current?.relative_humidity_2m}%</h1>
                <h1 className='text-blue-100'>Wind: {data?.current?.wind_speed_10m} km/h</h1>
            </div>
        </div>
    )
}

export default Weather