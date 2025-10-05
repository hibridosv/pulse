import { SearchInput } from "@/components/Search";
import { useContactSearchLogic } from "@/hooks/search/useContactSearchLogic";
import { usePagination } from "@/hooks/usePagination";
import { useSearchTerm } from "@/hooks/useSearchTerm";
import { Contact } from "@/interfaces/contact";
import useContactStore from "@/stores/ContactStore";
import useTempSelectedElementStore from "@/stores/tempSelectedElementStore";
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
                          <li 
                            key={item.id} 
                            className="flex justify-between items-center p-3 hover:bg-bg-subtle rounded-md cursor-pointer transition-colors duration-150" 
                            onClick={() => handleSelectContact(item)}
                          >
                            <span className="font-medium text-text-base">{item.name}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </li>
                        );
                    })}
                  </ul>
                </div> 
            )}
        </div>
    );
}