<style lang="less">
    @import "./../main.less";
</style>
<template>
    <div class="main appCreate" >
        <top-header></top-header>
        <!--我的应用-->
        <div class="appInfo memberManagement">
            <div class="title">公司成员管理</div>
            <div class="desc">邀请伙伴加入，管理可以访问当前业务的团队成员并为他们分配<a class="blue" href="#/teamMembers/roleManagement">角色和权限</a>。</div>
            <div class="border"></div>
            <!--成员管理详情-->
            <div class="option">
                <div class="search">
                    <div class="select">
                        <Radio-group v-model="tab" type="button">
                            <Radio label="all">全部</Radio>
                            <Radio label="large">角色一</Radio>
                            <Radio label="default">角色二</Radio>
                            <Radio label="default2">角色三</Radio>
                        </Radio-group>
                    </div>
                    <div class="left">
                        <Input  icon="ios-search" placeholder="姓名" v-model="searchOption.name" @on-enter="search($event)" style="width: 300px"></Input>
                    </div>
                    <div class="right">
                        <Button type="primary" class="update" size="large" @click="addMemberModel = true">添加</Button>
                        <Modal
                                title="添加成员"
                                v-model="addMemberModel"
                                class-name="vertical-center-modal  form addMemberModel" width="485">
                            <div class="content" style="height: auto">
                                <div class="desc">
                                    当前版本暂不支持添加成员。如有需要添加请联系 <a class="blue">example@email.com </a>。
                                </div>
                            </div>
                            <div slot="footer">
                                <Button  size="large" @click="cancel">完成</Button>
                            </div>
                        </Modal>
                    </div>
                </div>
                <div class="clear"></div>
            </div>
            <div class="member_table">
                <Table :columns="memberTableColumns" :data="memberTableData"></Table>
                <div class="clear"></div>
                <div class="page">
                    <Page :total="totalPage" :current="curPage" show-total show-elevator show-sizer  @on-change="handleCurrentChange"></Page>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import topHeader from '../main-components/header/header.vue';
    export default {
        name: 'companyMemberManagement',
        components: {
            topHeader
        },
        data () {
            return {
                tab:"all",
                addMemberModel:false,
                searchOption:{
                   name:""
                },
                memberTableData:[],
                memberTableColumns: [
                    {
                        title: '用户',
                        key: 'name',
                        render: (h, params) => {
                            return h('div',{
                                style: {
                                    "display":"flex",
                                    "padding-top":"15px",
                                    "padding-bottom":"15px",
                                    "align-items":"center"
                                },
                            }, [
                                h('img', {
                                    attrs: {
                                        src: params.row.img
                                    },
                                    style: {
                                        width: '40px',
                                        marginRight:"10px"
                                    }
                                }),
                                h('div',{},
                                    [
                                        h('div',{
                                            style: {
                                                fontSize:'12px'
                                            },
                                            domProps: {
                                                innerHTML: params.row.name
                                            },
                                        })
                                    ])
                            ]);
                        }
                    },
                    {
                        title: '角色',
                        key: 'role',
                        render: (h, params) => {
                            return h('div',{
                                style: {
                                    display:"flex"
                                },
                            }, [
                                h('Button', {
                                    attrs: {
                                        disabled: "true",
                                        size: "small",
                                    },
                                    domProps: {
                                        innerHTML: "运营"
                                    },
                                    style: {
                                        display:(params.row.role == '运营' ||  params.row.role == '运营,负责人')?"inline-block":"none",
                                    }
                                }),
                                h('Button', {
                                    attrs: {
                                        disabled: "true",
                                        size: "small",
                                    },
                                    domProps: {
                                        innerHTML: "开发"
                                    },
                                    style: {
                                        display:(params.row.role == '开发' ||  params.row.role == '开发,负责人')?"inline-block":"none"
                                    }
                                }),
                                h('Button', {
                                    attrs: {
                                        disabled: "true",
                                        size: "small",
                                    },
                                    domProps: {
                                        innerHTML: "测试"
                                    },
                                    style: {
                                        display:(params.row.role == '测试' ||  params.row.role == '测试,负责人')?"inline-block":"none"
                                    }
                                })
                            ]);
                        }
                    },
                    {
                        title: '应用',
                        key: 'app',
                        render: (h, params) => {
                            return h('div',{
                                style: {
                                    fontSize:'12px'
                                },
                                domProps: {
                                    innerHTML: params.row.app
                                }
                            });
                        }
                    },
                    {
                        title: '公司',
                        key: 'company',
                        render: (h, params) => {
                            return h('div',{
                                style: {
                                    fontSize:'12px'
                                },
                                domProps: {
                                    innerHTML: params.row.company
                                }
                            });
                        }
                    },
                    {
                        title: '创建时间',
                        key: 'createTime',
                        sortable: true
                    },
                    {
                        title: '最后登录',
                        key: 'lastLoginTime',
                        sortable: true
                    },
                    {
                        title: '操作',
                        key: 'operation',
                        render: (h, params) => {
                            return h('div',{
                                style: {
                                    "display":"flex",
                                    "padding-top":"15px",
                                    "padding-bottom":"15px",
                                    "align-items":"center"
                                },
                            }, [
                                h('span', {
                                    domProps: {
                                        innerHTML:"编辑"
                                    },
                                    style: {
                                        marginRight:"20px",
                                        color:"#2d8cf0",
                                        cursor: "pointer"
                                    },
                                    on: {
                                        click: this.update
                                    }
                                })
                            ]);
                        }
                    }
                ],
                curPage:1,
                totalPage:20,
                pageSize:this.$pageSize,
            };
        },
        computed: {
        },
        created(){
        },
        mounted(){
            this.getMemberList();
        },
        methods: {
            getMemberList(searchStatus){
                if(searchStatus){
                    this.resetPage()
                }
                var param = {
                    "page":this.curPage,
                    "pageSize":this.pageSize,
                    "query":this.searchOption.name|| ""
                };
                this.$get(`${this.$url}unified_account/getApp`, {}).then((res) => {
                        console.log(res)
                        let memberList = [
                            {
                                "lastLoginTime":"2018-11-11 09:08",
                                "createTime":"2018-11-11 09:11",
                                "id":2,
                                "img":"/dist/ece7b063418095d6997c2e3955ea0362.svg",
                                "name":"(fullname) 姓名",
                                "text":"这是一个演示控制台能力的DEMO，你可以先看看。",
                                "company":"创梦天地",
                                "app":"应用一",
                                "role":"运营,负责人"
                            },
                            {
                                "lastLoginTime":"2018-11-10 09:08",
                                "createTime":"2018-11-11 09:08",
                                "id":2,
                                "img":"/dist/ece7b063418095d6997c2e3955ea0362.svg",
                                "name":"(fullname) 姓名55",
                                "text":"这是一个演示控制台能力的DEMO，你可以先看看。",
                                "company":"创梦天地2",
                                "app":"应用一",
                                "role":"运营"
                            },
                            {
                                "lastLoginTime":"2018-11-13 09:08",
                                "createTime":"2018-11-11 09:09",
                                "id":2,
                                "img":"/dist/ece7b063418095d6997c2e3955ea0362.svg",
                                "name":"(fullname) 姓名3333",
                                "text":"这是一个演示控制台能力的DEMO，你可以先看看。",
                                "company":"创梦天地3",
                                "app":"应用一",
                                "role":"测试"
                            },
                            {
                                "lastLoginTime":"2018-11-08 09:08",
                                "createTime":"2018-11-11 09:12",
                                "id":2,
                                "img":"/dist/ece7b063418095d6997c2e3955ea0362.svg",
                                "name":"(fullname) 姓名222",
                                "text":"这是一个演示控制台能力的DEMO，你可以先看看。",
                                "company":"创梦天地5",
                                "app":"应用一",
                                "role":"测试"
                            },
                            {
                                "lastLoginTime":"2018-11-14 09:08",
                                "createTime":"2018-11-11 09:13",
                                "id":2,
                                "img":"/dist/ece7b063418095d6997c2e3955ea0362.svg",
                                "name":"(fullname) 姓名2",
                                "text":"这是一个演示控制台能力的DEMO，你可以先看看。",
                                "company":"创梦天地44",
                                "app":"应用二",
                                "role":"开发"
                            }
                        ];
                        this.currentApp = "梦幻家园";
                        this.currentAppSrc = "/dist/ece7b063418095d6997c2e3955ea0362.svg";
                        this.avatorPath = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAELSURBVEhLxZRbCoQwDEVnteo+xA91iwr672MJHe5M20njjQ8G8cAF0SQH29KXu5nnBdM0uTzPXZZlSYqicPM8+yobU4BmPdTKsiy+awsV1HVNB+2laRrfnbIRWMP7vvcV7vPMapgkEeBXWaMcHui6jtbq5UoErAGxYLWIJApwWlgxYsFqEfkXUcCOYsiVJUJwhANRwAplpGRveEjgtOBqAs8LqqryFVvKsqQ9SCAKsDFW0RG6j26yvnuuInvpMQWyaBxH//aYYRiSXkki0FfFGYkevq6r//IlEQBcWLJBrqdG71vbtv7Lj40AaMmZsOGACoB1s7LoZZGYggBE7AjjnTwtFoeCf7lZ4NwbwtpbArKxQn4AAAAASUVORK5CYII=";
                        this.memberTableData = memberList;
                }).catch((err) => {
                    this.$Message.error('This is an error tip');
                });
            },
            /*重置分页器*/
            resetPage(){
                this.curPage = 1;
                this.totalPage = 20;
                this.pageSize = this.$pageSize;
            },
            /*搜索渠道号列表*/
            search(){
                this.getMemberList(1);
            },
            update(){
                console.log("update");
            },
            cancel(){
               this.addMemberModel = false;
            },
            handleCurrentChange(val) {
                this.curPage = val;
                this.getMemberList();
            }
        }
    };
</script>
