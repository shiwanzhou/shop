
const app = {
    state: {
        cachePage: [],
        menuList: [],
        serviceList: [],
        menuTheme: "",
        themeColor: ''
    },
    mutations: {
        updateMenulist (state) {
            let menuList = [];
            let serviceList = [];
            let appRouter = [
                {
                    id: "3",
                    path: '/publicConfig',
                    icon: 'social-buffer',
                    name: 'publicConfig',
                    title: '公共配置',
                    children: [
                        {
                            path: 'appInfo',
                            icon: 'compose',
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
                            icon: 'compose',
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
                    path: '/serviceManagement',
                    icon: 'key',
                    name: 'serviceManagement',
                    title: '服务管理',
                    children: [
                        {
                            path: 'index',
                            icon: 'compose',
                            name: 'serviceManagement_index',
                            title: '服务管理'
                        }
                    ]
                },
                {
                    id: '1',
                    path: '/commodityManagement',
                    icon: 'key',
                    name: 'commodityManagement',
                    title: '商品管理',
                    children: [
                        {
                            path: 'purchasePropsManagement',
                            icon: 'compose',
                            name: 'purchasePropsManagement',
                            title: '内购道具管理',
                            children: [
                                {
                                    path: 'iOS',
                                    icon: '',
                                    name: 'iOS',
                                    title: 'iOS'
                                },
                                {
                                    path: 'Android',
                                    icon: '',
                                    name: 'Android',
                                    title: 'Android'
                                }
                            ]
                        }
                    ]
                }
            ];
            let serviceInfo = [
                {"id":2,"img":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAw0lEQVR4Ae2TgQYCQRCGe4wAKFTv0JvWU+RGiUu7dRHYubNCKQoFQAFQ61haNdPYBNqf3zn33/c56xr/nemq6mba5LO1bYpeAI1Atxy+wvGSKXN3141IUo/J4v4d3JeRyAUknJfIBQyckQgFoPAIGnf+npeYPOoLxgvsO9H1w+48KcpO9BkwEh4uFTxJbjyc+HGowrJq+V0gYeDRCSVmK4a78YFqpnBeQwvbDp/hKdhpHHx1BqBsj9uBxtEvBEmQBClMHn5ni0xnCFnOAAAAAElFTkSuQmCC"},
                {"id":3,"img":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABeElEQVR4AbzWAUcEQRQA4CkC/YH+RPQDAqmqqn5DSj8hhSBQkrgQFATRD5iZLYh5s4cc3ptzgEgEdA7oqtR2b1WubvfsmNVjzDL2ffPm7bDi3+OSaFgbOlGG7hVQk2cJdKotjpeG6NitSKB3aTD5Hh3sozMOarVkqBREAa5y0hToHkAV72TXN42RzEosrWUhKqYJz93SmTS0n7lm3HpvFXjhCeBD+qLFw79rDPcABlt+gKHHn/KtO+qC9zKSpw1PkmSwMCCBbn8lsHQswe3ycw7Q7AADPkAlL1kmYCgSPiGrblQBvhZGgF60pWUvRFva8KmCEQm4WBjgM9UWt5TBNx8kiusLXpVcxY0xbvJX41vpDHQuAZ9y+vGsrZsXoRGBm+yHKOvmghFp61PKUDsPiYBmgxEV16f7IG1eD0Z0FWd4x3kIVxqM8Jn3Q7hnwQh/PXmIBLwTZQTfA74PPVWA2xRlBd/obkRZtyPKDgW0xD8IGty2+Bw9AQDB+5LpKa+9/QAAAABJRU5ErkJggg=="},
                {"id":4,"img":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAsUlEQVR4Ae2RAQYCURCGF+l4AQhAB+gMC0j32fcAMdMBZvCuEHSBSL38aaVhsfWDvJ/h98+b/1u2a5qlQazGIdz8OyCrb6feY/czIKnfk9omvkWG3SxA1KDeP4/Ub1l8PebwyF67vvtKAZLErvnoKwx8LCdB/IKJ5VQItTxq8ic2wKHWxSC+HwHwyGiAz/I3hAiwcwQgowGS2CkCkPEAarsIQEYDlFKWKMRXY+CRUcqbHssPhlyOXZhKAAAAAElFTkSuQmCC"},
                {"id":5,"img":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAsUlEQVR4Ae2RAQYCURCGF+l4AQhAB+gMC0j32fcAMdMBZvCuEHSBSL38aaVhsfWDvJ/h98+b/1u2a5qlQazGIdz8OyCrb6feY/czIKnfk9omvkWG3SxA1KDeP4/Ub1l8PebwyF67vvtKAZLErvnoKwx8LCdB/IKJ5VQItTxq8ic2wKHWxSC+HwHwyGiAz/I3hAiwcwQgowGS2CkCkPEAarsIQEYDlFKWKMRXY+CRUcqbHssPhlyOXZhKAAAAAElFTkSuQmCC"}
            ];
            console.log(serviceInfo.length)
            if(commonApp == 2){
                serviceInfo = [
                    {"id":3,"img":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABeElEQVR4AbzWAUcEQRQA4CkC/YH+RPQDAqmqqn5DSj8hhSBQkrgQFATRD5iZLYh5s4cc3ptzgEgEdA7oqtR2b1WubvfsmNVjzDL2ffPm7bDi3+OSaFgbOlGG7hVQk2cJdKotjpeG6NitSKB3aTD5Hh3sozMOarVkqBREAa5y0hToHkAV72TXN42RzEosrWUhKqYJz93SmTS0n7lm3HpvFXjhCeBD+qLFw79rDPcABlt+gKHHn/KtO+qC9zKSpw1PkmSwMCCBbn8lsHQswe3ycw7Q7AADPkAlL1kmYCgSPiGrblQBvhZGgF60pWUvRFva8KmCEQm4WBjgM9UWt5TBNx8kiusLXpVcxY0xbvJX41vpDHQuAZ9y+vGsrZsXoRGBm+yHKOvmghFp61PKUDsPiYBmgxEV16f7IG1eD0Z0FWd4x3kIVxqM8Jn3Q7hnwQh/PXmIBLwTZQTfA74PPVWA2xRlBd/obkRZtyPKDgW0xD8IGty2+Bw9AQDB+5LpKa+9/QAAAABJRU5ErkJggg=="},
                    {"id":4,"img":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAsUlEQVR4Ae2RAQYCURCGF+l4AQhAB+gMC0j32fcAMdMBZvCuEHSBSL38aaVhsfWDvJ/h98+b/1u2a5qlQazGIdz8OyCrb6feY/czIKnfk9omvkWG3SxA1KDeP4/Ub1l8PebwyF67vvtKAZLErvnoKwx8LCdB/IKJ5VQItTxq8ic2wKHWxSC+HwHwyGiAz/I3hAiwcwQgowGS2CkCkPEAarsIQEYDlFKWKMRXY+CRUcqbHssPhlyOXZhKAAAAAElFTkSuQmCC"},
                    {"id":5,"img":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAsUlEQVR4Ae2RAQYCURCGF+l4AQhAB+gMC0j32fcAMdMBZvCuEHSBSL38aaVhsfWDvJ/h98+b/1u2a5qlQazGIdz8OyCrb6feY/czIKnfk9omvkWG3SxA1KDeP4/Ub1l8PebwyF67vvtKAZLErvnoKwx8LCdB/IKJ5VQItTxq8ic2wKHWxSC+HwHwyGiAz/I3hAiwcwQgowGS2CkCkPEAarsIQEYDlFKWKMRXY+CRUcqbHssPhlyOXZhKAAAAAElFTkSuQmCC"}
                ];
            } else {
                serviceInfo = [
                    {"id":2,"img":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAw0lEQVR4Ae2TgQYCQRCGe4wAKFTv0JvWU+RGiUu7dRHYubNCKQoFQAFQ61haNdPYBNqf3zn33/c56xr/nemq6mba5LO1bYpeAI1Atxy+wvGSKXN3141IUo/J4v4d3JeRyAUknJfIBQyckQgFoPAIGnf+npeYPOoLxgvsO9H1w+48KcpO9BkwEh4uFTxJbjyc+HGowrJq+V0gYeDRCSVmK4a78YFqpnBeQwvbDp/hKdhpHHx1BqBsj9uBxtEvBEmQBClMHn5ni0xnCFnOAAAAAElFTkSuQmCC"},
                    {"id":3,"img":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABeElEQVR4AbzWAUcEQRQA4CkC/YH+RPQDAqmqqn5DSj8hhSBQkrgQFATRD5iZLYh5s4cc3ptzgEgEdA7oqtR2b1WubvfsmNVjzDL2ffPm7bDi3+OSaFgbOlGG7hVQk2cJdKotjpeG6NitSKB3aTD5Hh3sozMOarVkqBREAa5y0hToHkAV72TXN42RzEosrWUhKqYJz93SmTS0n7lm3HpvFXjhCeBD+qLFw79rDPcABlt+gKHHn/KtO+qC9zKSpw1PkmSwMCCBbn8lsHQswe3ycw7Q7AADPkAlL1kmYCgSPiGrblQBvhZGgF60pWUvRFva8KmCEQm4WBjgM9UWt5TBNx8kiusLXpVcxY0xbvJX41vpDHQuAZ9y+vGsrZsXoRGBm+yHKOvmghFp61PKUDsPiYBmgxEV16f7IG1eD0Z0FWd4x3kIVxqM8Jn3Q7hnwQh/PXmIBLwTZQTfA74PPVWA2xRlBd/obkRZtyPKDgW0xD8IGty2+Bw9AQDB+5LpKa+9/QAAAABJRU5ErkJggg=="},
                    {"id":4,"img":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAsUlEQVR4Ae2RAQYCURCGF+l4AQhAB+gMC0j32fcAMdMBZvCuEHSBSL38aaVhsfWDvJ/h98+b/1u2a5qlQazGIdz8OyCrb6feY/czIKnfk9omvkWG3SxA1KDeP4/Ub1l8PebwyF67vvtKAZLErvnoKwx8LCdB/IKJ5VQItTxq8ic2wKHWxSC+HwHwyGiAz/I3hAiwcwQgowGS2CkCkPEAarsIQEYDlFKWKMRXY+CRUcqbHssPhlyOXZhKAAAAAElFTkSuQmCC"},
                    {"id":5,"img":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAsUlEQVR4Ae2RAQYCURCGF+l4AQhAB+gMC0j32fcAMdMBZvCuEHSBSL38aaVhsfWDvJ/h98+b/1u2a5qlQazGIdz8OyCrb6feY/czIKnfk9omvkWG3SxA1KDeP4/Ub1l8PebwyF67vvtKAZLErvnoKwx8LCdB/IKJ5VQItTxq8ic2wKHWxSC+HwHwyGiAz/I3hAiwcwQgowGS2CkCkPEAarsIQEYDlFKWKMRXY+CRUcqbHssPhlyOXZhKAAAAAElFTkSuQmCC"}
                ];
            }
            state.menuList = appRouter;
            state.serviceList = serviceInfo;
        },
        changeMenuTheme (state, theme) {
            state.menuTheme = theme;
        },
        changeMainTheme (state, mainTheme) {
            state.themeColor = mainTheme;
        },
        setAvator (state, path) {
            localStorage.avatorImgPath = path;
        }
    },
    actions: {
        updateMenulist (context, that) {
            context.commit("updateMenulist");
           /* that.$get(`${that.$url}wpk/developer/app-list`, {}).then((res) => {
                context.commit("updateMenulist");
            }).catch((err) => {
                console.log("error")
                this.$Message.error('This is an error tip');
            });*/
           /* this.$get(`${this.$url}wpk/member/list`, postData).then((res) => {
                let result = res.data;
                if (result.code == 0) {
                    this.totalPage = result.data.count;
                    this.items = result.data.items;
                    this.load_data = false;
                } else {
                    this.load_data = false;
                    if (result.code == 10003) {
                        // 未登陆或登陆已失效
                        this.$router.push('/login');
                    } else {
                        this.$message(result.msg);
                    }
                }
            }).catch((err) => {
                this.load_data = false;
                console.log(err);
                this.$message.error(this.$t('sdk.ajaxError'));
            });*/
        }
    }
}

export default app;
