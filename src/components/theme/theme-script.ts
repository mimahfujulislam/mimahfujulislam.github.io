/**
 * Inline, render-blocking script: applies the saved theme before first paint.
 * Dark is the default; only an explicit "light" choice removes it.
 */
export const themeScript = `(function(){try{var t=localStorage.getItem('theme');document.documentElement.classList.toggle('dark',t!=='light');}catch(e){}})();`;
