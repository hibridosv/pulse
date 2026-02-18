import { ClientsSearch } from "@/components/search/ClientsSearch";
import { ShowClientSearched } from "@/components/search/ShowClientSearched";
import ordersStore from "@/stores/orders/ordersStore";
import useTempSelectedElementStore from "@/stores/tempSelectedElementStore";


export function deliveryTypeRestaurant(type: number) {
    switch (type) {
      case 1: return "Comer Aqui";
      case 2: return "Para Llevar";
      case 3: return "Delivery";
    }
}

export function DeliveryContactSearch() {
  const { order } = ordersStore();
  const { getSelectedElement, setSelectedElement, clearSelectedElement} = useTempSelectedElementStore();
  const serviceType: number = getSelectedElement('serviceType');


  if (serviceType != 3 || order?.invoiceproducts) return <></>

  const handleSelect = () =>{
    const client = getSelectedElement('clientSelectedByDelivery');
    setSelectedElement('clientOrder', client);
  }

  const handleDelete = () =>{
    clearSelectedElement('clientOrder');
  }


      return (
            <div>
              <div className="m-2">
                <ClientsSearch param="customers" placeholder="Buscar Cliente Delivery" tempSelectedName="clientSelectedByDelivery" 
                onSelect={handleSelect} />
                <ShowClientSearched tempSelectedName="clientSelectedByDelivery" onClose={handleDelete} />
              </div>
            </div>
          );

}
