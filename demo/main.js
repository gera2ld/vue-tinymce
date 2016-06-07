const VueTinyMCE = module.exports;

Vue.component('vue-tinymce', VueTinyMCE);

new Vue({
  el: 'body',
  data: {
    content: 'abc',
    load: true,
  },
  methods: {
    toggle() {
      this.load = !this.load;
    },
  },
});
