import { FaLayerGroup } from "react-icons/fa";
import { MdOutlineHomeRepairService } from "react-icons/md";

  export const productTypeIcon = (type: number) => {
    switch (type) {
      case 2: return <span title="Servicio" className="mr-2 text-info"><MdOutlineHomeRepairService size={14} /></span>;
      case 3: return <span title="Relacionado" className="mr-2 text-success"><FaLayerGroup size={12} /></span>;
      default: return null;
    }
  };


  export const sortBySelected = (sort: string, sortBy: string) => {
      let sortNew;
      if (sortBy.slice(0, 1) !== "-") {
       sortNew = "-" + sort;
      } else {
       sortNew = sort; 
      }
      return sortNew;
  };

  export const typeFailure = (status: number) => {
  switch (status) {
    case 1: return <span className="status-danger">Averias</span>  
    case 2: return <span className="status-success">Traslado</span>
    case 3: return <span className="status-info">Devolución</span>
    case 4: return <span className="status-warning">Cambio</span>
  }
}