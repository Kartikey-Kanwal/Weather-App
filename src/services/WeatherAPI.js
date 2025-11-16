const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
console.log("API KEY:", import.meta.env.VITE_WEATHER_API_KEY);

const BASE_URL = "https://api.openweathermap.org/data/2.5";
const GEO_URL = "https://api.openweathermap.org/geo/1.0";

export const Get_CurrentWeather = async (Place) =>{
   
    try{
        const response = await fetch(`${BASE_URL}/weather?q=${Place}&appid=${API_KEY}&units=metric`);
        
        if(!response.ok){
            if(response.status === 404){
                throw new Error(`${Place} not found, please check the spelling and try again.`)
            }
            else if(response.status === 401){
                throw new Error(`Invalid API Key, please check your OpenWeatherMap API configuration.`)
            }
            else{
            throw new Error(`Weather service is temporarily unavailable. Please try again later.`)
            }
        }

        const data = await response.json () 

        if(!data.dt){
            data.dt = Math.floor(Date.now()/1000);
        }
        return data
        // It ensures we have the correct timestamp if not provided.
    }

    catch(error){
        if(error instanceof TypeError && error.message.includes("fetch")){
            throw new Error("Network error, please check your internet connection and try again.")
        }
        throw error
    }
}

export const Get_CurrentWeather_ByCoords = async (lat, lon) =>{
   
    try{
        const response = await fetch(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        
        if(!response.ok){
            if(response.status === 401){
                throw new Error(`Invalid API Key, please check your OpenWeatherMap API configuration.`)
            }
            else{
            throw new Error(`Weather service is temporarily unavailable. Please try again later.`)
            }
        }

        const data = await response.json ()    
        if(!data.dt){
            data.dt = Math.floor(Date.now()/1000);
        }
        return data
        // It ensures we have the correct timestamp if not provided.
    }

    catch(error){
        if(error instanceof TypeError && error.message.includes("fetch")){
            throw new Error("Network error, please check your internet connection and try again.")
        }
        throw error
    }
}

export const Get_WeatherForecast = async (Place) =>{
   
    try{
        const response = await fetch(`${BASE_URL}/forecast?q=${Place}&appid=${API_KEY}&units=metric`);
        
        if(!response.ok){
            if(response.status === 404){
                throw new Error(`${Place} not found, please check the spelling and try again.`)
            }
            else if(response.status === 401){
                throw new Error(`Invalid API Key, please check your OpenWeatherMap API configuration.`)
            }
            else{
            throw new Error(`Weather service is temporarily unavailable. Please try again later.`)
            }
        }

        return await response.json()
    }

    catch(error){
        if(error instanceof TypeError && error.message.includes("fetch")){
            throw new Error("Network error, please check your internet connection and try again.")
        }
        throw error
    }
}

export const Search_Places = async (query) =>{
   
    try{
        const response = await fetch(`${GEO_URL}/direct?q=${query}&limit=5&appid=${API_KEY}`);
        
        if(!response.ok){
            if(response.status === 401){
                throw new Error(`Invalid API Key, please check your OpenWeatherMap API configuration.`)
            }
            else{
            throw new Error(`Weather service is temporarily unavailable. Please try again later.`)
            }
        }
        
        const data = await response.json()

        return data.map((Place)=>({
            name: Place.name,
            lat: Place.lat,
            lon: Place.lon,
            country: Place.country,
            state: Place.state || "",
        }))
    }

    catch(error){
        if(error instanceof TypeError && error.message.includes("fetch")){
            throw new Error("Network error, please check your internet connection and try again.")
        }
        throw error
    }
}