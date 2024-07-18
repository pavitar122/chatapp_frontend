import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import { useConversationContext } from "../context/ConversationContext";

const useUsers = () => {
    const { authUser  } = useAuthContext();
    const {setallUsers} = useConversationContext();

    const getUsers = async () => {
        try {
            const config = {
                headers: {
                    Authorization: authUser.token
                }
            }
            const response = await axios.get("https://chatapp-backend-zttg.onrender.com/api/users/getAllUsers", config)
            if (response) {
                setallUsers(response.data)
            }
        } catch (error) {
            console.log(error)
        }
    }


    return { getUsers };
}

export default useUsers


