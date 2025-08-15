import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    messages: [], // last 2 days
    // TODO: Adding Load state that loads more data of the user 
    lastMessagesByUserId: {},
    lastMessage: localStorage.getItem("byeMe") || "",
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        addMessage: (state, action) => {
            const msg = action.payload;
            state.messages.push(msg)
            // state.messages.push(action.payload);

            const authUserId = msg.authUserId || 'curr user';
            const friendId = msg.from === authUserId ? msg.to : msg.from;

            state.lastMessagesByUserId[friendId] = msg
            localStorage.setItem(`lstmsg`, JSON.stringify(msg));
        },
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        clearMessages: (state) => {
            state.messages = [];
        },
        setLastMessage: (state, action) => {
            state.lastMessage = action.payload;
            localStorage.setItem('byeMe', action.payload)
        }
    },
});

export const { addMessage, setMessages, clearMessages, setLastMessage } = chatSlice.actions;
export default chatSlice.reducer;
