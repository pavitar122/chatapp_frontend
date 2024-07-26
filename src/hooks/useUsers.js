import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import { useConversationContext } from "../context/ConversationContext";
import { useCallback } from "react";

const useUsers = () => {
    const apiUrl = process.env.REACT_APP_API;
    const { authUser  } = useAuthContext();
    const {setallUsers} = useConversationContext();

    const getUsers =useCallback( async () => {
        try {
            const config = {
                headers: {
                    Authorization: authUser.token
                }
            }
            const response = await axios.get(`${apiUrl}/api/users/getAllUsers`, config)
            if (response) {
                setallUsers(response.data)
            }
        } catch (error) {
            console.log(error)
        }
    },[apiUrl,setallUsers, authUser ])


    return { getUsers };
}

export default useUsers


