import { useEffect, useRef, useState } from "react";
import { MessageSocket } from "../types/message";

const HOST = import.meta.env.VITE_CHAT_WEBSOCKET_HOST;

interface UseWebSocketProps {
  path: string;
  token: string;
  userId: string;
}

const useWebSocket = ({ path, token, userId }: UseWebSocketProps) => {
    const [message, setMessage] = useState<MessageSocket | null>(null); // Single message
    const [isConnected, setIsConnected] = useState(false);
    const socketRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket(`${HOST}${path}?token=${encodeURIComponent(token)}`);
        socketRef.current = ws;

        ws.onopen = () => {
            console.log("WebSocket connected");
            setIsConnected(true);
        };

        ws.onmessage = (event) => {
            const receivedMessage: MessageSocket = JSON.parse(event.data);
            console.log("Received message:", receivedMessage);
            setMessage(receivedMessage); // Update the single messa
        };

        ws.onclose = () => {
            console.log("WebSocket disconnected");
            setIsConnected(false);
        };

        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        return () => {
            ws.close();
        };
    }, [path, token, userId]);

    const sendMessage = (message: MessageSocket) => {
        if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
          console.error("WebSocket is not connected");
          return;
        }
    
        console.log("Sending message:", message);
        socketRef.current.send(JSON.stringify(message));
      };

  return { message, sendMessage, isConnected };
};

export default useWebSocket;
