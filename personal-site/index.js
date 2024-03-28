// Thanks to https://dev.to/whitep4nth3r/the-best-lightdark-mode-theme-toggle-in-javascript-368f for the tutorial for the dark mode

function calculateSettingAsThemeString({
  localStorageTheme,
  systemSettingDark,
}) {
  if (localStorageTheme !== null) {
    return localStorageTheme;
  }

  if (systemSettingDark.matches) {
    return "dark";
  }

  return "light";
}

function updateButton({ buttonEl, buttonElIcon, isDark }) {
  const newCta = isDark ? "Change to light theme" : "Change to dark theme";
  const newIcon = isDark ? "images/sun-icon.png" : "images/moon-icon.png";
  buttonEl.setAttribute("aria-label", newCta);
  buttonElIcon.setAttribute("src", newIcon);
}

function updateThemeOnHtmlEl({ theme }) {
  document.querySelector("html").setAttribute("data-theme", theme);
}

const button = document.querySelector("[data-theme-toggle]");
const buttonIcon = document.querySelector("[data-theme-icon]");
const localStorageTheme = localStorage.getItem("theme");
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");

let currentThemeSetting = calculateSettingAsThemeString({
  localStorageTheme,
  systemSettingDark,
});

updateButton({
  buttonEl: button,
  buttonElIcon: buttonIcon,
  isDark: currentThemeSetting === "dark",
});
updateThemeOnHtmlEl({ theme: currentThemeSetting });

button.addEventListener("click", (event) => {
  const newTheme = currentThemeSetting === "dark" ? "light" : "dark";

  localStorage.setItem("theme", newTheme);
  updateButton({
    buttonEl: button,
    buttonElIcon: buttonIcon,
    isDark: newTheme === "dark",
  });
  updateThemeOnHtmlEl({ theme: newTheme });

  currentThemeSetting = newTheme;
});
