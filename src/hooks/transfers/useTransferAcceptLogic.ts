import transferAcceptStore from '@/stores/transfers/transferAcceptStore';
import { useEffect } from 'react';

const checkCodReceive = (products: any[]) => {
  if (!products) return false;
  return products.some((p: any) => p.status === 1 && p.cod_receive === '');
};

export const useTransferAcceptLogic = () => {
  const {
    transfers,
    selectedTransfer,
    loading,
    loadingDetail,
    sending,
    loadTransfers,
    checkTransfer,
    rejectProduct,
    createProductRegister,
    acceptAll,
    rejectAll,
    setSelectedTransfer,
    clearSelectedTransfer,
  } = transferAcceptStore();

  useEffect(() => {
    loadTransfers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleShowTransfer = (transfer: any) => {
    setSelectedTransfer(transfer);
    const needsCheck = checkCodReceive(transfer.products);
    if (needsCheck) {
      checkTransfer(transfer.id);
    }
  };

  const handleBack = () => {
    clearSelectedTransfer();
    loadTransfers();
  };

  const hasUnregisteredProducts = selectedTransfer?.products
    ? checkCodReceive(selectedTransfer.products)
    : false;

  return {
    transfers,
    selectedTransfer,
    loading,
    loadingDetail,
    sending,
    handleShowTransfer,
    handleBack,
    rejectProduct,
    createProductRegister,
    acceptAll,
    rejectAll,
    hasUnregisteredProducts,
  };
};
