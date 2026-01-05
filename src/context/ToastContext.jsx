import React, { createContext, useContext, useState, useCallback } from "react";
import ToastContainer from "../components/Toast";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = "info") => {
        const id = Date.now();
        setToasts((prev) => {
            // Keep only the last 2 toasts, then add the new one -> Max 3
            const updated = prev.slice(-2);
            return [...updated, { id, message, type }];
        });

        // Auto-remove removed as per user request
        // setTimeout(() => {
        //     setToasts((prev) => prev.filter((t) => t.id !== id));
        // }, 3000);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    // Helper functions for cleaner API
    const toast = {
        success: (msg) => addToast(msg, "success"),
        error: (msg) => addToast(msg, "error"),
        info: (msg) => addToast(msg, "info"),
    };

    const clearToasts = useCallback(() => {
        setToasts([]);
    }, []);

    return (
        <ToastContext.Provider value={{ toast, addToast, removeToast, clearToasts }}>
            {children}
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};
