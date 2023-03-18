
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Forumns.vue') },
      { path: 'forumns', component: () => import('pages/Forumns.vue') },
      { path: 'hot-focus', component: () => import('pages/HotFocus.vue') },
      { path: 'buddies-deal', component: () => import('pages/BuddiesDeal.vue') },
      { path: 'special-offer', component: () => import('pages/SpecialOffer.vue') },
      { path: 'login', component: () => import('pages/Login.vue') },
      { path: 'register', component: () => import('pages/Register.vue') },
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
