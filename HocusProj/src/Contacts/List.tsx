import { useAuth } from "oidc-react"
import { ContactService } from "../services/ContactService"
import React, { useEffect, useState } from "react"
import DeleteContact from "./Delete"
import Add from "./Add"

export default function List() {
    const auth = useAuth()
    const [data, setData] = useState<TContact[]>([])

    useEffect(() => {
        const _auth = auth;
        ContactService.use(_auth).get().then(res => {
            console.log(res)
            setData(res)
        })
    }, [auth])

    return <>
        Show a list of users
        {data?.length && <>
            <pre>{JSON.stringify(data)}</pre>
            {data.map(contact =>
                <React.Fragment key={contact.ID}>
                    <div>
                        ID: {contact?.ID }
                    </div>
                    <div>
                        name: {contact?.Info?.Name }
                    </div>
                    <div>  
                        role: {contact?.Role}
                    </div>
                    <DeleteContact id={contact?.ID}></DeleteContact>

                </React.Fragment>
                
                )}
            </>
        }
    </>
}