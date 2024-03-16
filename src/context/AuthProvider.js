import { createContext, useState , useEffect} from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [currentUser, setCurrentUser] = useState(null);
    const user = sessionStorage.getItem("user");

    useEffect(() => {
        if (user && !currentUser) {
          fetch(`/currentUser`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + JSON.parse(user).token,
            },
          })
            .then((res) => res.json())
            .then((data) => {
              setCurrentUser(data);
            })
            .catch((error) => {
              setCurrentUser(null);
              sessionStorage.removeItem("user");
            });
        }
    }, [user, currentUser]);

    return (
        <AuthContext.Provider value={{ auth, setAuth , currentUser, setCurrentUser}}>
         {children}
        </AuthContext.Provider> 
    )
}

export default AuthContext;