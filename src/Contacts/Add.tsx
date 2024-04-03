import { useAuth } from "oidc-react";
import { ContactService } from "../services/ContactService";
import { useState } from "react";

export default function Add() {
    const auth = useAuth();
    const [fullname, setFullname] = useState("")
    const [personrole, setPersonrole] = useState ("")



const AddUser = () => {

    const _auth = auth
    ContactService.use(_auth).post(fullname, personrole,)

}

return (
        <div>
        <input type="text" placeholder="Name" value={fullname} onChange={(n) => setFullname(n.target.value)}  />
        <input type="text" placeholder="role" value={personrole} onChange={(n) => setPersonrole(n.target.value)} />
        <button onClick={AddUser}> Add New User </button>
        </div>
)
}