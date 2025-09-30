export const getParamString = (param: string | null): string => {
    switch(param) {
      case 'customers':
        return '&filterWhere[is_client]==1';
      case 'suppliers':
        return '&filterWhere[is_provider]==1';
      case 'drivers':
        return '&filterWhere[is_employee]==1';
      case 'referrals':
        return '&filterWhere[is_referred]==1';
      default:
        return '';
    }
  }
