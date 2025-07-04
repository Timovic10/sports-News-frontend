export const initializeTheme = () => {
  const userTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (userTheme === "dark" || (!userTheme && prefersDark)) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

export const toggleTheme = () => {
  const html = document.documentElement;
  const isDark = html.classList.contains("dark");
  html.classList.toggle("dark", !isDark);
  localStorage.setItem("theme", isDark ? "light" : "dark");
};
