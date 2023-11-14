import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: () => import('../views/LoginRegister.vue')
    },
    {
        path: '/teacherIndex',
        component: () => import('../views/TeacherIndex.vue')
    },
    {
        path:'/login',
        name:'login',
        component:()=>import('../views/LoginRegister.vue')
    },
    {
        path:'/editPaper',
        component:()=>import('../components/EditPaper.vue')
    },
    {
        path:'/studentIndex',
        component:()=>import('../views/StudentIndex.vue')
    },
    {
        path:'/onlineAnswer',
        component:()=>import('../components/OnlineAnswer.vue')
    },
    {
        path: '/:catchAll(.*)',
        component: () => import('../views/404.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router

