import { createContext, useContext, useState } from "react";

const ConversationContext = createContext();

export const useConversationContext = () => {
    return useContext(ConversationContext);
}

export const ConversationContextProvider = ({ children }) => {
    const [sidebarConversations, setsidebarConversations] = useState([])
    const [allUsers, setallUsers] = useState([])
    const [messages, setmessages] = useState([])
    const [reciever, setreciever] = useState("")

    return (
        <ConversationContext.Provider value={{  sidebarConversations, setsidebarConversations, allUsers, setallUsers, messages, setmessages, reciever, setreciever }}>
            {children}
        </ConversationContext.Provider>
    );
}