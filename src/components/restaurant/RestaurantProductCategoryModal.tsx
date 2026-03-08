'use client';
import { Button, Preset } from '@/components/button/button';
import Modal from '@/components/modal/Modal';
import SkeletonTable from '@/components/skeleton/skeleton-table';
import manageRestaurantStore from '@/stores/restaurant/manageRestaurantStore';
import useTempStorage from '@/stores/useTempStorage';
import { useEffect } from 'react';
import { LuChevronRight } from 'react-icons/lu';

interface Props {
  isShow: boolean;
  onClose: () => void;
}

export function RestaurantProductCategoryModal({ isShow, onClose }: Props) {
  const { categories, loadingCategories, loadCategories, updateProduct, sending } = manageRestaurantStore();
  const { getElement } = useTempStorage();

  const selectedProduct = getElement('menuProduct');

  useEffect(() => {
    if (isShow && !categories) {
      loadCategories('categories?sort=created_at&filterWhere[category_type]==2&filterWhere[is_restaurant]==1');
    }
  }, [isShow, categories, loadCategories]);

  const handleSelect = async (categoryId: string) => {
    if (!selectedProduct) return;
    const success = await updateProduct(selectedProduct.id, { field: 'category_id', data: categoryId });
    if (success) onClose();
  };

  const listItems = categories?.map((cat: any) => {
    const isSelected = cat.id === selectedProduct?.category_id;
    return (
      <li
        key={cat.id}
        onClick={() => handleSelect(cat.id)}
        className={`flex justify-between items-center px-4 py-2.5 cursor-pointer transition-colors text-sm ${isSelected ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-bg-subtle text-text-base'}`}
      >
        <span>{cat.name}</span>
        <LuChevronRight size={16} className="text-text-muted" />
      </li>
    );
  });

  return (
    <Modal show={isShow} onClose={onClose} size="sm" headerTitle="Cambiar Categoría">
      <Modal.Body>
        {loadingCategories || sending ? (
          <SkeletonTable rows={5} columns={1} />
        ) : (
          <ul className="divide-y divide-bg-subtle">
            {listItems}
          </ul>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose} preset={Preset.close} />
      </Modal.Footer>
    </Modal>
  );
}
