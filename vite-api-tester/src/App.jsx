//import neccessary modules
  import { useState, useEffect } from 'react';
  import './App.css';
  
  const App = () => {
    //create state variables with default values
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  //useEffect hook to fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      const url = 'https://tasty.p.rapidapi.com/recipes/list?from=0&size=3&q=chicken%20soup';
      const options = {
        method: 'GET',
        headers: {
          //would normally use an env file to hide api key
          'X-RapidAPI-Key': '109ea4696fmsh3a46f9a36cab73bp1be7bejsn6fa98eee3d63',
          'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
        },
      };
//error handling
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error('API request failed');
        }
        const data = await response.json();
        console.log(data);
        //set data to data.results
        setData(data.results);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
//call fetchData function
    fetchData();
  }, []);
  

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (data.length === 0) return <div>No data available</div>;
  return (
    <div>
   {data.map((recipe) => {
      if (!recipe.name || !recipe.description) {
        console.warn(`Recipe is missing name or description: ${recipe}`);
        return null;
      }
      return (
        <div key={recipe.id}>
          <h2>{recipe.name}</h2>
          <p>{recipe.description}</p>
        </div>
      );
    })}
  </div>
)};

export default App;
