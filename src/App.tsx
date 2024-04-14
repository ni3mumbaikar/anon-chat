import { useState, useEffect } from 'react';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState('');
  let message: any = '';
  let ws = new WebSocket('ws://localhost:8765');
  useEffect(() => {


    ws.onopen = () => {
      console.log('WebSocket connection established.');
    };

    ws.onmessage = (event: any) => {
      console.log(event);
      // console.log("text")
      message = message + "\n" + event.data;
      setMessages(message);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed.');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // return () => {
    //   ws.close();
    // };
  }, []);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(inputValue);
      setInputValue('');
    }
  };

  const inlineStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh'
  };

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  return (
    <div style={inlineStyles}>
      <div>
        <div>{messages}</div>
        <div>
          <h3>WebSocket Example</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Type your message..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
