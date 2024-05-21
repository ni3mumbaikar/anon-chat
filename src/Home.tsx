import { useEffect, useState, useRef } from 'react';
import Dock from './Dock';
import Chat from './Chat';

const Home = () => {
    const [ws, setWs] = useState(null);
    const [username, setUsername] = useState(null);
    const [messages, setMessages] = useState([]);
    const [typedMsg, setTypedMsg] = useState("");
    const chatContainerRef = useRef(null); // Reference to the chat container

    const addNewMessage = (messageContent, messageSender, self) => {
        const newMessage = { 'sender': messageSender, 'content': messageContent, 'timestamp': getCurrentTimeString(), 'self': self };
        setMessages(prevMessages => [...prevMessages, newMessage]); // Add new message to the state
    };

    const renderMessages = () => {
        return messages.map((message, index) => (
            <Chat key={index} content={message.content} sender={message.sender} timestamp={message.timestamp} self={message.self} />
        ));
    };

    useEffect(() => {
        const weburl = import.meta.env.VITE_WEBURL;
        const port = import.meta.env.VITE_PORT;
        console.log(`Connecting to WebSocket at ws://${weburl}:${port}`);
        const wsClient = new WebSocket(`ws://${weburl}:${port}`);
        wsClient.onopen = () => {
            console.log('ws opened');
            setWs(wsClient);
        };
        wsClient.onmessage = (evt) => {
            setUsername(evt.data);
        };
        wsClient.onclose = () => console.log('ws closed');
        return () => {
            wsClient.close();
        };
    }, []);

    useEffect(() => {
        if (ws) {
            ws.onmessage = (evt) => {
                try {
                    const data = JSON.parse(evt.data);
                    addNewMessage(data.msg, data.from, false);
                } catch (err) {
                    console.log(err);
                    setUsername(evt.data);
                }
            };
        }
    }, [ws]);

    useEffect(() => {
        // Scroll to bottom when messages change
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    function getCurrentTimeString() {
        const date = new Date();
        const hours = date.getHours() % 12 || 12; // Convert to 12-hour format (adjust for AM/PM)
        const minutes = date.getMinutes().toString().padStart(2, '0'); // Add leading zero for single-digit minutes
        const ampm = (date.getHours() < 12) ? 'AM' : 'PM';

        return `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
    }

    function newCurrentUserMsg(data) {
        setTypedMsg(data);
    }

    function onSend() {
        addNewMessage(typedMsg.trim(), username, true);
        ws.send(typedMsg.trim());
        setTypedMsg('');
    }

    return (
        <div className="app__home">
            <div className="chat-container" ref={chatContainerRef}>
                <div className="chat-wrapper">
                    {renderMessages()}
                </div>
            </div>
            <Dock onSend={onSend} msgInputEvent={newCurrentUserMsg} typedMsg={typedMsg} />
        </div>
    );
};

export default Home;
