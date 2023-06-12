import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import TopView from '@/views/TopView.vue';
import SessionView from '@/views/SessionView.vue';
import SceneView from '@/views/SceneView.vue';

const routeSettings: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Top',
        component: TopView
    },
    {
        path: `/session:session`,
        name: `Session`,
        component: SessionView,
        children: [
            {
                path: ':scene',
                name: `Scene`,
                component: SceneView
            },
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/'
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routeSettings
})

export default router;