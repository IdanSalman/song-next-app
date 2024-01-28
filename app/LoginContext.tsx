"use client"
import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';

type ContextType = {
    loggedIn: boolean;
    setLoggedIn: Dispatch<SetStateAction<boolean>>
};


export const ThemeContext = createContext<ContextType>({ loggedIn: false, setLoggedIn: () => { } });

export const LoggedInProvider = ({ children }: {
    children: React.ReactNode
}) => {
    const [loggedIn, setLoggedIn] = useState(false)

    return (<ThemeContext.Provider value={{ loggedIn, setLoggedIn }}>{children}
    </ThemeContext.Provider>);
}

export function useLoggedInContext(): ContextType {
    const context = useContext(ThemeContext)

    if (!context)
        throw new Error("ThemeContext must be called from within the LoginProvider (Can wrap the layout file's body)")

    return context
}