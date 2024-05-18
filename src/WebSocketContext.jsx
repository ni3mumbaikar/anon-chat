import React, { createContext, useContext, useEffect, useState } from "react";

const WebSocketContext = createContext();

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider = ({ children }) => {
  const [webSocket, setWebSocket] = useState(null);

  useEffect(() => {
    if (webSocket === null) {
      const weburl = import.meta.env.VITE_WEBURL;
      const port = import.meta.env.VITE_PORT;
      const newWebSocket = new WebSocket(`ws://${weburl}:${port}`);
      
      console.log(`Connecting to WebSocket at ws://${weburl}:${port}`);
      setWebSocket(newWebSocket);
      console.log("inside ws context");

      // Close the WebSocket on component unmount
      return () => {
        newWebSocket.close();
      };
    }
  }, [webSocket]);

  return (
    <WebSocketContext.Provider value={webSocket}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketContext;
