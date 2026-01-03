import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useNotificationStore } from "../store/notificationStore";

const NotificationProvider = ({ children }) => {
    const ws = useRef(null);
    const queryClient = useQueryClient();
    const setHasUnread = useNotificationStore((state) => state.setHasUnread);
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
                    // Invalidate notifications query to trigger a refetch
                    queryClient.invalidateQueries({ queryKey: ["notifications"] });
                    setHasUnread(true);

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
    }, [token]);

    return children;
};

export default NotificationProvider;
