
const routes = [
  {
    path: '/',
    component: () => import('layouts/PlainLayout.vue'),
    // component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Temp.vue') },
    ],
  },
  {
    path: '/app',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Forumns.vue') },
    ],
  },
  {
    path: '/forumns',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Forumns.vue') },
    ],
  },
  {
    path: '/hot-focus',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/HotFocus.vue') },
    ],
  },
  {
    path: '/buddies-deal',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/BuddiesDeal.vue') },
    ],
  },
  {
    path: '/special-offer',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/SpecialOffer.vue') },
    ],
  },
  {
    path: '/change-info',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/ChangeInfo.vue') },
    ],
  },
  {
    path: '/write-post',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/WritePost.vue') },
    ],
  },

  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Users.vue') },
    ],
  },
  {
    path: '/login',
    component: () => import('layouts/PlainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') },
    ],
  },
  {
    path: '/register',
    component: () => import('layouts/PlainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Register.vue') },
    ],
  },
  {
    path: '/reset-password',
    component: () => import('layouts/PlainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/ResetPassword.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
