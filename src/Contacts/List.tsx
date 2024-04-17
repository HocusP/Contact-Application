import { useAuth } from "oidc-react"
import { ContactService } from "../services/ContactService"
import React, { useEffect, useState } from "react"
import DeleteContact from "./Delete"
import AddContact from "./Add"

export default function List() {
    const auth = useAuth()
    const [data, setData] = useState<TContact[]>([])

    useEffect(() => {
        const _auth = auth;
        ContactService.use(_auth).get().then(res => {
            setData(res)
        })
    }, [auth])
    return <>
        
        {data?.length && <>
    {data.map(contact =>
        <React.Fragment key={contact.ID}>
            <div className="Contact-row">
                <div>
                    ID: {contact?.ID}
                </div>
                <div>
                    name: {contact?.Info?.Name}
                </div>
                <div>  
                    role: {contact?.Role}
                </div>
                <DeleteContact id={contact?.ID}></DeleteContact>
                </div>
        </React.Fragment>
    )}
</>}

        <hr />
        <AddContact />
    </>
}