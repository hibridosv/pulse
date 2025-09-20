'use client'
import { getMunicipiosByDepartamentoId } from "@/utils/functions";
import { useEffect, useState } from "react";

export const useTownByDepartament = (departaments, departamentSelected) => {
  const [townsExtracted, setTownsExtracted] = useState([]);

    useEffect(() => {
        if (departaments && departamentSelected) {
            const departmentNames = getMunicipiosByDepartamentoId(departaments, departamentSelected);
            setTownsExtracted(departmentNames);  
        }
    
      }, [departaments, departamentSelected]);

  return { townsExtracted };
};
