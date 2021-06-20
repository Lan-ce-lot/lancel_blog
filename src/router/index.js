import Vue from 'vue'
import VueRouter from 'vue-router'
import Detail from "@/views/Detail";

const Home = () => import('@/views/Home')
const About = () => import('@/views/About')
const Resume = () => import('@/views/Resume')
const Tags = () => import('@/views/Tags')
const Login = () =>import('@/views/Login')
const ArticleList = () => import('@/views/admin/ArticleList')
const ArticleEdit = () => import('@/views/admin/ArticleEdit')
const CommonLayout = () =>import('@/components/CommonLayout')
const Details = () =>import('@/views/Detail')
// const Detail = r => require.ensure([], () => r(require('@/views/Detail')), 'chunkname2')
// const Admin = () => import('@/views/admin')
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: CommonLayout,
        children:[
            {
                path: '/home',
                component: Home
            },
            {
                path: '/tags',
                component: Tags
            },
            {
                path: '/about',
                component: About
            },
            {
                path: '/resume',
                component: Resume
            },
            {
                path: '/detail/:id',
                component:  Details,
            },
            {
                path: '/admin/',
                component: ArticleList,
            },
            {
                path: '/admin/articleList',
                component: ArticleList,
            },
            {
                path: '/admin/articleEdit/:id',
                component:  ArticleEdit,
            },
            // {
            //     path: '/admin/articleLook/:id',
            //     component: ArticleEdit,
            // },

        ]
        // redirect: '/home'
    },

        // component: admin,
    {
        path: '/login',
        component: Login
    },
    {
        path: "*",
        component: () => import('@/views/Error404')
    }
]

const router = new VueRouter({
    routes,
    mode: 'history',
})

export default router