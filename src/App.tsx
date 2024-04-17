import './App.css'
import { AuthProvider } from 'oidc-react';
import ContactList from './Contacts/List';

const oidcConfig = {
  onSignIn: async (user: any) => {
    alert('You just signed in, congratz! Check out the console!');
    console.log(user);
    window.location.hash = '';
  },
  authority: 'https://test-login.unimicro.no',
  clientId: '9a0ec019-afeb-42c6-8c6b-b569e6531069',
  responseType: 'code',
  redirectUri: 'http://localhost:5173',
  scope: 'AppFramework Sales.Admin openid profile'
};


function App() {

  return (
      <AuthProvider {...oidcConfig}>

    <title> Contact List </title>
        
    <h1> contact list </h1>

      <ContactList />


      </AuthProvider>
  )

}

export default App