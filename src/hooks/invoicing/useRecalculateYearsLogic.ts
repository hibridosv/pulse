import { useEffect, useState } from 'react'; // Import useMemo


interface Year {
    id: number;
    name: string;
  }


export function useRecalculateYearsLogic() {
    const [years, setYears] = useState<Year[]>([]);

  const months = [
        {id: 1, name: "Enero"},
        {id: 2, name: "Febrero"},
        {id: 3, name: "Marzo"},
        {id: 4, name: "Abril"},
        {id: 5, name: "Mayo"},
        {id: 6, name: "Junio"},
        {id: 7, name: "Julio"},
        {id: 8, name: "Agosto"},
        {id: 9, name: "Septiembre"},
        {id: 10, name: "Octubre"},
        {id: 11, name: "Noviembre"},
        {id: 12, name: "Diciembre"},
    ]
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1; 


    useEffect(() => {
        function getYearsFrom2022() {
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let year = 2022; year <= currentYear; year++) {
            years.push({ id: year, name: year.toString() });
        }
        return years;
        }

        // Actualizar el estado con los años
        setYears(getYearsFrom2022());
    }, []);
    
    return { years, months, currentYear, currentMonth }
}