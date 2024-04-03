import { useAuth } from "oidc-react"
import { useEffect, useState } from "react";
import { ContactService } from "./services/ContactService";

interface Props {
    endpoint?: string
}

export default function EndpointDump({ endpoint = "api/biz/contacts?expand=info&select=info.name,role, ID" }: Props) {
    const auth = useAuth();
    if (!auth?.userData) return <>Not logged in!</>

    const [data, setData] = useState({})
    const [updateN, setUpdateN] = useState(0)
    useEffect(() => {
        ContactService.use(auth).get().then(res => setData(res))
    }, [updateN])

    return <>

        <button> Add contact </button>

        <button onClick={() => { setUpdateN(x => x+1) }}>
            Update
        </button>
        <p>Current update: {updateN}</p>
        <pre>
            <code>

            {data && JSON.stringify(data)}
            </code>
        </pre>

    </>
}