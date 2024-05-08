import { useAuth } from "oidc-react"
import { ContactService } from "../services/ContactService"
import { useState } from "react"
import useContactsStore from '../stores/Contacts';

interface DeleteContactProps {
    id: number;
   }

export default function DeleteContact({ id }: DeleteContactProps) {
    const auth = useAuth()
    const [] = useState<TContact[]>([])
    const load = useContactsStore(state => state.load)
    const deleteItem = (id: number) => {
        const _auth = auth;
        ContactService.use(_auth).delete(id)
            .then(res => {
                load(_auth);
            })
            .catch(error => {
                console.error("Error deleting item:", error);
            });
    }

    return (
                <button className="deleteStyle" onClick={() => deleteItem( id )}>
                    Delete #{id}
                </button>
);
}