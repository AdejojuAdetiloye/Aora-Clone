import {
  createContext,
  useContext,
  useState,
  useLayoutEffect,
  Children,
  useEffect,
} from "react";
import { getCurrentUser } from "../lib/appWrite";

const GlobalContext = createContext();
export const  useGlobalContext = ()  => useContext(GlobalContext);


const GlobalProvider = ({ children }) => {

  //state to manage the user session
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  

  //to load user session from apwrite during load time
  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setUser(res);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isLoading,
        query,
        setQuery,
        search,
        setSearch
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}


export default GlobalProvider;