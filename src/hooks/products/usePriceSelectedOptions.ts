'use client'
import { useEffect, useState } from 'react'
import { Option } from '@/components/button/RadioButton';

export function usePriceSelectedOptions(options: Option[]) {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

    useEffect(() => {
    if (options.length > 0) {
      setSelectedOption(options[0]);
    }
  }, [options]);

    return { selectedOption, setSelectedOption  }
}
