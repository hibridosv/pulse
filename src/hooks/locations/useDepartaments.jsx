import { useEffect, useState } from "react";

export const useDepartaments = () => {
    const [departaments, setDepartaments] = useState(null);


  useEffect(() => {
    // Llamar al archivo JSON desde la carpeta public
    fetch('/el-salvador.json')
      .then((response) => response.json())
      .then((jsonData) => setDepartaments(jsonData))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);


  return { departaments };
};
