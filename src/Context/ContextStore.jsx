import React, { createContext, useContext, useState } from 'react';
import { ThemeContextProvider } from "../Config/ThemeContext";
import serverUserData from '../Pages/Profile/CustomResume/Edit/Confi';
export const storeData = createContext();

export const ContextStore = () => {
    return useContext(storeData);
}

export const Store = (props) => {
    const [user, setUser] = useState("user");
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("user")));
    const [resumeInfo, setResumeInfo] = useState(serverUserData);

    return (
        <storeData.Provider value={{ user, setUser, token, setToken, userData, setUserData, resumeInfo, setResumeInfo }}>
            <ThemeContextProvider >
                {props.children}
            </ThemeContextProvider>
        </storeData.Provider>
    );
}
