import toast from 'react-hot-toast'
import axios from 'axios'
import { useAuthContext } from "../context/AuthContext"

const useSignup = () => {
    const apiUrl = process.env.REACT_APP_API;
    const { setAuthUser } = useAuthContext();

    const signup = async (inputs) => {
        const { fullName, userName, password, cpassword } = inputs;
        const success = handleInputErrors({ fullName, userName, password, cpassword })
        if (!success) return;

        try {
            const response = await axios.post(`${apiUrl}/api/auth/signup`, inputs)
            if (response) {
                localStorage.setItem("chatUser", JSON.stringify(response.data))
                setAuthUser(response.data)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.error)
        }
    }

    return { signup }
}

export default useSignup;

const handleInputErrors = ({ fullName, userName, password, cpassword }) => {
    if (!fullName || !userName || !password || !cpassword) {
        toast.error("Please fill all the fields.")
        return false;
    }

    if (password !== cpassword) {
        toast.error("Passwords do not match.")
        return false;
    }

    return true;
}


