import { createContext, useContext, useState } from "react";

export const storeData = createContext();


export const ContextStore = () => {
    return useContext(storeData);
}


export const Store = (props) => {
    const [user, setUser] = useState("user");
    // const [token, setToken] = useState(localStorage.getItem("token"));
    // const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("user")));


    return (<storeData.Provider value={{ user, setUser, }}>
        {props.children}
    </storeData.Provider>)

}