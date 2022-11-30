export default {
  route: {
    dashboard: "Dashboard",
    permission: "Permission",
    pagePermission: "Page Permission",
    rolePermission: "Role Permission",
    directivePermission: "Directive Permission",
    example: "Example",
    createArticle: "Create Article",
    editArticle: "Edit Article",
    articleList: "Article List",
    errorPages: "Error Pages",
    page401: "401",
    page404: "404",
    externalLink: "External Link",
    profile: "Profile",
  },
  navbar: {
    dashboard: "Dashboard",
    logOut: "Log Out",
    profile: "Profile",
    theme: "Theme",
    size: "Global Size",
  },
  login: {
    title: "Login Form",
    logIn: "Login",
    username: "Username",
    password: "Password",
    any: "any",
    thirdparty: "Or connect with",
    thirdpartyTips:
      "Can not be simulated on local, so please combine you own business simulation! ! !",
  },

  permission: {
    addRole: "New Role",
    editPermission: "Edit",
    roles: "Your roles",
    switchRoles: "Switch roles",
    tips: "In some cases, using v-permission will have no effect. For example: Element-UI  el-tab or el-table-column and other scenes that dynamically render dom. You can only do this with v-if.",
    delete: "Delete",
    confirm: "Confirm",
    cancel: "Cancel",
  },

  example: {
    warning:
      "Creating and editing pages cannot be cached by keep-alive because keep-alive include does not currently support caching based on routes, so it is currently cached based on component name. If you want to achieve a similar caching effect, you can use a browser caching scheme such as localStorage. Or do not use keep-alive include to cache all pages directly. See details",
  },

  tagsView: {
    refresh: "Refresh",
    close: "Close",
    closeOthers: "Close Others",
    closeAll: "Close All",
  },
  settings: {
    title: "Page style setting",
    change: "Change Theme",
    tagsView: "Open Tags-View",
    fixedHeader: "Fixed Header",
    sidebarLogo: "Sidebar Logo",
    search: "Menu Search",
    screenFull: "Full Screen",
    sizeSelect: "Size Select",
    langSelect: "Lang Select",
  },
};
