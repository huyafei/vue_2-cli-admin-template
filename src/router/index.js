import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

// 处理路由跳转报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location, resolve, reject) {
  if (resolve || reject)
    return originalPush.call(this, location, resolve, reject);
  return originalPush.call(this, location).catch((e) => {});
};
const originalReplace = Router.prototype.replace;
Router.prototype.replace = function replace(location, resolve, reject) {
  if (resolve || reject)
    return originalReplace.call(this, location, resolve, reject);
  return originalPush.call(this, location).catch((e) => {});
};

/* Layout */
import Layout from "@/layout";
/* Router Modules */
import nestedRouter from "./modules/nested";
/**
 *
 * hidden: true                   路由是否在左侧栏隐藏，(默认 false)
 * alwaysShow: true               当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面,
 *                                若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: 'noRedirect'           设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'             设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
    roles: ['admin','editor']    设置该路由进入的权限，支持多个权限叠加
    title: 'title'               设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'/'el-icon-x' 设置该路由的图标，支持 svg-class，也支持 el-icon-x element-ui 的 icon
    noCache: true                如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    affix: true                  若果设置为true，它则会固定在tags-view中(默认 false)
    breadcrumb: false            如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)
    activeMenu: '/example/list'  当路由设置了该属性，则会高亮相对应的侧边栏。
                                 这在某些场景非常有用，比如：一个文章的列表页路由为：/article/list
                                 点击文章进入文章详情页，这时候路由为/article/1，但你想在侧边栏高亮文章列表的路由，就可以进行如下设置
  }
 */

/**
 * constantRoutes
 * 不需要动态判断权限的路由
 */
export const constantRoutes = [
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },
  {
    path: "/auth-redirect",
    component: () => import("@/views/login/auth-redirect"),
    hidden: true,
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404"),
    hidden: true,
  },
  {
    path: "/401",
    component: () => import("@/views/error-page/401"),
    hidden: true,
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index"),
        name: "Dashboard",
        meta: { title: "dashboard", icon: "dashboard", affix: true },
      },
    ],
  },
  {
    path: "/profile",
    component: Layout,
    redirect: "/profile/index",
    hidden: true,
    children: [
      {
        path: "index",
        component: () => import("@/views/profile/index"),
        name: "Profile",
        meta: { title: "profile", icon: "user", noCache: true },
      },
    ],
  },
];

/**
 * asyncRoutes
 * 需要动态判断权限并通过 addRoutes 动态添加的页面
 */
export const asyncRoutes = [
  nestedRouter,

  /** when your routing map is too long, you can split it into small modules **/

  {
    path: "/example",
    component: Layout,
    redirect: "/example/list",
    name: "Example",
    meta: {
      title: "example",
      icon: "el-icon-s-help",
    },
    children: [
      {
        path: "create",
        component: () => import("@/views/example/create"),
        name: "CreateArticle",
        meta: { title: "createArticle", icon: "edit" },
      },
      {
        path: "edit/:id(\\d+)",
        component: () => import("@/views/example/edit"),
        name: "EditArticle",
        meta: {
          title: "editArticle",
          noCache: true,
          activeMenu: "/example/list",
        },
        hidden: true,
      },
      {
        path: "list",
        component: () => import("@/views/example/list"),
        name: "ArticleList",
        meta: { title: "articleList", icon: "list" },
      },
    ],
  },
  {
    path: "external-link",
    component: Layout,
    children: [
      {
        path: "https://www.baidu.com",
        meta: { title: "externalLink", icon: "link" },
      },
    ],
  },

  {
    path: "/permission",
    component: Layout,
    redirect: "/permission/page",
    alwaysShow: true, // will always show the root menu
    name: "Permission",
    meta: {
      title: "permission",
      icon: "lock",
      roles: ["admin", "editor"], // you can set roles in root nav
    },
    children: [
      {
        path: "page",
        component: () => import("@/views/permission/page"),
        name: "PagePermission",
        meta: {
          title: "pagePermission",
          roles: ["admin"], // or you can only set roles in sub nav
        },
      },
      {
        path: "directive",
        component: () => import("@/views/permission/directive"),
        name: "DirectivePermission",
        meta: {
          title: "directivePermission",
          // if do not set roles, means: this page does not require permission
        },
      },
      {
        path: "role",
        component: () => import("@/views/permission/role"),
        name: "RolePermission",
        meta: {
          title: "rolePermission",
          roles: ["admin"],
        },
      },
    ],
  },

  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    mode: "hash", // 或者 'history' require service support
    base: process.env.VUE_APP_PROJECT_BASE,
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
