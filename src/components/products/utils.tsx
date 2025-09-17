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