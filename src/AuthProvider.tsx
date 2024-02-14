import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, createContext, useContext, useState } from 'react'
import UserStore from './store/UserStore';
import GlobalStore from './store/GlobalStore';

export const AuthContext = createContext<GlobalStore| null>(null);

export const AuthProvider = (props: { children: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined }) =>
 {
    /* const [auth, setAuth] = useState(false)

    const login = (password: string, success: () => void, failure: () => void) => {
        if (password === 'qwerty') {
            setAuth(true)
           // success()
        } else {
            setAuth(false)
            failure()
        }
    }
    const logout = () => {
        setAuth(false)
    } */

    

    return (
        <AuthContext.Provider value={new GlobalStore()}>
            {props.children}
        </AuthContext.Provider>
    )
}
export const useStore = () => {
    const context = useContext(AuthContext);
    if (context === null) {
      throw new Error(
        "You have forgotten to wrap your root component with RootStoreProvider"
      );
    }
    return context;
  };