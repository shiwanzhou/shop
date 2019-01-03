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


export const accountCenterRouter = {
    path: '/accountCenter',
    name: 'accountCenter',
    meta: {
        title: 'accountCenter - 帐号中心'
    },
    component: resolve => require(['../views/user/accountCenter.vue'], resolve)
};

export const updateUserInfoRouter = {
    path: '/updateUserInfo',
    name: 'updateUserInfo',
    meta: {
        title: 'updateUserInfo - 编辑用户信息'
    },
    component: resolve => require(['../views/user/updateUserInfo.vue'], resolve)
};


export const companyRoleManagementRouter = {
    path: '/companyRoleManagement',
    name: 'companyRoleManagement',
    meta: {
        title: 'companyRoleManagement - 公司角色管理'
    },
    component: resolve => require(['../views/user/companyRoleManagement.vue'], resolve)
};

export const companyMemberManagementRouter = {
    path: '/companyMemberManagement',
    name: 'companyMemberManagement',
    meta: {
        title: 'companyMemberManagement - 公司成员管理'
    },
    component: resolve => require(['../views/user/companyMemberManagement.vue'], resolve)
};


export const appCreateRouter = {
    path: '/appCreate',
    name: 'appCreate',
    meta: {
        title: 'appCreate - 应用创建'
    },
    component: resolve => require(['../views/appCreate/appCreate.vue'], resolve)
};

export const appCreateSucRouter = {
    path: '/appCreateSuc',
    name: 'appCreateSuc',
    meta: {
        title: 'appCreateSuc - 应用创建成功'
    },
    component: resolve => require(['../views/appCreate/appCreateSuccess.vue'], resolve)
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
    redirect: '/myApp',
    component: resolve => require(['../views/myApp/myApp.vue'], resolve)
};



// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
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
        path: '/commodityManagement',
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
        path: '/teamMembers',
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
                component: resolve => require(['../views/teamMembers/memberManagement.vue'], resolve)
            },
            {
                path: 'roleManagement',
                icon: 'compose',
                name: 'roleManagement',
                title: '角色/权限',
                component: resolve => require(['../views/teamMembers/roleManagement.vue'], resolve)
            }
        ]
    },
    {
        path: '/onlineParam',
        icon: 'social-buffer',
        name: 'onlineParam',
        title: '在线参数',
        component: Main,
        children: [
            {
                path: 'userLogin',
                icon: 'compose',
                name: 'userLogin',
                title: '用户登录',
                component: resolve => require(['../views/onlineParam/userLogin.vue'], resolve)
            }
        ]
    },
    {
        path: '/issueChannel',
        icon: 'social-buffer',
        name: 'issueChannel',
        title: '发行渠道',
        component: Main,
        children: [
            {
                path: 'channelNumber',
                icon: 'compose',
                name: 'channelNumber',
                title: '渠道号',
                component: resolve => require(['../views/channelManagement/issueChannel/channelNumber.vue'], resolve)
            },
            {
                path: 'channelManagement',
                icon: 'compose',
                name: 'channelManagement',
                title: '渠道管理',
                component: resolve => require(['../views/channelManagement/issueChannel/channelManagement.vue'], resolve)
            }
        ]
    }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    accountCenterRouter,
    appCreateRouter,
    appCreateSucRouter,
    myAppRouter,
    otherRouter,
    updateUserInfoRouter,
    ...appRouter,
    companyRoleManagementRouter,
    companyMemberManagementRouter,
    page404,
];
