(function () {
  var STORAGE_KEY = 'ghdi-global-theme';
  var root = document.documentElement;

  function normalizeHex(hex) {
    if (!hex) return '#F19E38';
    var value = String(hex).trim().toUpperCase();
    if (value.charAt(0) !== '#') value = '#' + value;
    if (value.length === 4) {
      value = '#' + value.charAt(1) + value.charAt(1) + value.charAt(2) + value.charAt(2) + value.charAt(3) + value.charAt(3);
    }
    return value;
  }

  function hexToRgb(hex) {
    var value = normalizeHex(hex).replace('#', '');
    var int = parseInt(value, 16);
    return {
      r: (int >> 16) & 255,
      g: (int >> 8) & 255,
      b: int & 255
    };
  }

  function rgbToHex(rgb) {
    function toHex(part) {
      return part.toString(16).padStart(2, '0');
    }
    return ('#' + toHex(rgb.r) + toHex(rgb.g) + toHex(rgb.b)).toUpperCase();
  }

  function mix(hex, targetHex, weight) {
    var from = hexToRgb(hex);
    var to = hexToRgb(targetHex);
    return rgbToHex({
      r: Math.round(from.r + (to.r - from.r) * weight),
      g: Math.round(from.g + (to.g - from.g) * weight),
      b: Math.round(from.b + (to.b - from.b) * weight)
    });
  }

  function darken(hex, weight) {
    return mix(hex, '#000000', weight);
  }

  function buildTheme(name, color) {
    var theme = normalizeHex(color);
    return {
      name: name || '琥珀橙',
      color: theme,
      deep: darken(theme, 0.12),
      light8: mix(theme, '#FFFFFF', 0.86),
      light9: mix(theme, '#FFFFFF', 0.92)
    };
  }

  function applyTheme(theme) {
    root.style.setProperty('--theme-color', theme.color);
    root.style.setProperty('--theme-color-deep', theme.deep);
    root.style.setProperty('--theme-color-light-8', theme.light8);
    root.style.setProperty('--theme-color-light-9', theme.light9);
    document.dispatchEvent(new CustomEvent('ghdi-theme-change', { detail: theme }));
  }

  function readStoredTheme() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      return buildTheme(parsed.name, parsed.color);
    } catch (error) {
      return null;
    }
  }

  function writeStoredTheme(theme) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
        name: theme.name,
        color: theme.color
      }));
    } catch (error) {
      // ignore
    }
  }

  function getTheme() {
    return readStoredTheme() || buildTheme('琥珀橙', '#F19E38');
  }

  function setTheme(name, color) {
    var theme = buildTheme(name, color);
    writeStoredTheme(theme);
    applyTheme(theme);
    return theme;
  }

  applyTheme(getTheme());

  window.__ghdiThemeRuntime = {
    getTheme: getTheme,
    setTheme: setTheme,
    buildTheme: buildTheme
  };
})();
