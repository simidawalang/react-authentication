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
    login: (token) => {},
    logout: () => {}
});

export const AuthContextProvider = ({children}) => {
    const initialToken = localStorage.getItem('token');
    const [token, setToken] = useState(initialToken);

    const userIsLoggedIn = !!token;

    const loginHandler = (token) => {
        setToken(token);
        localStorage.setItem('token', token)
    }

    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('token');
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