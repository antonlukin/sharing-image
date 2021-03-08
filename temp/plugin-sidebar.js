(function (wp) {
  var registerPlugin = wp.plugins.registerPlugin;
  var PluginSidebar = wp.editPost.PluginSidebar;
  var PluginSidebarMoreMenuItem = wp.editPost.PluginSidebarMoreMenuItem;
  var el = wp.element.createElement;
  var Text = wp.components.TextControl;
  var Fragment = wp.element.Fragment;

  registerPlugin('my-plugin-sidebar', {
    render: function () {
      return el(
        Fragment, {},
        el(
          PluginSidebarMoreMenuItem, {
            target: 'my-plugin-sidebar'
          },
          'My Plugin Sidebar'
        ),
        el(
          PluginSidebar, {
            name: 'my-plugin-sidebar',
            icon: 'admin-post',
            title: 'My plugin sidebar'
          },
          el('div', {
              className: 'plugin-sidebar-content'
            },
            el(Text, {
              label: 'Meta Block Field',
              value: 'Initial value',
              onChange: function (content) {
                console.log('content changed to ', content);
              },
            })
          )
        )
      );
    }
  });
})(window.wp);