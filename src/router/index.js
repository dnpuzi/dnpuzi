import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'HelloWorld',
            component: resolve => require(['@/components/HelloWorld'], resolve)
        },
        {
            path: '/Admin',
            name: 'Index',
            redirect: 'Admin/Addcategory',
            component: resolve => require(['@/Admin/Index/Index'], resolve),
            children: [{
                path: 'Addcategory',
                name: 'Addcategory',
                component: resolve => require(['@/Admin/Addcategory/Addcategory'], resolve)
            }, {
                path: 'Showcategory',
                name: 'Showcategory',
                component: resolve => require(['@/Admin/Showcategory/Showcategory'], resolve)
            }, {
                path: 'Adddev',
                name: 'Adddev',
                component: resolve => require(['@/Admin/Adddev/Adddev'], resolve)
            }, {
                path: 'Showdevlist',
                name: 'Showdevlist',
                component: resolve => require(['@/Admin/Showdevlist/Showdevlist'], resolve)
            }, {
                path: 'Devinfo',
                name: 'Devinfo',
                component: resolve => require(['@/Admin/Devinfo/Devinfo'], resolve)
            }]
        },
        {
            path: '/Puzi',
            name: 'Puzi',
            component: resolve => require(['@/components/Index/Index'], resolve),
        },
        {
            path: '/Indexlist',
            name: 'Indexlist',
            meta: {
                keepAlive: true
            },
            component: resolve => require(['@/components/Indexlist/Indexlist'], resolve)
        },
        {
            path: '/Dev/:id',
            name: 'Dev',
            component: resolve => require(['@/components/Dev/Dev'], resolve),
        }
    ]
})