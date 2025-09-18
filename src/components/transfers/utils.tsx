export const statusOfTransfer = (status: number)=>{
  switch (status) {
    case 1: return <span className="status-info uppercase">En Progreso</span>
    case 2: return <span className="status-info uppercase">Activo</span>
    case 3: return <span className="status-warning uppercase">* Aceptado</span>
    case 4: return <span className="status-success uppercase">Aceptado</span>
    case 5: return <span className="status-danger uppercase">Rechazado</span>
    case 6: return <span className="status-danger uppercase">Solicitando</span>
    case 7: return <span className="status-danger uppercase">Solicitado</span>
    case 8: return <span className="status-info uppercase">Guardado</span>
    default: return <span className="uppercase font-bold">Eliminado</span>
  }
}