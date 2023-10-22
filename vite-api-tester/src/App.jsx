


  import { useState, useEffect } from 'react';
  import './App.css';
  
  const App = () => {
    const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const url = 'https://tasty.p.rapidapi.com/recipes/auto-complete?prefix=chicken%20soup';
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '109ea4696fmsh3a46f9a36cab73bp1be7bejsn6fa98eee3d63',
          'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
        },
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error('API request failed');
        }
        const data = await response.json();
        console.log(data);
        setData(data.results);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data.results.map((recipe) => (
        <div key={recipe.id}>{recipe.title}</div>
      ))}
    </div>
  );
};

export default App;
