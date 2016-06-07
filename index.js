const Vue = require('vue');

module.exports = Vue.extend({
  props: ['config', 'content'],
  template: '<textarea></textarea>',
  methods: {
    getId: function () {
      var id = 0;
      const prefix = 'vue-tinymce-';
      return function () {
        return prefix + (++ id);
      };
    }(),
  },
  ready() {
    function updateContent(editor) {
      if (editor.isDirty()) {
        editor.save();
        vm.content = editor.getContent().trim();
      }
    }
    const vm = this;
    vm.attrId = vm.getId();
    vm.$el.id = vm.attrId;
    const config = Object.assign({
    }, vm.config, {
      selector: '#' + vm.attrId,
      setup: editor => {
        editor.on('init', () => {
          editor.setContent(vm.content || '');
        });
        editor.on('ExecCommand change NodeChange ObjectResized', () => {
          updateContent(editor);
        });
        const setup = vm.config && vm.config.setup;
        setup && setup(editor);
      },
    });
    tinymce.init(config);
  },
  beforeDestroy() {
    const ins = tinymce.get(this.attrId);
    ins.remove();
  },
});
