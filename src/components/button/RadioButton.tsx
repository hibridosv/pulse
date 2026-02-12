"use client";
import useTempSelectedElementStore from '@/stores/tempSelectedElementStore';
import React, { useEffect, useState } from 'react';

export interface Option {
  id: number;
  name: string;
}

interface RadioButtonProps {
  options: Option[];
  optionName?: string;
}

export const RadioButton: React.FC<RadioButtonProps> = ({ options, optionName = "optionSelected" }) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(options[0] || null);
  const { setSelectedElement } = useTempSelectedElementStore();

  useEffect(() => {
    if (options && options.length > 0) {
      setSelectedElement(optionName, options[0]);
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOptionChange = (option: Option) => {
    setSelectedOption(option);
    setSelectedElement(optionName, option);
  };


  return (
    <div className="flex flex-wrap justify-center p-2 rounded-lg bg-bg-subtle/30">
      {options.map((option) => (
        <label
          key={option.id}
          className="flex items-center cursor-pointer px-3 py-2 rounded-md transition-colors duration-200 hover:bg-bg-subtle"
        >
          <input
            type="radio"
            name="radio-group"
            value={option.id}
            checked={selectedOption?.id === option.id}
            onChange={() => handleOptionChange(option)}
            className="hidden peer"
          />
          <span className="w-4 h-4 border-2 rounded-full flex items-center justify-center mr-2 peer-checked:border-primary peer-checked:bg-primary peer-checked:after:block peer-checked:after:w-2 peer-checked:after:h-2 peer-checked:after:rounded-full peer-checked:after:bg-text-inverted peer-checked:after:content-[''] border-text-muted"></span>
          <span className="text-text-base peer-checked:text-primary font-medium">{option.name}</span>
        </label>
      ))}
    </div>
  );

};
