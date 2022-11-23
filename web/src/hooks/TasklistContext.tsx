import { createContext, PropsWithChildren, useEffect, useState } from "react";

type tasklistProviderType = PropsWithChildren<{}>;

const getInicialTasklist = () => {
    if ( typeof window !== 'undefined' && window.sessionStorage ) {
        const storedPrefs = window.sessionStorage.getItem('tasklist');
        if (typeof storedPrefs === 'string') {
            return storedPrefs;
        } else {
            return '';
        };
    }
};

export const TasklistContext = createContext<any>('');

export function TasklistProvider({ children }: tasklistProviderType) {

    const [tasklist, setTasklist] = useState(getInicialTasklist);

    const rawSetTasklist = (rawTasklist: any) => {
        sessionStorage.setItem('tasklist', rawTasklist);
    };

    useEffect(() => rawSetTasklist(tasklist), [tasklist]);

    return (
        <TasklistContext.Provider value={{tasklist, setTasklist}}>
            {children}
        </TasklistContext.Provider>
    )
}