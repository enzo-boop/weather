import React from "react";
import {useEffect, useState} from 'react';

export default function App(){
    const [Lat, setLat] = useState([]);
    const [Long, setLong] = useState([]);
    const [Data, setData] = useState([]);
    
    useEffect(() => {
    const fetchData = async () => {
        navigator.geolocation.getCurrentPosition(function(position) {
          setLat(position.coords.latitude);
          setLong(position.coords.longitude);
        });
  
        await fetch(`https://api.openweathermap.org/data/2.5/weather/?lat=${Lat}&lon=${Long}&units=metric&APPID=2cb47c2248f8cf0de0196e3fef83c5b4`)
        .then(res => res.json())
        .then(result => {
          setData(result)
        });
      }
      fetchData();
    }, [Lat,Long])
return(
    <div className='mainbox' onMouseOver={(e)=>{
        const Interface= document.getElementsByClassName('wheaterinterface')[0];
        e.currentTarget.style.height='320px';
        e.currentTarget.style.width='460px';
        e.currentTarget.style.borderRadius="0 0 50% 0";
        Interface.style.opacity='1';
        e.currentTarget.style.boxShadow=' 0 3px 3px gray';
    }}
    onMouseOut={(e)=>{
        const Interface= document.getElementsByClassName('wheaterinterface')[0];
        e.currentTarget.style.height='32px';
        Interface.style.opacity='0';
        e.currentTarget.style.boxShadow='none';
    }}>{(typeof Data.main) != 'undefined'?
    (<div className='wheaterinterface'>
    <header>
        <h1>Wheater</h1>
        <p>Simple wheather app written in React.js</p>
    </header>
    <div className='city'>
    <span className='cityname'>{Data.name}</span>
    </div>
    <div className='Contents'>
    <div className='temps'>
    <span className='felt'>Felt:{Data.main.feels_like}°</span>
    <span className='temp'>Temp:{Data.main.temp}°</span>
    <span className='max'>Max:{Data.main.temp_max}°</span>
    <span className='min'>Min:{Data.main.temp_min}</span>
    <span className='humidity'>Humidity:{Data.main.humidity}</span>
    </div>
    <img  className='iconweather' src={`http://openweathermap.org/img/wn/${Data.weather[0].icon}@2x.png`} alt='icon'/>
    <span className='description'>{Data.weather[0].description}</span>
    </div>
</div>)
:
(<div>Waiting for data...</div>)}
    </div>
);

}