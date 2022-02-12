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

import { createContext, useState } from "react";

const AuthContext = createContext({
    token: "",
    isLoggedIn: false,
    login: (token, exp) => {},
    logout: () => {}
});

const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjustExpirationTime = new Date(expirationTime).getTime();

    const remainingDuration = adjustExpirationTime - currentTime;

    return remainingDuration;
}

export const AuthContextProvider = ({children}) => {
    const initialToken = localStorage.getItem('token');
    const [token, setToken] = useState(initialToken);

    const userIsLoggedIn = !!token;


    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('token');
    }

    const loginHandler = (token, expirationTime) => {
        setToken(token);
        localStorage.setItem('token', token);
        const remainingTime = calculateRemainingTime(expirationTime);

        setTimeout(logoutHandler, remainingTime);
    }

    const contextValue = {
        token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }

    return <AuthContext.Provider value={contextValue}>
        {children}
    </AuthContext.Provider>
}

export default AuthContext;