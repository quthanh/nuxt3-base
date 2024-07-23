import { createVNode, render } from 'vue';
import ToastComponent from '~/core/ui/Toast/Toast.vue';
import type { ToastType } from '~/core/ui/Toast/type';

let instance: any; // Change 'any' to the correct type if possible
let timeoutId: NodeJS.Timeout | null = null;

const defaultToast = (message: string, type: ToastType = 'success', time: number = 3000): void => {
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }

  if (!instance) {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const toastVNode = createVNode(ToastComponent, {
      message: message,
      show: true,
      type: type,
    });
    render(toastVNode, container);

    instance = toastVNode.component;
  }

  instance.props.show = true;
  instance.props.message = message;
  instance.props.type = type;

  timeoutId = setTimeout(() => {
    instance.props.show = false;
  }, time);
};

const success = (message: string, time?: number) => {
  return defaultToast(message, 'success', time);
};

const error = (message: string, time?: number) => {
  return defaultToast(message, 'error', time);
};

const info = (message: string, time?: number) => {
  return defaultToast(message, 'info', time);
};

const warning = (message: string, time?: number) => {
  return defaultToast(message, 'warning', time);
};

export interface ToastPlugin {
  success: (message: string, time?: number) => void;
  error: (message: string, time?: number) => void;
  info: (message: string, time?: number) => void;
  warning: (message: string, time?: number) => void;
}

const toast: ToastPlugin = {
  success,
  info,
  error,
  warning,
};

export default defineNuxtPlugin(() => {
  return {
    provide: {
      toast: toast,
    },
  };
});
