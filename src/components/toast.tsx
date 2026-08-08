"use client";

import React, { createContext, useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

interface Toast {
  id: string;
  message: string;
  type?: "success" | "error" | "info";
}

interface ToastContextType {
  showToast: (message: string, type?: "success" | "error" | "info") => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 space-y-3 max-w-sm w-full pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className={`pointer-events-auto p-4 rounded-2xl glass-panel border shadow-2xl flex items-center justify-between gap-3 text-xs text-white ${
                toast.type === "error"
                  ? "border-red-500/40 bg-red-500/10"
                  : toast.type === "info"
                  ? "border-blue-500/40 bg-blue-500/10"
                  : "border-luxury-gold/40 bg-luxury-gold/10"
              }`}
            >
              <div className="flex items-center gap-3">
                {toast.type === "error" ? (
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                ) : toast.type === "info" ? (
                  <Info className="w-5 h-5 text-blue-400 shrink-0" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-luxury-gold shrink-0" />
                )}
                <span className="font-semibold">{toast.message}</span>
              </div>
              <button onClick={() => removeToast(toast.id)} className="text-zinc-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}
