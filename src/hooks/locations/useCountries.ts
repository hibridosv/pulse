import { useEffect, useState } from "react";

export const useCountries = () => {
  const [countries, setCountries] = useState(null) as any;


  useEffect(() => {
    // Llamar al archivo JSON desde la carpeta public
    fetch('/countries.json')
      .then((response) => response.json())
      .then((jsonData) => setCountries(jsonData))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);


  return { countries };
};
