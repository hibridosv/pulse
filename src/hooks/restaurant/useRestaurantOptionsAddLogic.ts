import manageRestaurantStore from '@/stores/restaurant/manageRestaurantStore';
import useTempStorage from '@/stores/useTempStorage';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface Variant {
  name: string;
  img: string;
  quantity: number;
}

export function useRestaurantOptionsAddLogic() {
    const { register, handleSubmit, resetField, reset } = useForm();
    const { addOption, sending } = manageRestaurantStore();
    const { getElement, clearElement } = useTempStorage();
    const [modifier, setModifier] = useState('');
    const [variants, setVariants] = useState<Variant[]>([]);

    const selectedImage = getElement("productImageOption") || "default.png";

    const onSubmit = (data: any) => {
        if (!modifier) {
            setModifier(data.name);
            reset();
        } else {
            const variant: Variant = {
                name: data.name,
                img: selectedImage,
                quantity: parseFloat(data.quantity) || 0,
            };
            setVariants((prev) => [...prev, variant]);
            reset();
            clearElement("productImageOption");
        }
    };

    const removeVariant = (name: string) => {
        setVariants((prev) => prev.filter((v) => v.name !== name));
    };

    const removeOption = () => {
        setModifier('');
        setVariants([]);
        clearElement("productImageOption");
    };

    const sendOptions = async () => {
        const payload = {
            option: modifier,
            variants,
        };
        const success = await addOption('restaurant/products/options', payload);
        if (success) {
            removeOption();
            reset();
        }
    };

    return {
        register,
        handleSubmit,
        onSubmit,
        modifier,
        variants,
        removeVariant,
        removeOption,
        sendOptions,
        sending,
        selectedImage,
    };
}
