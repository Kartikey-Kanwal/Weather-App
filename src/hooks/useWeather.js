import { useEffect, useState } from "react"
import {Get_CurrentWeather, Get_CurrentWeather_ByCoords, Get_WeatherForecast} from "../services/WeatherAPI"

export const useWeather = ()=>{
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const [unit, setUnits] = useState("C");

    const fetchWeather_ByPlace = async (Place) =>{
        setLoading(true);
        setError(null);

        try{
            const [weatherData, forecast] = await Promise.all([
                Get_CurrentWeather(Place),
                Get_WeatherForecast(Place),
            ]);

            setCurrentWeather(weatherData);
            setForecast(forecast);
        }
        catch(err){
            setError(
                err instanceof Error ? err.message : "Failed to fetch weather data..."
            )
        }
        finally{
            setLoading(false);
        }
    };

    const fetchWeather_ByLocation = async()=>{
        if(!navigator.geolocation){
            setError("Geolocation is not supported by this browser");
        }

        setLoading(true);
        setError(null);

        navigator.geolocation.getCurrentPosition( async(position)=>{

            try{
                const {latitude, longitude} = position.coords;
                const weatherData = await Get_CurrentWeather_ByCoords(latitude, longitude);

                setCurrentWeather(weatherData);

                const forecastData = await Get_WeatherForecast(weatherData.name);
                setForecast(forecastData);
                // It fetches forecast for the current location.

            }
            catch(err){
                setError(
                err instanceof Error ? err.message : "Failed to fetch weather data..."
            )
            }
            finally{
                setLoading(false);
            }
        },
        (error) =>{
            setError("Unable to retrive your location..");
            setLoading(false);
        }
    )
    };

    const toggleUnit = ()=>{
        setUnits(unit === "C" ? "F" : "C");
    }
    // Toggles the temp unit

    useEffect(()=>{
        fetchWeather_ByPlace("New Delhi");
    }, []);
    // Load default weather

    return {currentWeather,
        forecast,
        loading,
        error,
        unit,
        fetchWeather_ByPlace,
        fetchWeather_ByLocation,
        toggleUnit}
};

