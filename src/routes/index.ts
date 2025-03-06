import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/cocktails',
        name: 'Cocktail',
        component: () => import('../views/Cocktail.vue')
    },
    {
        path: '/ingredients',
        name: 'Ingredient',
        component: () => import('../views/Ingredient.vue')
    },
    {
        path: '/categories',
        name: 'Category',
        component: () => import('../views/Category.vue')
    },
    {
        path: '/glasses',
        name: 'Glass',
        component: () => import('../views/Glass.vue')
    },
    
    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router