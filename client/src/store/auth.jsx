
import { useContext, createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [feedBackdata, setFeedBackdata] = useState("");
    const authorizationToken = `Bearer ${token}`;

    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
        localStorage.setItem("token", serverToken);
        userAuthentication(serverToken);
        return;
    };

    let isLoggedIn = !!token;

    const LogoutUser = () => {
        setToken("");
        return localStorage.removeItem("token");
    };

    const userAuthentication = async (currentToken = token) => {
        try {
            setIsLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/user`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${currentToken}`,
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

    const getfeedbackdata = async() => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/form`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            if (response.ok) {
                const data = await response.json();
                setFeedBackdata(data);
            }
        } catch (error) {
            console.log(`Feedback frontend error: ${error}`);
        }
    }


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            getfeedbackdata();
            userAuthentication();
        } else {
            setIsLoading(false);
        }
    }, [])

    return (
        <AuthContext.Provider value={{ storeTokenInLS, LogoutUser, isLoggedIn, user, setUser, feedBackdata, authorizationToken, isLoading }}>
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
