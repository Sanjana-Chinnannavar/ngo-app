import React from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

const ToastContainer = ({ toasts, removeToast }) => {
    return (
        <div className="fixed top-24 right-6 z-[100] flex flex-col gap-4 pointer-events-none">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`pointer-events-auto flex items-start gap-4 px-6 py-5 rounded-xl shadow-2xl border-2 animate-in slide-in-from-right-10 fade-in duration-300 min-w-[380px] max-w-md bg-white ${toast.type === "success"
                        ? "border-green-100 bg-green-50 shadow-green-100/50"
                        : toast.type === "error"
                            ? "border-red-100 bg-red-50 shadow-red-100/50"
                            : "border-blue-100 bg-blue-50 shadow-blue-100/50"
                        }`}
                >
                    <div
                        className={`p-3 rounded-full flex-shrink-0 ${toast.type === "success"
                            ? "bg-green-100 text-green-600"
                            : toast.type === "error"
                                ? "bg-red-100 text-red-600"
                                : "bg-blue-100 text-blue-600"
                            }`}
                    >
                        {toast.type === "success" ? (
                            <CheckCircle className="w-7 h-7" />
                        ) : toast.type === "error" ? (
                            <AlertCircle className="w-7 h-7" />
                        ) : (
                            <Info className="w-7 h-7" />
                        )}
                    </div>

                    <div className="flex-1 pt-1">
                        <h4
                            className={`text-lg font-bold mb-1 leading-none ${toast.type === "success"
                                ? "text-green-900"
                                : toast.type === "error"
                                    ? "text-red-900"
                                    : "text-blue-900"
                                }`}
                        >
                            {toast.type === "success"
                                ? "Success"
                                : toast.type === "error"
                                    ? "Error"
                                    : "Info"}
                        </h4>
                        <div
                            className={`text-base font-medium leading-relaxed ${toast.type === "success"
                                ? "text-green-800"
                                : toast.type === "error"
                                    ? "text-red-800"
                                    : "text-blue-800"
                                }`}
                        >
                            {toast.message}
                        </div>
                    </div>

                    <button
                        onClick={() => removeToast(toast.id)}
                        className={`p-2 rounded-lg transition-colors -mr-2 -mt-2 ${toast.type === "success"
                            ? "hover:bg-green-200 text-green-600"
                            : toast.type === "error"
                                ? "hover:bg-red-200 text-red-600"
                                : "hover:bg-blue-200 text-blue-600"
                            }`}
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ToastContainer;
