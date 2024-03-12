import { AuthContextProps, useAuth } from "oidc-react"

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

    static async api({ body, params, method = "GET" }: Props) {
        if (!this._auth?.userData) {
            return undefined
        }

        const response = await fetch(this._url + params, { 
            headers: new Headers({
                'Authorization': `Bearer ${this._auth.userData.access_token}`, 
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
            method,
            body: body && JSON.stringify(body)
        })
        const json = await response.json()
        return json
    }

    static get() {
        const params = "?expand=info&select=info.name,role, ID"
        return this.api({ params: params })
    }

    static post(formdata = {}) {
        return this.api({ body: formdata, method: "POST" })
    }

    static put(id: number, formdata = {}) {
        return this.api({ body: formdata, params: `/${id}` })
    }

    static delete(id: number) {
        return this.api({ params: `/${id}`, method: "DELETE" })
    }
}