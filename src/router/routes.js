const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/login-register-page.vue') }
    ]
  },
  {
    path: '/account',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/myaccount.vue') }
    ]
  },
  {
    path: '/programme',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/programme.vue') }
    ]
  },
  {
    path: '/photo',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/photo.vue') }
    ]
  }
  ,
  {
    path: '/plan',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/plan.vue') }
    ]
  },
  {
    path: '/partenaires',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/partenaires.vue') }
    ]
  },
  {
    path: '/informations',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/informations.vue') }
    ]
  },
  {
    path: '/faq',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/faq.vue') }
    ]
  },
  {
    path: '/faq/:id',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/content-faq.vue') }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
