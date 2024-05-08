import { useAuth } from "oidc-react";
import { ContactService } from "../services/ContactService";
import { useState } from "react";
import useContactsStore from '../stores/Contacts';

export default function Add() {
    const auth = useAuth();
    const [fullname, setFullname] = useState("")
    const [personrole, setPersonrole] = useState("")
    const load = useContactsStore(state => state.load)

    const AddUser = async () => {
        const _auth = auth
        await ContactService.use(_auth).post(fullname, personrole)
        load(_auth);
    }

    return (
        <div className="Contact-add">
            <input type="text" placeholder="Name" value={fullname} onChange={(n) => setFullname(n.target.value)} />
            <input type="text" placeholder="role" value={personrole} onChange={(n) => setPersonrole(n.target.value)} />
            <button className="buttonAdd" onClick={AddUser}> Add New User</button>
        </div>
    )
}