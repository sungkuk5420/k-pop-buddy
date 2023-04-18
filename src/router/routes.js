
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Forums.vue') },
    ],
  },
  {
    path: '/forums',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Forums.vue') },
    ],
  },
  {
    path: '/my-page',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/MyPage.vue') },
    ],
  },
  {
    path: '/forums-details',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'forumsDetails', props: { category: 'forums' }, component: () => import('pages/Details.vue') },
    ],
  },
  {
    path: '/hot-focus-details',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'hotFocusDetails', props: { category: 'hot-focus' }, component: () => import('pages/Details.vue') },
    ],
  },
  {
    path: '/deal-details',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'dealDetails', props: { category: 'deal' }, component: () => import('pages/Details.vue') },
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
    path: '/deal',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Deal.vue') },
    ],
  },
  {
    path: '/premium-service',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/PremiumService.vue') },
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
    path: '/edit-post',
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
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') },
    ],
  },
  {
    path: '/register',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Register.vue') },
    ],
  },
  {
    path: '/reset-password',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/ResetPassword.vue') },
    ],
  },
  {
    path: '/contact-us',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/ContactUs.vue') },
    ],
  },
  {
    path: '/terms-and-rules',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/TermsAndRules.vue') },
    ],
  },
  {
    path: '/privacy-policy',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/PrivacyPolicy.vue') },
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
