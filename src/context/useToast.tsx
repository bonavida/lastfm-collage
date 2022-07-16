import { createContext, useContext, useState } from 'react';
/** Components */
import ToastContainer from '@components/ToastContainer';
import Toast from '@components/ToastContainer/Toast';
/** Types */
import { ToastData, PartialToastData } from '@customTypes/toast';

interface ToastContextProps {
  addToast: (toastData: PartialToastData) => void;
  dismissToast: (id: number) => void;
}

interface ToastProviderProps {
  children: React.ReactNode;
}

const ToastContext = createContext<ToastContextProps>({
  addToast: () => {},
  dismissToast: () => {},
});

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = (toastData: PartialToastData) => {
    const id = toasts.length;
    const toast: ToastData = { id, ...toastData };
    setToasts([...toasts, toast]);
  };

  const dismissToast = (id: number) => {
    const newToasts = toasts.filter(({ id: toastId }) => toastId !== id);
    setToasts(newToasts);
  };

  const handleDismissToast = (id: number) => () => dismissToast(id);

  return (
    <ToastContext.Provider value={{ addToast, dismissToast }}>
      {children}
      <ToastContainer>
        {toasts.map(({ id, ...toast }) => (
          <Toast key={id} {...toast} onDismiss={handleDismissToast(id)} />
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
