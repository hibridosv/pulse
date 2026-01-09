'use client'; 

import { useEffect, useRef, useState } from "react";

export interface SearchInputProps {
    handleSearchTerm: (term: string) => void;
    placeholder?: string;
}

export function SearchInput(props: SearchInputProps) {
  const { handleSearchTerm, placeholder = "Buscar..." } = props;
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTerm = e.target.value;
    setInputValue(newTerm);
    handleSearchTerm(newTerm);
  };

  const clearSearch = () => {
    if (inputValue === '') return; 
    setInputValue('');
    handleSearchTerm('');
    inputRef.current?.focus(); 
  };
  
  return (
    <div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true"  className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" ></path>
            </svg>
          </div>
          <input
            type="text"
            id="search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder={placeholder}
            autoComplete="off"
            required
            value={inputValue}
            onChange={handleInputChange}
            ref={inputRef}
          />

          {inputValue && (
            <button 
              type="button"
              onClick={clearSearch} 
              title="Limpiar búsqueda"
              className="absolute inset-y-0 right-0 flex items-center pr-3 group"
            >
              <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" >
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
            </button>
          )}
        </div>
    </div>
  );
}