import { useEffect, useRef } from "react";
import { useNotificationStore } from "../store/notificationStore";
import { toast } from "sonner";

const NotificationProvider = ({ children }) => {
    const ws = useRef(null);
    const addNotification = useNotificationStore((state) => state.addNotification);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) return;

        // Use wss for secure connection as seen in ChatBox.jsx
        ws.current = new WebSocket(
            `wss://darrenchua.softvencealpha.com/ws/notifications/?token=${token}`
        );

        ws.current.onopen = () => {
        };

        ws.current.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);

                if (data.type === "send_notification" && data.message) {
                    addNotification(data);
                    toast.info("New Notification", {
                        description: data.message,
                    });
                }
            } catch (error) {
            }
        };

        ws.current.onerror = (error) => {
        };

        ws.current.onclose = () => {
        };

        return () => {
            if (ws.current) {
                ws.current.close();
                ws.current = null;
            }
        };
    }, [token, addNotification]);

    return children;
};

export default NotificationProvider;
