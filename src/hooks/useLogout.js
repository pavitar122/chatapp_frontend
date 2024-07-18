import { useAuthContext } from "../context/AuthContext"
import axios from "axios";

const useLogout = () => {
    const { setAuthUser} = useAuthContext();
    const logout = async () => {
        try {
            try {
                const response = await axios.post("https://chatapp-backend-zttg.onrender.com/api/auth/logout")
                if (response.status === 200) {
                    console.log(response.data)
                    localStorage.removeItem("chatUser")
                    setAuthUser(null)
                }
            } catch (error) {
                console.log(error)
            }
        } catch (error) {

        }

    }

    return { logout };
}

export default useLogout