export const typeOfAccount = (type: number): string =>{
    switch (type) {
      case 1: return "Caja Chica"
      case 2: return "Cuenta"
      case 3: return "Chequera"
      case 4: return "Tarjeta"
    }
    return "Caja Chica"
  }