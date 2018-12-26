
const app = {
    state: {
        cachePage: [],
        menuList: [],
        serviceList: [],
        menuTheme: "",
        themeColor: ''
    },
    mutations: {
        updateMenulist (state,res) {
            let menuList = [];
            let serviceList = [];
            let appRouter = [
                {
                    id: "3",
                    path: '/publicConfig',
                    icon: 'ios-settings',
                    name: 'publicConfig',
                    title: '公共配置',
                    children: [
                        {
                            path: 'appInfo',
                            icon: 'ios-information-outline',
                            name: 'appInfo',
                            title: '应用信息'
                        }
                    ]
                },
                {
                    id: "3",
                    path: '/teamMembers',
                    icon: 'social-buffer',
                    name: 'teamMembers',
                    title: '团队成员',
                    children: [
                        {
                            path: 'memberManagement',
                            icon: 'person-stalker',
                            name: 'memberManagement',
                            title: '成员管理'
                        },
                        {
                            path: 'roleManagement',
                            icon: 'compose',
                            name: 'roleManagement',
                            title: '角色/权限'
                        }
                    ]
                },
                {
                    id: '1',
                    path: '/onlineParam',
                    icon: 'wrench',
                    name: 'onlineParam',
                    title: '在线参数',
                    children: [
                        {
                            path: 'userLogin',
                            icon: 'wrench',
                            name: 'userLogin',
                            title: '用户登录'
                        }
                    ]
                }
            ];
            let   serviceInfo = [
                {
                    "id":1,
                    "iconType":"ios-home-outline",
                    "img":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABeElEQVR4AbzWAUcEQRQA4CkC/YH+RPQDAqmqqn5DSj8hhSBQkrgQFATRD5iZLYh5s4cc3ptzgEgEdA7oqtR2b1WubvfsmNVjzDL2ffPm7bDi3+OSaFgbOlGG7hVQk2cJdKotjpeG6NitSKB3aTD5Hh3sozMOarVkqBREAa5y0hToHkAV72TXN42RzEosrWUhKqYJz93SmTS0n7lm3HpvFXjhCeBD+qLFw79rDPcABlt+gKHHn/KtO+qC9zKSpw1PkmSwMCCBbn8lsHQswe3ycw7Q7AADPkAlL1kmYCgSPiGrblQBvhZGgF60pWUvRFva8KmCEQm4WBjgM9UWt5TBNx8kiusLXpVcxY0xbvJX41vpDHQuAZ9y+vGsrZsXoRGBm+yHKOvmghFp61PKUDsPiYBmgxEV16f7IG1eD0Z0FWd4x3kIVxqM8Jn3Q7hnwQh/PXmIBLwTZQTfA74PPVWA2xRlBd/obkRZtyPKDgW0xD8IGty2+Bw9AQDB+5LpKa+9/QAAAABJRU5ErkJggg=="},
                {
                    "id":2,
                    "iconType":"ios-gear-outline",
                    "img":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAsUlEQVR4Ae2RAQYCURCGF+l4AQhAB+gMC0j32fcAMdMBZvCuEHSBSL38aaVhsfWDvJ/h98+b/1u2a5qlQazGIdz8OyCrb6feY/czIKnfk9omvkWG3SxA1KDeP4/Ub1l8PebwyF67vvtKAZLErvnoKwx8LCdB/IKJ5VQItTxq8ic2wKHWxSC+HwHwyGiAz/I3hAiwcwQgowGS2CkCkPEAarsIQEYDlFKWKMRXY+CRUcqbHssPhlyOXZhKAAAAAElFTkSuQmCC"
                },
            ];
            state.menuList = appRouter;
            state.serviceList = serviceInfo;
        },
        updateChannelManagementMenulist (state,res) {
            state.menuList = res.appRouter;
            state.serviceList = res.serviceInfo;
        },
        changeMenuTheme (state, theme) {
            state.menuTheme = theme;
        },
        changeMainTheme (state, mainTheme) {
            state.themeColor = mainTheme;
        }
    },
    actions: {
        updateMenulist (context, that) {
            let menuList = [];
            let serviceList = [];
            that.$get(`${that.$url}unified_account/getApp`, {}).then((res) => {
                let appRouter = [
                    {
                        id: "3",
                        path: '/issueChannel',
                        icon: 'social-buffer',
                        name: 'issueChannel',
                        title: '发行渠道',
                        children: [
                            {
                                path: 'channelNumber',
                                icon: 'ios-pricetag-outline',
                                name: 'channelNumber',
                                title: '渠道号'
                            },
                            {
                                path: 'channelManagement',
                                icon: 'ios-box',
                                name: 'channelManagement',
                                title: '渠道管理'
                            }
                        ]
                    }
                ];
                let serviceInfo = [
                    {
                        "id":1,
                        "iconType":"ios-home-outline",
                        "img":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABeElEQVR4AbzWAUcEQRQA4CkC/YH+RPQDAqmqqn5DSj8hhSBQkrgQFATRD5iZLYh5s4cc3ptzgEgEdA7oqtR2b1WubvfsmNVjzDL2ffPm7bDi3+OSaFgbOlGG7hVQk2cJdKotjpeG6NitSKB3aTD5Hh3sozMOarVkqBREAa5y0hToHkAV72TXN42RzEosrWUhKqYJz93SmTS0n7lm3HpvFXjhCeBD+qLFw79rDPcABlt+gKHHn/KtO+qC9zKSpw1PkmSwMCCBbn8lsHQswe3ycw7Q7AADPkAlL1kmYCgSPiGrblQBvhZGgF60pWUvRFva8KmCEQm4WBjgM9UWt5TBNx8kiusLXpVcxY0xbvJX41vpDHQuAZ9y+vGsrZsXoRGBm+yHKOvmghFp61PKUDsPiYBmgxEV16f7IG1eD0Z0FWd4x3kIVxqM8Jn3Q7hnwQh/PXmIBLwTZQTfA74PPVWA2xRlBd/obkRZtyPKDgW0xD8IGty2+Bw9AQDB+5LpKa+9/QAAAABJRU5ErkJggg=="},
                    {
                        "id":2,
                        "iconType":"ios-box",
                        "img":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAsUlEQVR4Ae2RAQYCURCGF+l4AQhAB+gMC0j32fcAMdMBZvCuEHSBSL38aaVhsfWDvJ/h98+b/1u2a5qlQazGIdz8OyCrb6feY/czIKnfk9omvkWG3SxA1KDeP4/Ub1l8PebwyF67vvtKAZLErvnoKwx8LCdB/IKJ5VQItTxq8ic2wKHWxSC+HwHwyGiAz/I3hAiwcwQgowGS2CkCkPEAarsIQEYDlFKWKMRXY+CRUcqbHssPhlyOXZhKAAAAAElFTkSuQmCC"
                    }
                ];
                let param = {};
                param.appRouter = appRouter;
                param.serviceInfo = serviceInfo;
                if(location.hash.indexOf("issueChannel") !== -1){
                    console.log(7788)
                    context.commit("updateChannelManagementMenulist",param);
                } else {
                    console.log(7788111111111111)
                    context.commit("updateMenulist",param);
                }
            }).catch((err) => {
                this.$Message.error('This is an error tip');
            });
        }
    }
};

export default app;
