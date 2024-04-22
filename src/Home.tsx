import { useEffect, useState } from 'react';
const URL_WEB_SOCKET = 'ws://localhost:8765';
import Dock from './Dock';
import Chat from './Chat';

const Home = () => {
    const [ws, setWs] = useState(null);
    const [username, setUsername] = useState(null)

    useEffect(() => {
        const wsClient = new WebSocket(URL_WEB_SOCKET);
        wsClient.onopen = () => {
            setWs(wsClient);
        };
        wsClient.onmessage = (evt: any) => {
            setUsername(evt.data)
            console.log(evt)
            console.log('Username fetched :', username)
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
            };
        }
    }, [ws]);

    return (
        <div className="app__home">
            <Chat sender={'BotSocrates'} content={'Hi'} timestamp={'03:01 AM'} self={false} />
            <Chat sender={'Nitin'} content={'Hi'} timestamp={'03:01 AM'} self={true} />
            <Dock />
        </div>
    );
};
export default Home;
