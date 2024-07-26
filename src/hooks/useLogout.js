import { useAuthContext } from "../context/AuthContext"
import axios from "axios";

const useLogout = () => {
    const apiUrl = process.env.REACT_APP_API;
    const { setAuthUser} = useAuthContext();
    const logout = async () => {
        try {
            try {
                const response = await axios.post(`${apiUrl}/api/auth/logout`)
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