import { useEffect, useState } from 'react';
const URL_WEB_SOCKET = 'ws://localhost:8765';
import Dock from './Dock';
import Chat from './Chat';

const Home = () => {
    const [ws, setWs] = useState(null);
    const [username, setUsername] = useState(null)
    const [messages, setMessages] = useState([]);
    const [typedMsg, setTypedMsg] = useState("");

    const addNewMessage = (messageContent, messageSender, self) => {
        const newMessage = { 'sender': messageSender, 'content': messageContent, 'timestamp': getCurrentTimeString(), 'self': self };
        setMessages([...messages, newMessage]); // Add new message to the state
    };

    const renderMessages = () => {
        return messages.map((message, index) => (
            <Chat key={index} content={message.content} sender={message.sender} timestamp={message.timestamp} self={message.self} />
        ));
    };

    useEffect(() => {
        const wsClient = new WebSocket(URL_WEB_SOCKET);
        wsClient.onopen = () => {
            console.log('ws opened')
            setWs(wsClient);
        };
        wsClient.onmessage = (evt: any) => {
            setUsername(evt.data)
        };
        wsClient.onclose = () => console.log('ws closed');
        return () => {
            wsClient.close();
        };
    }, []);

    useEffect(() => {
        if (ws) {
            ws.onmessage = (evt: any) => {
                try {
                    const data = JSON.parse(evt.data)
                    addNewMessage(data.msg, data.from, false)
                }
                catch (err) {
                    console.log(err)
                    setUsername(evt.data)
                }
            };
        }
    }, [ws, messages]);


    function getCurrentTimeString() {
        const date = new Date();
        const hours = date.getHours() % 12 || 12; // Convert to 12-hour format (adjust for AM/PM)
        const minutes = date.getMinutes().toString().padStart(2, '0'); // Add leading zero for single-digit minutes
        const ampm = (date.getHours() < 12) ? 'AM' : 'PM';

        return `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
    }

    function newCurrentUserMsg(data) {
        setTypedMsg(data)
    }

    function onSend() {
        addNewMessage(typedMsg.trim(), username, true);
        console.log(typedMsg)
        ws.send(typedMsg)
        setTypedMsg('');
    }

    return (
        <div className="app__home">
            <div className="chat-container">
                <div className="chat-wrapper">
                    {renderMessages()}
                </div>
            </div>
            <Dock onSend={onSend} msgInputEvent={newCurrentUserMsg} typedMsg={typedMsg} />
        </div>
    );
};
export default Home;
