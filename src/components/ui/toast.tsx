import { createContext, useContext, useState } from "react"

type Toast = {
  title: string
  description: string
  status: "success" | "error" | "info"
}

type ToastContextType = {
  toast: (toast: Toast) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = (newToast: Toast) => {
    setToasts((prev) => [...prev, newToast])
    setTimeout(() => {
      setToasts((prev) => prev.slice(1))
    }, 3000)
  }

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 space-y-2">
        {toasts.map((t, i) => (
          <div
            key={i}
            className={`p-4 rounded shadow-md ${
              t.status === "success" ? "bg-green-500" : t.status === "error" ? "bg-red-500" : "bg-blue-500"
            } text-white`}
          >
            <strong>{t.title}</strong>
            <p>{t.description}</p>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}
