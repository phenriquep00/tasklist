import { createContext, PropsWithChildren, useEffect, useState } from "react";

type UserProviderType = PropsWithChildren<{}>;

const getInicialUser = () => {
    if ( typeof window !== 'undefined' && window.sessionStorage ) {
        const storedPrefs = window.sessionStorage.getItem('user');
        if (typeof storedPrefs === 'string') {
            return storedPrefs;
        } else {
            return '';
        };
    }
};

export const UserContext = createContext<any>('');

export function UserProvider({ children }: UserProviderType) {

    const [user, setUser] = useState(getInicialUser);

    const rawSetUser = (rawUser: any) => {
        sessionStorage.setItem('user', rawUser);
    };

    useEffect(() => rawSetUser(user), [user]);

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}