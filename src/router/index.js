import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    redirect: "/index",
    name: "首页",
    component: Home,
    meta: { icon: "el-icon-s-home" },
    children: [
      {
        path: "index",
        name: "主页",
        meta: { icon: "el-icon-s-home" },
        component: () => import("@/views/index")
      }
    ]
  },
  {
    path: "/message",
    name: "我的消息",
    component: Home,
    meta: { icon: "el-icon-message" },
    children: [
      {
        path: "message",
        name: "消息",
        meta: { icon: "el-icon-message" },
        component: () => import("@/views/message/message")
      }
    ]
  },
  {
    path: "/list",
    name: "列表",
    component: Home,
    meta: { icon: "el-icon-tickets" },
    children: [
      {
        path: "userList",
        name: "用户列表",
        meta: { icon: "el-icon-document" },
        component: () => import("@/views/list")
      },
      {
        path: "list",
        name: "列表模板",
        meta: { icon: "el-icon-document-copy" },
        component: () => import("@/views/list/list")
      }
    ]
  },
  {
    path: "/components",
    name: "组件",
    component: Home,
    meta: { icon: "el-icon-menu" },
    children: [
      {
        path: "picZoom",
        name: "放大镜",
        meta: { icon: "el-icon-search" },
        component: () => import("@/views/components/picZoom")
      },
      {
        path: "listDrag",
        name: "列表拖拽",
        meta: { icon: "el-icon-tickets" },
        component: () => import("@/views/components/listDrag")
      },
      {
        path: "picPreCrop",
        name: "图片裁剪",
        meta: { icon: "el-icon-picture-outline" },
        component: () => import("@/views/components/picpreCrop")
      },
      {
        path: "imageCrop",
        name: "图片裁剪-crop",
        meta: { icon: "el-icon-picture" },
        component: () => import("@/views/components/vueImageCropUpload")
      },
      {
        path: "mteditor",
        name: "mteditor",
        meta: { icon: "el-icon-edit-outline" },
        component: () => import("@/views/components/mteditor")
      }
    ]
  },
  {
    path: "/403",
    name: "403页面",
    component: Home,
    meta: { icon: "el-icon-info" },
    children: [
      {
        path: "403",
        name: "403",
        component: () => import("@/views/common/403")
      }
    ]
  },
  {
    path: "/404",
    name: "404页面",
    component: Home,
    meta: { icon: "el-icon-question" },
    children: [
      {
        path: "404",
        name: "404",
        component: () => import("@/views/common/404")
      }
    ]
  },
  {
    path: "/login",
    name: "登录页面",
    isHidden: true,
    component: () => import("@/views/common/login")
  },
  {
    path: "/403",
    name: "page403",
    isHidden: true,
    component: () => import("@/views/common/403")
  },
  {
    path: "*",
    name: "page404",
    isHidden: true,
    component: () => import("@/views/common/404")
  }
];

const router = new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes
});

export default router;
