export const ScrollTo = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const y = element.getBoundingClientRect().top + window.pageYOffset - 180;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};
