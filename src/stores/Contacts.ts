import { create } from 'zustand'
import { ContactService } from "../services/ContactService"

interface ContactsStore {
    contacts: TContact[],
    filteredContacts: TContact[],
    search: (text: string) => void
    load: (auth) => void
}

const searchFn = (contacts, text) => contacts?.filter(contact => contact?.Info?.Name?.toLowerCase().includes(text.toLowerCase()))

const useContactsStore = create<ContactsStore>((set) => ({
    contacts: [],
    filteredContacts: [],
    search: (text) => set(state => ({
        filteredContacts: searchFn(state?.contacts, text) || contacts
    })),
    load: (_auth) => ContactService.use(_auth).get().then(res => {
        set(state => {
            const obj = {
                contacts: res
            }
            if (!state.filteredContacts?.length) {
                obj.filteredContacts = res;
            }
            return obj;
        })
    })
}))

export default useContactsStore