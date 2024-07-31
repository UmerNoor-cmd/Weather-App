import { AsyncPaginate } from 'react-select-async-paginate'
import { useState } from "react";
import './search.css'

const Search = ({onSearchChange}) => { 

    const [search, setSearch] = useState(null);
    
    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }

    const loadOptions = async (inputValue) => {
        const API_KEY = 'ce42d91e0b3aebf48cfac26838aecb1f';
        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=5&appid=${API_KEY}`;
    
        try {
            const response = await fetch(url);
            
            // Check for unauthorized error
            if (!response.ok) {
                throw new Error('Unauthorized Error: Make sure your API key is correct');
            }
            
            const data = await response.json();
            
            // Check if data is an array
            if (!Array.isArray(data)) {
                throw new Error('Response data is not an array');
            }
            
            // Map the data to the required format
            const options = data.map((city) => ({
                value: `${city.lat} ${city.lon}`,
                label: `${city.name}, ${city.country}`
            }));
            
            // Return the options object as required by react-select-async-paginate
            return { options };
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            return { options: [] }; // Return an empty array in case of error
        }
    };
    
    
    return (
        <div className="async-paginate__container">
            <AsyncPaginate 
            classNamePrefix='async-paginate'
            placeholder = "Search for your City"
            debounceTimeout={700}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
        </div>
    );
}

export default Search;