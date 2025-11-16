import { MapPin, Search, X } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import {Search_Places} from "../services/WeatherAPI"

function SearchBar({onSearch, onLocationSearch, loading}) {

  const [query, setQuery] = useState("");
  const [suggestion, setSuggestions] = useState([]);
  const [showSuggestion, setShowSuggestions] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  const searchRef = useRef();

  useEffect(()=>{
    const handleClickOutSide = (event)=>{
      if (searchRef.current && !searchRef.current.contains(event.target)){
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutSide);
    return ()=> document.removeEventListener("mousedown", handleClickOutSide);
  
  }, []);

  useEffect(()=>{
    const searchTimeOut = setTimeout(async()=>{
      if(query.length > 2){
        setSearchLoading(true);

        try{
          const result = await Search_Places(query);
          setSuggestions(result);
          setShowSuggestions(true);
        }
        catch(err){
          console.error("Search Failed:", err);
        }
        finally{
          setSearchLoading(false);
        }
      }
      else{
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return ()=> clearTimeout(searchTimeOut);
  }, [query]);

  const handleSubmit = (e)=>{
    e.preventDefault();
    if (query.trim()){
      onSearch(query.trim());
      setQuery("");
      setShowSuggestions(false);
    }
    // console.log(query);
  };

  const clearSearch = ()=>{
    setQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSuggestionsClick = (Place) =>{
    const Place_Name = Place.name ? `${Place.name}, ${Place.state}` : Place.name;
    onSearch(Place_Name);
    setQuery("");
    setShowSuggestions(false);
  };

  return (

    <div className="relative w-full max-w-2xl" ref={searchRef}>
      <form className="relative">
        <div className="relative group">

          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400/50 w-5 h-5 group-focus-within:text-white transition-all" />
          
          <input type="text" 
          value = {query}
          onChange = {(e) => setQuery(e.target.value)}
          placeholder="Search for any place worldwide...."
          className="w-full pl-12 pr-24 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-300 hover:bg-white/15"
          />

          {/* CONDITIONAL RENDERING */}

          {/* LOCATION BUTTON */}
          <button
            className="absolute right-12 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-all p-1 rounded-full hover:bg-white/10"
            onClick={onLocationSearch}
            disabled={loading}>
          
            <MapPin className="w-5 h-5" />
          </button>

          {/* CLEAR (X) BUTTON — now left of MapPin */}
          {query && (
            <button
              className="absolute right-24 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-all p-1 rounded-full hover:bg-white/10"
              onClick={clearSearch}>
            
              <X className="w-4 h-4" />
            </button>
          )}


        </div>
      </form>

      {/* CONDITIONAL RENDERING */}
      {showSuggestion && (suggestion.length >0 || searchLoading) && (
      <div className=" absolute top-full left-0 right-0 mt-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden z-50 ">

        {/* CONDITIONAL RENDERING */}
        {searchLoading ? (
        <div className=" p-6 text-center text-white/70 ">
          <div className=" animate-spin rounded-full h-6 w-6 border-2 border-white/30 border-t-white mx-auto "></div>
          <p>Search Places....</p>
        </div>) : (
      suggestion.map((Place, index)=>{
        return (
          <button className=" w-full px-6 py-4 text-left hover:bg-white/10 transition-all duration-200 flex items-center justify-between group border-b border-white/10 last:border-b-0 "
          key={`${Place.name}-${Place.country}-${index}`}
          onClick={()=> handleSuggestionsClick(Place)}>

          <div>

            <div className=" font-medium text-white group-hover:text-white/90 ">{Place.name}
              {Place.state && (
              <span className="text-white/70">,{Place.state}</span>
              )}
            </div>

            <div className=" text-sm text-white/60 ">{Place.country}</div>

          </div>
          
          <Search className=" w-4 h-4 text-white/50 group-hover:text-white/70 transition-all "/>
        
        </button>
        )
      })
      )}

      </div>
      )
      }

    </div>
);
};
export default SearchBar