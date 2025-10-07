import { SearchInput } from "@/components/Search";
import { useContactSearchLogic } from "@/hooks/search/useContactSearchLogic";
import { usePagination } from "@/hooks/usePagination";
import { useSearchTerm } from "@/hooks/useSearchTerm";
import { Contact } from "@/interfaces/contact";
import useContactStore from "@/stores/ContactStore";
import useTempSelectedElementStore from "@/stores/tempSelectedElementStore";
import { LiComponent } from "../button/LiComponent";
import { getParamString } from "../contacs/utils";

export interface ClientsSearchI {
  param: 'customers' | 'suppliers' | 'drivers' | 'referrals';
  placeholder?: string;
  pagination?: number;
}


export function ClientsSearch(props: ClientsSearchI) {
    const { param, placeholder = "Buscar Cliente", pagination = 10 } = props;
    const { contacts, loading } = useContactStore();
    const { setSelectedElement} = useTempSelectedElementStore();
    const { searchTerm, handleSearchTerm } = useSearchTerm(["name", "id_number"], 500);
    const {currentPage} = usePagination("&page=1");
    const sortBy = "-updated_at";
    useContactSearchLogic(currentPage, searchTerm, sortBy, getParamString(param), pagination);


    const handleSelectContact = (client: Contact) => {
        setSelectedElement('clientSelectedBySearch', client);
        handleSearchTerm('');
    };


    return (
        <div className="relative w-full">
            <SearchInput handleSearchTerm={handleSearchTerm} placeholder={placeholder} />
            { searchTerm && contacts && contacts.data && contacts.data.length > 0 && (
                <div className='absolute top-full left-0 right-0 z-20 mt-2 bg-bg-content rounded-lg shadow-lg border border-bg-subtle/50'>
                  <ul className="divide-y divide-bg-subtle max-h-80 overflow-y-auto custom-scrollbar">
                    {contacts.data.map((item: Contact) => {
                        return (
                          <LiComponent 
                            key={item.id} 
                            text={item.name} 
                            onClick={() => handleSelectContact(item)}
                          />
                        );
                    })}
                  </ul>
                </div> 
            )}
        </div>
    );
}