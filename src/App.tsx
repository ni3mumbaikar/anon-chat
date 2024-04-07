import { useEffect, useState } from 'react';

function App() {
  // const [inputValue, setInputValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  let ws:any;
  let messages= "";
  useEffect(() => {
    // Create a WebSocket connection when the component mounts
    ws = new WebSocket('ws://localhost:8765');

    // Event listener for open connection
    ws.onopen = () => {
      console.log('WebSocket connection established.');
    };

    // Event listener for incoming messages
    ws.onmessage = (event:any) => {
      console.log(event);
      setMessage(event.data);
    };

    // Event listener for closing connection
    ws.onclose = () => {
      console.log('WebSocket connection closed.');
    };

    // Event listener for errors
    ws.onerror = (error:any) => {
      console.error('WebSocket error:', error);
    };

    // Clean up function to close the WebSocket connection when component unmounts
    return () => {
      ws.close();
    };
  }, []);



  const inlineStyles = {
    width: '100vh',
    height: '500px',
    border: '1px solid black'
    // Add any other styles you need here
  };

  function setMessage(msg:String){
      messages += msg;
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log("hi"+inputValue);
    event.preventDefault(); // Prevent default form submission behavior
    console.log("hi"+inputValue);
    // Send input value to the WebSocket server
    if (ws && ws.readyState === WebSocket.OPEN) {
      console.log("hi"+inputValue);
      ws.send(inputValue);
      setInputValue(''); // Clear input field after submission
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <>
      <div style={inlineStyles}>
        {
          messages
          // "Hi"
        }
        <div>
                <h3>WebSocket Example</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button type="submit">Send</button>
      </form>
      
      </div>
 
      </div>
    </>
  );
}


export default App;
