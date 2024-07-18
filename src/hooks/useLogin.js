import { useAuthContext } from "../context/AuthContext"
import axios from "axios";
import toast from "react-hot-toast"

const useLogin = () => {
    const { setAuthUser } = useAuthContext();
    const login = async (inputs) => {
        try {

            const response = await axios.post("https://chatapp-backend-zttg.onrender.com/api/auth/login", inputs)
            if (response) {
                localStorage.setItem("chatUser", JSON.stringify(response.data))
                setAuthUser(response.data)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.error)

        }
    }

    return { login };
}

export default useLogin