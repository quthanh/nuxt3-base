const scrollToError = async () => {
  setTimeout(() => {
    const el = document.getElementsByClassName('is-error');

    if (!el || !el.length) {
      return;
    }

    const firstElement = el && (el[0] as HTMLElement);
    if (!firstElement) return;
    firstElement.scrollIntoView({ block: 'center', behavior: 'smooth' });
    // document.body.scrollTop = firstElement.offsetTop - 120 || 0;
    firstElement.focus();
  }, 100);
};

export interface FormPlugin {
  scrollToError: () => void;
}

const form: FormPlugin = {
  scrollToError,
};

export default defineNuxtPlugin(() => {
  return {
    provide: {
      form: form,
    },
  };
});
