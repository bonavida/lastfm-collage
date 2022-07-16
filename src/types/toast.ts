export type ToastStatus = 'success' | 'error' | 'info';

export interface PartialToastData {
  message: string;
  status: ToastStatus;
  duration?: number;
  isStatic?: boolean;
}

export interface ToastData extends PartialToastData {
  id: number;
}
