import { useSocketContext } from "../context/socketContext"
import { useAuthContext } from "../context/AuthContext";
import { useEffect } from "react";


const useListenMesseges = () => {
    const { socket } = useSocketContext();
    const { messages, setmessages } = useAuthContext();

    useEffect(()=>{
        socket?.on("newMessage", (newMessage)=>{
            setmessages(...messages, newMessage)
        })

        return () => socket?.off("newMessage");
    },[socket, setmessages, messages])


}

export default useListenMesseges