export const THEME_STORAGE_KEY = "theme";

/**
 * Runs in <head> before first paint (see layout.tsx): uses the saved choice,
 * otherwise the visitor's system preference.
 */
export const themeScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;
