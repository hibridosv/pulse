'use client'
import { getMunicipiosByDepartamentoId } from "@/lib/utils";
import { useEffect, useState } from "react";

export const useTownByDepartament = (departaments: any, departamentSelected: any) => {
  const [townsExtracted, setTownsExtracted] = useState([]);

    useEffect(() => {
        if (departaments && departamentSelected) {
            const departmentNames = getMunicipiosByDepartamentoId(departaments, departamentSelected);
            setTownsExtracted(departmentNames);  
        }
    
      }, [departaments, departamentSelected]);

  return { townsExtracted };
};
