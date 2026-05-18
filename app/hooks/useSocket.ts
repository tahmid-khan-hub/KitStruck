import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

export function useSocket(roomId: string) {
    const socketRef = useRef<Socket | null>(null); // useRef so the socket instance persists across re-renders

    useEffect(() => {
        // connect to server - same origin
        const socket = io();
        socketRef.current = socket;

        // Join specific room for chat
        socket.emit("join-room", roomId);

        // leave and disconnect when component unmounts
        return () => {
            socket.disconnect();
        };
    }, [roomId]);

    return socketRef;
}