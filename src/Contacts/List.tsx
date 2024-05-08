import { useAuth } from "oidc-react"
import { ContactService } from "../services/ContactService"
import React, { useEffect, useState } from "react"
import DeleteContact from "./Delete"
import AddContact from "./Add"
import useContactsStore from '../stores/Contacts';

export default function List() {
    const auth = useAuth()
    const data = useContactsStore((state) => state.filteredContacts);
    const load = useContactsStore((state) => state.load);

    useEffect(() => {
        const _auth = auth;
        load(_auth)
    }, [auth])
    return <div className="Contact-rows">

        {data?.length &&
            data.map(contact =>
                <div className="Contact-row" key={contact.ID}>
                    <div>
                        <h2>

                            {contact?.Info?.Name}
                        </h2>
                        <p>

                            {contact?.Role}
                        </p>
                    </div>

                    <DeleteContact id={contact?.ID}></DeleteContact>
                </div>
            )
        || null}

        <AddContact />
    </div>
}