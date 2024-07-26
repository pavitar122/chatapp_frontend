import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { useConversationContext } from "./ConversationContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
}

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { authUser } = useAuthContext();
    const { setmessages } = useConversationContext();

    useEffect(() => {
        let newSocket;

        if (authUser) {
            newSocket = io("https://chatapp-backend-zttg.onrender.com", {
                transports: ["websocket", "polling"],
                query: { userId: authUser._id }
            });

            newSocket.on("connect", () => {
                console.log("Connected to socket server");
            });

            newSocket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });

            newSocket.on("newMessage", (newMessage) => {
                setmessages(messages => [...messages, newMessage]);
            });


            newSocket.on("disconnect", (reason) => {
                console.log("Disconnected:", reason);
            });

            newSocket.on("connect_error", (error) => {
                console.error("Connection Error:", error.message);
            });

            setSocket(newSocket);
        }

        return () => {
            if (newSocket) {
                newSocket.close();
                setSocket(null);
            }
        };
    }, [authUser, setmessages, setOnlineUsers]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};
