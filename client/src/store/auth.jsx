
import { useContext, createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [busdata, setBusdata] = useState("");
    const [feedBackdata, setFeedBackdata] = useState("");
    const authorizationToken = `Bearer ${token}`;

    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
        return localStorage.setItem("token", serverToken);
    };

    let isLoggedIn = !!token;

    const LogoutUser = () => {
        setToken("");
        return localStorage.removeItem("token");
    };

    const userAuthentication = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/user`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                setUser(data.userData);
                setIsLoading(false);
            } else {
                setIsLoading(false);
                console.log("Error Fetching On Loading Data.");
            }
        } catch (error) {
            console.log("Error fetching user data");
        }
    }

    const getbusdata = async() => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/form/getallBusDatas`, {
                method: "GET",
            });
            if (response.ok) {
                const data = await response.json();
                setBusdata(data);
            }
        } catch (error) {
            console.log(`Busdata frontend error: ${error}`);
        }
    }
    const getfeedbackdata = async() => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/getallfeedbacks`, {
                method: "GET",
            });
            if (response.ok) {
                const data = await response.json();
                setFeedBackdata(data);
            }
        } catch (error) {
            console.log(`Busdata frontend error: ${error}`);
        }
    }
    

    useEffect(() => {
        getbusdata();
        getfeedbackdata();
        userAuthentication();
    }, [])

    return (
        <AuthContext.Provider value={{ storeTokenInLS, LogoutUser, isLoggedIn, user, busdata, feedBackdata, authorizationToken, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth used outside of the Provider");
    }
    return authContextValue;
}