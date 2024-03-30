
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
    ]
  },
  {
    path: '/customer',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/customer/CustomerPage.vue') },
      { path: ':id', component: () => import('pages/customer/DetailCustomerPage.vue') },
      { path: 'addCustomer', component: () => import('pages/customer/AddCustomerPage.vue') },
    ]
  },
  {
    path: '/pets',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/pets/PetsPage.vue') },
      { path: ':id', component: () => import('pages/pets/DetailPetsPage.vue') },
      { path: 'addPets', component: () => import('pages/pets/AddPetsPage.vue') },
    ]
  },
  {
    path: '/grooming',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/grooming/GroomingPage.vue') },
      { path: ':id', component: () => import('pages/grooming/DetailGroomingPage.vue') },
      { path: 'addGrooming', component: () => import('pages/grooming/AddGroomingPage.vue') },
    ]
  },
  {
    path: '/groceries',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/groceries/GroceriesPage.vue') },
      {
        path: ':id',
        children: [
          { path: '', component: () => import('pages/groceries/DetailGroceriesPage.vue') },
          { path: 'edit', component: () => import('pages/groceries/EditGroceriesPage.vue') },
        ]
      },
      { path: 'addGroceries', component: () => import('pages/groceries/AddGroceriesPage.vue') },
    ]
  },
  {
    path: '/medicine',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/medicine/MedicinePage.vue') },
      { path: ':id', component: () => import('pages/medicine/DetailMedicinePage.vue') },
      { path: 'addMedicine', component: () => import('pages/medicine/AddMedicinePage.vue') },
    ]
  },
  {
    path: '/clinic',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/clinic/ClinicPage.vue') },
      {
        path: ':id',
        children: [
          { path: '', component: () => import('pages/groceries/DetailClinicPage.vue') },
          { path: 'edit', component: () => import('pages/groceries/EditClinicPage.vue') },
        ]
      },
      { path: 'addClinic', component: () => import('pages/clinic/AddClinicPage.vue') },
    ]
  },
  {
    path: '/login',
    component: () => import('pages/login/LoginPage.vue')
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
