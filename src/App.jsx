import React from "react";
import SearchBar from "./components/SearchBar";
import TemperatureToggle from "./components/TemperatureToggle";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";
import WeatherCard from "./components/WeatherCard";
import WeatherForecast from "./components/WeatherForecast";
import { Get_CurrentWeather } from "./services/WeatherAPI";
import { useWeather } from "./hooks/useWeather";

function App() {
  const {
    currentWeather,
    forecast,
    loading,
    error,
    unit,
    fetchWeather_ByPlace,
    fetchWeather_ByLocation,
    toggleUnit

  }= useWeather();

  const handleRetry = ()=>{
    if(currentWeather){
      fetchWeather_ByPlace(currentWeather.name);      
    }
    else{
      fetchWeather_ByPlace("New Delhi");
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* BACKGROUND IMAGE WITH OVERLAY */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/1431822/pexels-photo-1431822.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`,
          minHeight: "100vh",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-purple-900/30 to-indigo-900/40"></div>
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 container mx-auto px-4 py-8 sm:py-6">
        <div className="max-w-7xl mx-auto">
          {/* HEADER SECTION */}
          <div className="text-center mb-12">
            <div className="mb-8">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold ... mb-4 drop-shadow-2xl tracking-tight text-white">
                Weather{" "}
                <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                  App
                </span>
              </h1>
              <p className="text-white/80 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
                Discover the weather in a whole new way with live updates,
                stunning visuals, and accurate forecasts for every corner of the
                globe.
              </p>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-center space-y-6 sm:space-y-4 lg:space-y-0 lg:space-x-6 mb-12">
              <SearchBar
                onSearch = {fetchWeather_ByPlace}
                onLocationSearch = {fetchWeather_ByLocation}
                loading = {loading}
              />
              <TemperatureToggle unit={unit} onToggle={toggleUnit} />
            </div>
          </div>

          {/* MAIN CONTENT CARDS */}
          <div className="space-y-8">
            {/* LoadingSpinner */}
            {loading && (
              <div className="flex justify-center">
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                  <LoadingSpinner />
                  <p className="text-white/80 text-center mt-4 font-medium">
                    Please wait while we update your weather information....
                  </p>
                </div>
              </div>
              )
            }

            {/* Error */}
            {error && !loading && (
              <div className="max-w-2xl sm:max-w-xl mx-auto">
                <ErrorMessage message={error} onRetry={handleRetry} />
              </div>
              )
            }

            {/* Weather Info Card */}
            {currentWeather && !loading && (<div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2">
                <WeatherCard weather = {currentWeather} unit = {unit} forecast = {forecast} />
              </div>
              <div className="xl:col-span-1">
                {/* WEATHER FORECASTING */}
                {forecast && <WeatherForecast forecast={forecast} unit={unit} />}
              </div>
            </div>
            )
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
