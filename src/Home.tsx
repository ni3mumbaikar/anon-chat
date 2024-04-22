import { useEffect, useState } from 'react';
const URL_WEB_SOCKET = 'ws://localhost:8765';
import Dock from './Dock';
import Chat from './Chat';

const Home = () => {
    const [ws, setWs] = useState(null);
    const [username, setUsername] = useState(null)
    const [messages, setMessages] = useState([]);

    const addNewMessage = (messageContent, messageSender) => {
        const newMessage = { 'sender': messageSender, 'content': messageContent, 'timestamp': getCurrentTimeString(), 'self': false };
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
            setWs(wsClient);
        };
        wsClient.onmessage = (evt: any) => {
            setUsername(evt.data)
            console.log(evt)
            console.log('Username fetched :', evt.data)
        };
        wsClient.onclose = () => console.log('ws closed');
        return () => {
            wsClient.close();
        };
    }, []);

    useEffect(() => {
        if (ws) {
            ws.onmessage = (evt: any) => {
                console.log(evt)
                try {
                    const data = JSON.parse(evt.data)
                    addNewMessage(data.msg, data.from)
                }
                catch (err) {
                    console.error(err)
                    setUsername(evt.data)
                    console.log('Username fetched 2 :', evt.data);
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



    return (
        <div className="app__home">
            <div className="chat-container">
                <div className="chat-wrapper">
                    {renderMessages()}
                    {/* <Chat sender={'BotSocrates'} content={'Hi'} timestamp={'03:01 AM'} self={false} /> */}
                    {/* <Chat sender={'Nitin'} content={'Hi'} timestamp={'03:01 AM'} self={true} /> */}
                    {/* <Chat sender={'BotSocrates'} content={'Hi'} timestamp={'03:01 AM'} self={false} /> */}
                    {/* <Chat sender={'Nitin'} content={'Hi'} timestamp={'03:01 AM'} self={true} /> */}
                    {/* <Chat sender={'BotSocrates'} content={'Hi'} timestamp={'03:01 AM'} self={false} /> */}
                    {/* <Chat sender={'Nitin'} content={'Hi'} timestamp={'03:01 AM'} self={true} /> */}
                    {/* <Chat sender={'BotSocrates'} content={'Hi'} timestamp={'03:01 AM'} self={false} /> */}
                    {/* <Chat sender={'Nitin'} content={'Hi'} timestamp={'03:01 AM'} self={true} /> */}
                    {/* <Chat sender={'BotSocrates'} content={'Hi'} timestamp={'03:01 AM'} self={false} /> */}
                    {/* <Chat sender={'Nitin'} content={'Hi'} timestamp={'03:01 AM'} self={true} /> */}
                </div>
            </div>
            <Dock />
        </div>
    );
};
export default Home;
