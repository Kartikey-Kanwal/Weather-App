import React from 'react';
import { Calendar, Droplets } from 'lucide-react';
import * as LucideIcons from "lucide-react";
import { formatDate, formatTemperature, getWeatherIcon } from '../utilities/weatherutilities';

function WeatherForecast({ forecast, unit }) {

  // --- Group 3-hour forecasts by day ---
  const groupedForecast = forecast.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toDateString();

    if (!acc[date]) {
      acc[date] = {
        temps: [],
        weatherDescriptions: [],
        pops: [],
        dts: [],
      };
    }

    acc[date].temps.push(item.main.temp);
    acc[date].weatherDescriptions.push(item.weather[0]);
    acc[date].pops.push(item.pop);
    acc[date].dts.push(item.dt);

    return acc;
  }, {});

  // --- Convert grouped data into daily summaries ---
  const dailyItems = Object.entries(groupedForecast).slice(0, 5).map(([date, data]) => {
    const temps = data.temps;
    const avgPop = data.pops.reduce((a, b) => a + b, 0) / data.pops.length;
    const mainWeather = data.weatherDescriptions[0]; // first entry’s weather
    const avgDt = data.dts[Math.floor(data.dts.length / 2)];

    return {
      dt: avgDt,
      weather: [mainWeather],
      pop: avgPop,
      main: {
        temp_max: Math.max(...temps),
        temp_min: Math.min(...temps),
      },
    };
  });

  return (
    <div className='bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8'>
      <div className='flex items-center space-x-3 mb-8'>
        <div className='p-2 bg-white/10 rounded-full'>
          <Calendar className='text-white/80 w-6 h-6' />
        </div>
        <h2 className='text-2xl font-bold text-white'>5 Day Weather Forecast</h2>
      </div>

      <div className='space-y-4'>
        {dailyItems.map((item, index) => {
          const iconName = getWeatherIcon(item.weather[0]);
          const IconComponent = LucideIcons[iconName] || LucideIcons.Cloud;

          return (
            <div
              key={index}
              className='flex items-center justify-between p-5 bg-white/5 backdrop-blur-sm rounded-2xl hover:bg-white/10 transition-all duration-300 group border border-white/10'
            >
              <div className='flex items-center space-x-5 flex-1'>
                <div className='text-white/90 group-hover:text-white transition-all transform group-hover:scale-110 duration-300'>
                  <IconComponent size={40} />
                </div>
                <div className='flex-1'>
                  <div className='text-white font-semibold text-lg'>
                    {index === 0 ? "Today" : formatDate(item.dt)}
                  </div>
                  <div className='text-white/80 text-sm capitalize font-medium'>
                    {item.weather[0].description}
                  </div>
                </div>
              </div>

              <div className='flex items-center space-x-6'>
                <div className='flex items-center space-x-2 text-white/60'>
                  <Droplets className='w-4 h-4 text-blue-300' />
                  <span className='text-sm font-medium'>
                    {Math.round(item.pop * 100)} %
                  </span>
                </div>
                <div className='text-right'>
                  <div className='text-white font-bold text-xl'>
                    {formatTemperature(item.main.temp_max, unit)} °{unit}
                  </div>
                  <div className='text-white/70 text-xl font-medium'>
                    {formatTemperature(item.main.temp_min, unit)} °{unit}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WeatherForecast;


// import React from 'react';
// import { Calendar, Droplets } from 'lucide-react';
// import * as LucideIcons from "lucide-react";
// import { formatDate, formatTemperature, getWeatherIcon } from '../utilities/weatherutilities';

// function WeatherForecast({ forecast, unit }) {
//   const dailyForecast = forecast.list.reduce((acc, item) => {
//     const date = new Date(item.dt * 1000).toDateString();
//     if (!acc[date]) acc[date] = item;
//     return acc;
//   }, {});

//   const dailyItems = Object.values(dailyForecast).slice(0, 5);

//   return (
//     <div className='bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8'>
//       <div className='flex items-center space-x-3 mb-8'>
//         <div className='p-2 bg-white/10 rounded-full'>
//           <Calendar className='text-white/80 w-6 h-6' />
//         </div>
//         <h2 className='text-2xl font-bold text-white'>5 Day Weather Forecast</h2>
//       </div>

//       <div className='space-y-4'>
//         {dailyItems.map((item, index) => {
//           const iconName = getWeatherIcon(item.weather[0]);
//           const IconComponent = LucideIcons[iconName] || LucideIcons.Cloud;

//           return (
//             <div
//               key={index}
//               className='flex items-center justify-between p-5 bg-white/5 backdrop-blur-sm rounded-2xl hover:bg-white/10 transition-all duration-300 group border border-white/10'
//             >
//               <div className='flex items-center space-x-5 flex-1'>
//                 <div className='text-white/90 group-hover:text-white transition-all transform group-hover:scale-110 duration-300'>
//                   <IconComponent size={40} />
//                 </div>
//                 <div className='flex-1'>
//                   <div className='text-white font-semibold text-lg'>
//                     {index === 0 ? "Today" : formatDate(item.dt)}
//                   </div>
//                   <div className='text-white/80 text-sm capitalize font-medium'>
//                     {item.weather[0].description}
//                   </div>
//                 </div>
//               </div>

//               <div className='flex items-center space-x-6'>
//                 <div className='flex items-center space-x-2 text-white/60'>
//                   <Droplets className='w-4 h-4 text-blue-300' />
//                   <span className='text-sm font-medium'>
//                     {Math.round(item.pop * 100)} %
//                   </span>
//                 </div>
//                 <div className='text-right'>
//                   <div className='text-white font-bold text-xl'>
//                     {formatTemperature(item.main.temp_max, unit)} °{unit}
//                   </div>
//                   <div className='text-white/70 text-sm font-medium'>
//                     {formatTemperature(item.main.temp_min, unit)} °{unit}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default WeatherForecast;
