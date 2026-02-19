import { ClientsSearch } from "@/components/search/ClientsSearch";
import { ShowClientSearched } from "@/components/search/ShowClientSearched";
import ordersStore from "@/stores/orders/ordersStore";
import useTempStorage from "@/stores/useTempStorage";


export function deliveryTypeRestaurant(type: number) {
    switch (type) {
      case 1: return "Comer Aqui";
      case 2: return "Para Llevar";
      case 3: return "Delivery";
    }
}

export function DeliveryContactSearch() {
  const { order } = ordersStore();
  const { getElement, setElement, clearElement} = useTempStorage();
  const serviceType: number = getElement('serviceType');


  if (serviceType != 3 || order?.invoiceproducts) return <></>

  const handleSelect = () =>{
    const client = getElement('clientSelectedByDelivery');
    setElement('clientOrder', client);
  }

  const handleDelete = () =>{
    clearElement('clientOrder');
  }


      return (
            <div>
              <div className="m-2 mt-8">
                <ClientsSearch param="customers" placeholder="Buscar Cliente Delivery" tempSelectedName="clientSelectedByDelivery" 
                onSelect={handleSelect} />
                <ShowClientSearched tempSelectedName="clientSelectedByDelivery" onClose={handleDelete} />
              </div>
            </div>
          );

}
