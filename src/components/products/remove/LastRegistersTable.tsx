import { Loader } from "@/components/Loader";
import { formatDateAsDMY, formatHourAsHM } from "@/lib/date-formats";
import productRemovedStore from "@/stores/productRemovedStore";



export const typeFailure = (status: number) => {
  switch (status) {
    case 1: return <span className="status-danger">Averias</span>  
    case 2: return <span className="status-success">Traslado</span>
    case 3: return <span className="status-info">Devolución</span>
    case 4: return <span className="status-warning">Cambio</span>
  }
}


export function LastRegistersTable() {
    const {product, loading, products} = productRemovedStore();

    if (loading) return <Loader />;
    if (product && !loading) return null;

      const listItems = products?.data && products?.data.map((product: any) => (
        <tr 
          key={product.id} 
          className={`whitespace-nowrap transition-colors duration-150 odd:bg-bg-subtle/40 hover:bg-bg-subtle divide-x divide-bg-subtle ${product.status === 0 ? 'bg-danger/10 text-danger' : 'text-text-base'}`}>
          <td className="px-3 py-2 font-medium text-primary hover:underline">
            { formatDateAsDMY(product?.created_at) } { formatHourAsHM(product?.created_at) }
          </td>
          <td className="px-3 py-2" >
             { product?.employee?.name }
          </td>
          <td className="px-3 py-2 text-center font-medium">
            { typeFailure(product?.type) }
          </td>
          <td className={`px-3 py-2 text-left`}>
            { product.reason }
          </td>
          <td className="px-3 py-2 text-center">{ product?.failures?.length }</td>
        </tr>
      ));


  return (
    <div className="relative overflow-x-auto bg-bg-content rounded-lg shadow-sm border border-bg-subtle">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-text-base uppercase bg-bg-subtle/60">
            <tr className="border-b-2 border-bg-subtle">
              <th scope="col" className="px-4 py-3 font-bold tracking-wider border-r border-bg-subtle text-center">Fecha</th>
              <th scope="col" className="px-4 py-3 font-bold tracking-wider border-r border-bg-subtle text-center">Usuario</th>
              <th scope="col" className="px-4 py-3 font-bold tracking-wider border-r border-bg-subtle text-center">Tipo</th>
              <th scope="col" className="px-4 py-3 font-bold tracking-wider border-r border-bg-subtle text-center">Razón</th>
              <th scope="col" className="px-4 py-3 font-bold tracking-wider text-center">Productos</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-bg-subtle">
            {listItems}
          </tbody>
        </table>
      </div>
  );
}