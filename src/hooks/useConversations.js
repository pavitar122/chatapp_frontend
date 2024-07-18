import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import { useConversationContext } from "../context/ConversationContext";
import { useNavigate, useParams } from "react-router-dom";



const useConversations = () => {
    const { authUser } = useAuthContext();
    const { setsidebarConversations, setmessages, setreciever, reciever, messages } = useConversationContext();
    const { chatId } = useParams();
    const navigate = useNavigate();


    const getConversations = async () => {
        try {
            const config = {
                headers: {
                    authorization: authUser.token
                }
            }
            const response = await axios.get("https://chatapp-backend-zttg.onrender.com/api/messages/sidebarConversation", config)
            if (response) {
                setsidebarConversations(response.data)
            }
        } catch (error) {
            console.log(error)
        }
    }


    const fetchMessages = async () => {
        try {
            const config = {
                headers: {
                    authorization: authUser.token
                }
            };
            const response = await axios.get(`https://chatapp-backend-zttg.onrender.com/api/messages/fetchMessages/${chatId}`, config);
            if (response) {
                setmessages(response.data.messages)
                setreciever(response.data.participants[0])
            }
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };


    const sendMessage = async (input) => {
        try {
            const config = {
                headers: {
                    'authorization': authUser.token
                }
            };
            const data = {
                message: input
            };
            const response = await axios.post(`https://chatapp-backend-zttg.onrender.com/api/messages/send/${reciever._id}`, data, config);
            if (response) {
                messages.push(response.data)
            }
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const deleteConversation = async () => {
        try {
            const config = {
                headers: {
                    'authorization': authUser.token
                }
            };
            const response = await axios.get(`https://chatapp-backend-zttg.onrender.com/api/messages/deleteConversation/${chatId}`, config);
            if (response) {
                navigate("/app/users")
            }
        } catch (error) {
            console.error("Error sending message:", error);
        }

    }


    const startConversation = async (id) => {
        try {
          const config = {
            headers: {
              'authorization': authUser.token
            }
          };
          const response = await axios.get(`https://chatapp-backend-zttg.onrender.com/api/messages/startConversation/${id}`, config)
          if (response) {
            const participantData = response.data.participants
            const conversationId = response.data._id
            const filteredUser = participantData.filter(id => id._id !== authUser._id);
            setreciever(filteredUser[0])
            navigate(`/app/chat/${conversationId}`)
    
          }
        } catch (error) {
          console.log(error)
        }
      }


    return { getConversations, fetchMessages, sendMessage, deleteConversation, startConversation };
}

export default useConversations



