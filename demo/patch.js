function require(key) {
  return {
    vue: window.Vue,
  }[key];
}

const module = {};
