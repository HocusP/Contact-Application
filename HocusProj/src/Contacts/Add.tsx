import { useAuth } from "oidc-react"
import { ContactService } from "../services/ContactService"
import { useState } from "react"

export default function Add() {
    const auth = useAuth()

    const [data] = useState()
    const AddUser = () => {
        const _auth = auth;
        ContactService.use(_auth).post()
            .then(res => {
                console.log(res)
            })
            .catch(error => {
                console.error("Error adding user:", error);
            });


    return (
            <button onClick={() => AddUser}>
             Add New User
            </button>
    );
}};