<style lang="less" scoped>

</style>

<template>
    <div class="appInfo memberManagement">
        <div class="title">成员管理</div>
        <div class="desc">邀请伙伴加入，管理可以访问当前业务的团队成员。</div>
        <div class="border"></div>
        <!--成员管理详情-->
        <div class="option">
            <div class="search">
                <div class="left">
                    <span>角色：</span>
                    <Select  style="width:200px">
                        <Option>fvf</Option>
                    </Select>
                </div>
                <div class="right">
                    <Input  icon="ios-search" placeholder="姓名" style="width: 300px"></Input>
                </div>
            </div>
            <div class="clear"></div>
            <div class="btn">
                <Button type="primary" class="update" size="large" @click="createMember">创建</Button>
            </div>
        </div>
        <div class="member_table">
            <Table :columns="memberTableColumns" :data="memberTableData"></Table>
            <div class="clear"></div>
            <div class="page">
                <Page :total="totalPage" show-total show-elevator show-sizer  @on-change="handleCurrentChange"></Page>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'appInfo',
        data () {
            return {
                memberTableData:[],
                memberTableColumns: [
                    {
                        title: '应用名称',
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

                                                fontWeight:'bold',
                                                fontSize:'14px'
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
                        key: 'tag',
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
                                        marginRight:"10px",
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
                                        marginRight:"10px",
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
                                        marginRight:"10px",
                                        display:(params.row.role == '测试' ||  params.row.role == '测试,负责人')?"inline-block":"none"
                                    }
                                })
                            ]);
                        }
                    },
                    {
                        title: '创建时间',
                        key: 'createTime'
                    },
                    {
                        title: '最后登录',
                        key: 'lastLoginTime'
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
            getMemberList(){
                this.$get(`${this.$url}unified_account/getApp`, {}).then((res) => {
                    this.$get(`${this.$url}unified_account/getApp`, {}).then((res) => {
                        console.log(res)
                        let memberList = [
                            {
                                "lastLoginTime":"2018-11-11 09:08",
                                "createTime":"2018-11-11 09:08",
                                "id":2,
                                "img":"/dist/ece7b063418095d6997c2e3955ea0362.svg",
                                "name":"(fullname) 姓名",
                                "text":"这是一个演示控制台能力的DEMO，你可以先看看。",
                                "role":"运营,负责人"
                            },
                            {
                                "lastLoginTime":"2018-11-11 09:08",
                                "createTime":"2018-11-11 09:08",
                                "id":2,
                                "img":"/dist/ece7b063418095d6997c2e3955ea0362.svg",
                                "name":"(fullname) 姓名55",
                                "text":"这是一个演示控制台能力的DEMO，你可以先看看。",
                                "role":"运营"
                            },
                            {
                                "lastLoginTime":"2018-11-11 09:08",
                                "createTime":"2018-11-11 09:08",
                                "id":2,
                                "img":"/dist/ece7b063418095d6997c2e3955ea0362.svg",
                                "name":"(fullname) 姓名3333",
                                "text":"这是一个演示控制台能力的DEMO，你可以先看看。",
                                "role":"测试"
                            },
                            {
                                "lastLoginTime":"2018-11-11 09:08",
                                "createTime":"2018-11-11 09:08",
                                "id":2,
                                "img":"/dist/ece7b063418095d6997c2e3955ea0362.svg",
                                "name":"(fullname) 姓名222",
                                "text":"这是一个演示控制台能力的DEMO，你可以先看看。",
                                "role":"测试"
                            },
                            {
                                "lastLoginTime":"2018-11-11 09:08",
                                "createTime":"2018-11-11 09:08",
                                "id":2,
                                "img":"/dist/ece7b063418095d6997c2e3955ea0362.svg",
                                "name":"(fullname) 姓名2",
                                "text":"这是一个演示控制台能力的DEMO，你可以先看看。",
                                "role":"开发"
                            }
                        ];
                        this.memberList = memberList;
                        this.currentApp = "梦幻家园";
                        this.currentAppSrc = "/dist/ece7b063418095d6997c2e3955ea0362.svg";
                        this.avatorPath = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAELSURBVEhLxZRbCoQwDEVnteo+xA91iwr672MJHe5M20njjQ8G8cAF0SQH29KXu5nnBdM0uTzPXZZlSYqicPM8+yobU4BmPdTKsiy+awsV1HVNB+2laRrfnbIRWMP7vvcV7vPMapgkEeBXWaMcHui6jtbq5UoErAGxYLWIJApwWlgxYsFqEfkXUcCOYsiVJUJwhANRwAplpGRveEjgtOBqAs8LqqryFVvKsqQ9SCAKsDFW0RG6j26yvnuuInvpMQWyaBxH//aYYRiSXkki0FfFGYkevq6r//IlEQBcWLJBrqdG71vbtv7Lj40AaMmZsOGACoB1s7LoZZGYggBE7AjjnTwtFoeCf7lZ4NwbwtpbArKxQn4AAAAASUVORK5CYII=";
                        this.memberTableData = memberList;
                    }).catch((err) => {
                        this.$Message.error('This is an error tip');
                    });
                }).catch((err) => {
                    this.$Message.error('This is an error tip');
                });
            },
            createMember(){
                this.$router.push({
                    name: "appCreate"
                });
            },
            handleCurrentChange(val) {
                this.curPage = val;
                this.getMemberList();
            },
        }
    };
</script>

<style>

</style>
