export default {
  route: {
    dashboard: "首页",
    permission: "权限测试页",
    rolePermission: "角色权限",
    pagePermission: "页面权限",
    directivePermission: "指令权限",
    example: "综合实例",
    createArticle: "创建文章",
    editArticle: "编辑文章",
    articleList: "文章列表",
    errorPages: "错误页面",
    page401: "401",
    page404: "404",
    externalLink: "外链",
    profile: "个人中心",
  },
  navbar: {
    dashboard: "首页",
    logOut: "退出登录",
    profile: "个人中心",
    theme: "换肤",
    size: "布局大小",
  },
  login: {
    title: "系统登录",
    logIn: "登录",
    username: "账号",
    password: "密码",
    any: "随便填",
    thirdparty: "第三方登录",
    thirdpartyTips: "本地不能模拟，请结合自己业务进行模拟！！！",
  },

  permission: {
    addRole: "新增角色",
    editPermission: "编辑权限",
    roles: "你的权限",
    switchRoles: "切换权限",
    tips: "在某些情况下，不适合使用 v-permission。例如：Element-UI 的 el-tab 或 el-table-column 以及其它动态渲染 dom 的场景。你只能通过手动设置 v-if 来实现。",
    delete: "删除",
    confirm: "确定",
    cancel: "取消",
  },

  example: {
    warning:
      "创建和编辑页面是不能被 keep-alive 缓存的，因为keep-alive 的 include 目前不支持根据路由来缓存，所以目前都是基于 component name 来进行缓存的。如果你想类似的实现缓存效果，可以使用 localStorage 等浏览器缓存方案。或者不要使用 keep-alive 的 include，直接缓存所有页面。详情见",
  },

  tagsView: {
    refresh: "刷新",
    close: "关闭",
    closeOthers: "关闭其它",
    closeAll: "关闭所有",
  },
  settings: {
    title: "系统布局配置",
    theme: "主题色",
    tagsView: "开启 Tags-View",
    fixedHeader: "固定 Header",
    sidebarLogo: "侧边栏 Logo",
    search: "菜单搜索",
    screenFull: "全屏",
    sizeSelect: "布局大小选择",
    langSelect: "语言选择",
  },
};
