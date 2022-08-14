import {toast, ToastOptions, ToastContent, Slide} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DEFAULT_OPTIONS: ToastOptions = {
  autoClose: 3000,
  transition: Slide,
};

const WARNING_OPTIONS: ToastOptions = {
  autoClose: 8000,
};

const ERROR_OPTIONS: ToastOptions = {
  autoClose: 13000,
};

const getId = (message: ToastContent): string | undefined => {
  if (typeof message === 'string' || typeof message === 'number') {
    return `${message}`;
  }

  return undefined;
};

class Notifications {
  async init() {}

  async info(message: ToastContent, options?: ToastOptions) {
    return this.notify(message, {
      type: 'info',
      ...options,
    });
  }

  async error(message: ToastContent, options?: ToastOptions) {
    return this.notify(message, {
      type: 'error',
      ...ERROR_OPTIONS,
      ...options,
    });
  }

  async success(message: ToastContent, options?: ToastOptions) {
    return this.notify(message, {
      type: 'success',
      ...options,
    });
  }

  async warning(message: ToastContent, options?: ToastOptions) {
    return this.notify(message, {
      type: 'warning',
      ...WARNING_OPTIONS,
      ...options,
    });
  }

  async dismiss(message: ToastContent) {
    const toastId = getId(message);
    return toast.dismiss(toastId);
  }

  private notify(message: ToastContent, options?: ToastOptions) {
    const toastId = getId(message);
    const isActive = !!toastId && toast.isActive(toastId);

    return isActive
      ? toastId
      : toast(message, {
          toastId,
          ...DEFAULT_OPTIONS,
          ...options,
        });
  }
}

export const notifications = new Notifications();

