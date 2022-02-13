// import { createContext, useState } from "react";

// const AuthContext = createContext({
//     token: "",
//     isLoggedIn: false,
//     login: (token) => {},
//     logout: () => {}
// });

// export const AuthContextProvider = ({children}) => {
//     const [token, setToken] = useState(null);

//     const userIsLoggedIn = !!token;

//     const loginHandler = (token) => {
//         setToken(token);
//     }

//     const logoutHandler = () => {
//         setToken(null);
//     }

//     const contextValue = {
//         token,
//         isLoggedIn: userIsLoggedIn,
//         login: loginHandler,
//         logout: logoutHandler
//     }

//     return <AuthContext.Provider value={contextValue}>
//         {children}
//     </AuthContext.Provider>
// }

// export default AuthContext;

import React, { createContext, useState } from "react";

type Context = {
    token: string | null,
    isLoggedIn: boolean,
    login: (token: string, exp: Date) => void;
    logout: () => void
}

const AuthContext = createContext<Context>({
    token: "",
    isLoggedIn: false,
    login: (token: string, exp: Date) => {},
    logout: () => {}
});

const calculateRemainingTime = (expirationTime: Date) => {
    const currentTime = new Date().getTime();
    const adjustExpirationTime = new Date(expirationTime).getTime();

    const remainingDuration = adjustExpirationTime - currentTime;

    return remainingDuration;
}

export const AuthContextProvider = (props: { children: React.ReactNode}) => {
    const initialToken = localStorage.getItem('token');
    const [token, setToken] = useState(initialToken);

    const userIsLoggedIn = !!token;


    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('token');
    }

    const loginHandler = (token: string, expirationTime: Date) => {
        setToken(token);
        localStorage.setItem('token', token);
        const remainingTime = calculateRemainingTime(expirationTime);

        setTimeout(logoutHandler, remainingTime);
    }

    const contextValue: Context = {
        token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }

    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext;