import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: resolve => require(['../views/user/login.vue'], resolve)
  };

export const appCreateRouter = {
    path: '/appCreate',
    name: 'appCreate',
    meta: {
        title: 'appCreate - 应用创建'
    },
    component: resolve => require(['../views/appCreate/appCreate.vue'], resolve)
};

export const myAppRouter = {
    path: '/myApp',
    name: 'myApp',
    meta: {
        title: 'myApp - 我的应用'
    },
    component: resolve => require(['../views/myApp/myApp.vue'], resolve)
};



export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: resolve => require(['../views/error-page/404.vue'], resolve)
};




// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: resolve => require(['../views/table/searchable-table.vue'], resolve)
};



// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/table',
        icon: 'key',
        name: 'access',
        title: 'table 分页',
        component: Main,
        children: [
            { path: 'index', title: 'table 分页', name: 'table_index',  component: resolve => require(['../views/table/searchable-table.vue'], resolve) }
        ]
    },
    {
        path: '/serviceManagement',
        icon: 'key',
        name: 'serviceManagement',
        title: '服务管理',
        component: Main,
        children: [
            { path: 'index', title: '服务管理', name: 'serviceManagement_index',  component: resolve => require(['../views/serviceManagement/serviceManagement.vue'], resolve) }
        ]
    },
    {
        path: 'commodityManagement',
        icon: 'lock-combination',
        title: '商品管理',
        name: 'commodityManagement',
        access: 0,
        component: Main,
        children: [
            {
                path: 'purchasePropsManagement',
                title: '内购道具管理',
                name: 'purchasePropsManagement',
                access: 0,
                children: [
                    {
                        path: 'iOS',
                        title: 'iOS',
                        name: 'iOS',
                        access: 0,
                        component: resolve => require(['../views/commodityManagement/purchasePropsManagement/iOS.vue'], resolve)
                    },
                    {
                        path: 'Android',
                        title: 'Android',
                        name: 'Android',
                        access: 0,
                        component: resolve => require(['../views/commodityManagement/purchasePropsManagement/Android.vue'], resolve)
                    }
                ]
            }
        ]
    },
    {
        path: '/publicConfig',
        icon: 'social-buffer',
        name: 'component',
        title: '公共配置',
        component: Main,
        children: [
            {
                path: 'appInfo',
                icon: 'compose',
                name: 'appInfo',
                title: '应用信息',
                component: resolve => require(['../views/publicConfig/appInfo.vue'], resolve)
            }
        ]
    },
    {
        path: 'teamMembers',
        icon: 'social-buffer',
        name: 'teamMembers',
        title: '团队成员',
        component: Main,
        children: [
            {
                path: 'memberManagement',
                icon: 'compose',
                name: 'memberManagement',
                title: '成员管理',
                component: resolve => require(['../views/teamMembers/teamMembers.vue'], resolve)
            },
            {
                path: 'role',
                icon: 'compose',
                name: 'role',
                title: '角色/权限',
                component: resolve => require(['../views/teamMembers/role.vue'], resolve)
            }
        ]
    },
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    appCreateRouter,
    myAppRouter,
    ...appRouter,
];
