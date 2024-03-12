import { useAuth } from "oidc-react"
import { ContactService } from "../services/ContactService"
import { useState } from "react"

export default function DeleteContact({ id }) {
    const auth = useAuth()
    const [data] = useState<TContact[]>([])

    const deleteItem = (id: number) => {
        const _auth = auth;
        ContactService.use(_auth).delete(id)
            .then(res => {
                console.log(res)
            })
            .catch(error => {
                console.error("Error deleting item:", error);
            });
    }

    return (
                <button onClick={() => deleteItem(id)}>
                    Delete #{id}
                </button>

    );
}