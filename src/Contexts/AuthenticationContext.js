import { createContext} from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext()

const AuthenticationContext = ({ children }) => {
    return (  
       <AuthContext.Provider value={{}}>
            {children}
       </AuthContext.Provider>
    );
}
 
export default AuthenticationContext;