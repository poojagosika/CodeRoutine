import React, { createContext, useContext, useState } from 'react';
import { ThemeContextProvider } from "../Config/ThemeContext";
export const storeData = createContext();

export const ContextStore = () => {
    return useContext(storeData);
}

export const Store = (props) => {
    const [user, setUser] = useState("user");
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("user")));

    return (
        <storeData.Provider value={{ user, setUser, token, setToken, userData, setUserData }}>
            <ThemeContextProvider >
                {props.children}
            </ThemeContextProvider>
        </storeData.Provider>
    );
}
