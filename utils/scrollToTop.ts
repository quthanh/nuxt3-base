export default () => {
  const element = document.getElementById('layout');

  if (element) {
    setTimeout(() => {
      element.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }
};
