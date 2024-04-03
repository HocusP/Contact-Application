import { AuthContextProps, } from "oidc-react"

type Props = {
    body?: {};
    method?: "GET" | "POST" | "PUT" | "DELETE"
    params?: string;
}

export class ContactService {
    static _auth: AuthContextProps
    static readonly _url = "https://test-api.softrig.com/api/biz/contacts"

    static use(auth: AuthContextProps) {
        this._auth = auth
        return this;
    }

    static async api({ body, params = "", method = "GET" }: Props) {
        if (!this._auth?.userData) {
            return undefined
        }

        const response = await fetch(this._url + params, { 
            headers: new Headers({
                'Authorization': `Bearer ${this._auth.userData.access_token}`, 
                'Content-Type': 'application/raw'
            }),
            method,
            body: body && JSON.stringify(body)
        })
        if (response.status === 204) {
            return true
        }
        if (response.status !== 200) {
            return false
        }

        const json = await response.json()
        return json
    }

    static get() {
        const params = "?expand=info&select=info.name,role, ID"
        return this.api({ params: params })
    }

    static post(fullname = "", role = "") {
        if (!fullname || !role) {
            return false;
        }
        const fixed = {
            "Role": role,
            "Info": {
                "Name": fullname,
            },
        }

        return this.api({ body: fixed, method: "POST" })
    }

    static put(id: number, formdata = {}) {
        return this.api({ body: formdata, params: `/${id}` })
    }

    static delete(id: number) {
        return this.api({ params: `/${id}`, method: "DELETE" })
    }
}