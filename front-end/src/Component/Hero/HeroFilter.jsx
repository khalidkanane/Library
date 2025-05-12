import React, { useState, useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';

const HeroFilter = () => {
  const navigate = useNavigate();

  useEffect(() => {
    Aos.init();
  }, []);

  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [results, setResults] = useState([]);
  const [noResults, setNoResults] = useState(false); // New state to track if no results are found

  const handleSearch = async (event) => {
    const searchQuery = event.target.value;
    setQuery(searchQuery);

    if (searchQuery.length > 1) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/search?query=${searchQuery}`);
        const data = await response.json();
        setSuggestions([...data.authors, ...data.books]);
        setNoResults(data.authors.length === 0 && data.books.length === 0); // Set noResults based on data
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setSuggestions([]);
      setNoResults(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.title || suggestion.name);
    setResults([suggestion]);

    if (suggestion.name) {
      navigate(`/Authors/${suggestion.id}`);
    } else {
      navigate(`/Books/${suggestion.id}`);
    }
    setSuggestions([]);
  };

  return (
    <div className='bg-black/20 h-full'>
      <div className='h-full flex justify-center items-center p-4 bg-sky/10'>
        <div className='container grid grid-cols-1 gap-4'>
          {/* text section */}
          <div className='text-white'>
            <p data-aos="fade-up">Our packages</p>
            <p data-aos="fade-up" data-aos-delay='300' className='font-bold text-3xl'>
              Search Your Destination
            </p>
          </div>
          {/* form section */}
          <section data-aos="fade-up" data-aos-delay='600' className="space-y-4 rounded-lg dark:bg-gray-900 flex items-center relative">
            <div className="max-w-screen-xl rounded-md mx-auto w-full">
              <div className="relative bg-white shadow-md dark:bg-gray-800 rounded-lg">
                <div className="flex flex-col w-full items-center  p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
                  <div className="w-full bg-red-100 ">
                    <form className="flex items-center relative w-full ">
                      <label htmlFor="simple-search" className="sr-only">Search</label>
                      <div className="relative w-full ">
                        <div className="absolute  inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <input
                          type="text"
                          id="simple-search"
                          className=" w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Search"
                          value={query}
                          onChange={handleSearch}
                          required
                        />
                        {suggestions.length > 0 && (
                          <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-5 max-h-60 overflow-y-auto ">
                            {suggestions.map(suggestion => (
                              <div className='flex p-1 cursor-pointer hover:bg-gray-200 justify-between  border border-t-1 border-sky-500' onClick={() => handleSuggestionClick(suggestion)}>
                                <div className='flex py-2 px-2'>
                                <img src={`http://127.0.0.1:8000/${suggestion.image}`} alt="" className='rounded-full h-6 w-6 border border-gray-100' />
                                <li key={suggestion.id} className="px-2">
                                  {suggestion.title || suggestion.name}
                                </li>
                                </div>
                          { 
                            suggestion.title?(
                                <span class=" px-4 py-2 text-sm font-normal rounded-full text-sky-700  bg-sky-100/60 dark:bg-gray-800">
                                  Book
                                </span>
                            ):(
                              <span class=" px-4 py-2 text-sm font-normal rounded-full text-indigo-700  bg-indigo-200 dark:bg-gray-800">
                               Author
                            </span>
                            )
}
                              </div>
                            ))}
                          </ul>
                        )}
                        {noResults && (
                          <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 p-4 text-center text-gray-500">
                            No results found
                          </div>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* results section */}
        </div>
      </div>
    </div>
  );
}

export default HeroFilter;
