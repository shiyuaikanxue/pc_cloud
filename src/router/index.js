import { createRouter, createWebHistory } from "vue-router";
import CloudView from "../views/CloudView.vue";
import store from "@/store/index.js";
const routes = [
  {
    path: "/cloud",
    name: "cloud",
    component: CloudView,
    children: [
      {
        path: "select",
        name: "select",
        component: () => import("../components/cloud/Options/Select.vue"),
      },
      {
        path: "ground",
        name: "ground",
        component: () => import("../components/cloud/Options/Ground.vue"),
      },
      {
        path: "rank",
        name: "rank",
        component: () => import("../components/cloud/Options/Rank.vue"),
      },
      {
        path: "singer",
        name: "singer",
        component: () => import("../components/cloud/Options/Singer.vue"),
      },
      {
        path: "important",
        name: "important",
        component: () => import("../components/cloud/Options/Important.vue"),
      },
    ],
  },
  {
    path: "/podcast",
    name: "podcast",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/PodcastView.vue"),
  },
  {
    path: "/community",
    name: "community",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/CommunityView.vue"),
  },
  {
    path: "/love",
    name: "love",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LoveView.vue"),
  },
  {
    path: "/lately",
    name: "lately",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LatelyView.vue"),
  },
  {
    path: "/download",
    name: "download",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/DownloadView.vue"),
  },
  {
    path: "/local",
    name: "local",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LocalView.vue"),
  },
  {
    path: "/musicList",
    name: "musicList",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/MusicList.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  const viewToSwitch = to.matched.length?to.matched[0].name:to.name;
  store.commit("switchView", viewToSwitch);
  next(); // 确保总是调用 next()
});

export default router;
