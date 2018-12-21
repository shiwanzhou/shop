<style lang="less" scoped>

</style>

<template>
    <div class="appInfo memberManagement channelNumber">
        <div class="breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem to="/issueChannel/channelNumber">平台参数</BreadcrumbItem>
                <BreadcrumbItem to="/issueChannel/channelNumber">发行渠道</BreadcrumbItem>
                <BreadcrumbItem>渠道号</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="title">渠道号</div>
        <div class="desc">
            渠道号是最小颗粒度的用户来源标记，必须标记所属渠道来识别用户所属媒体。
        </div>
        <div class="border"></div>
        <!--渠道号列表-->
        <div class="option">
            <div class="search">
                <div class="left">
                    <ButtonGroup>
                        <Button type="primary">使用中</Button>
                        <Button>已停用</Button>
                    </ButtonGroup>
                </div>
                <div class="right">
                    <span>所属渠道：</span>
                    <Select  style="width:200px;margin-right: 20px;">
                        <Option>fvf</Option>
                    </Select>
                    <Input  icon="ios-search" placeholder="渠道名称" v-model="searchOption.channelNumberName" @on-enter="search($event)" style="width: 300px"></Input>
                </div>
                <div class="clear"></div>
                <div class="btn">
                    <div class="left">
                        <Button>修改所属渠道</Button>
                        <Button>导出</Button>
                    </div>
                    <div class="right">
                        <Button type="primary" class="update" size="large" @click="createMember">创建</Button>
                    </div>
                </div>
            </div>
        </div>
        <div class="member_table">
            <Table  ref="selection" :columns="channelNumberTableColumns" :data="channelNumberTableData"></Table>
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
                searchOption:{
                    channelNumberName:"",
                    subordinateChannel:[]
                },
                channelNumberTableData:[],
                channelNumberTableColumns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '渠道号名称 ',
                        key: 'name'
                    },
                    {
                        title: '渠道号',
                        key: 'channelNumber',
                    },
                    {
                        title: '所属渠道',
                        key: 'subordinateChannel'
                    },
                    {
                        title: '创建者',
                        key: 'creator'
                    },
                    {
                        title: '创建时间',
                        key: 'createTime',
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
                                        innerHTML:"修改"
                                    },
                                    style: {
                                        marginRight:"20px",
                                        color:"#2d8cf0",
                                        cursor: "pointer"
                                    },
                                    on: {
                                        click: this.update
                                    }
                                }),
                                h('span',{
                                    domProps: {
                                        innerHTML:"停用"
                                    },
                                    style: {
                                        color:"#2d8cf0",
                                        cursor: "pointer"
                                    },
                                    on: {
                                        click: this.stop
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
            this.getChannelNumberList();
        },
        methods: {
            search(){
              console.log(this.searchOption.channelNumberName)
            },
            update(){
                console.log(333)
            },
            stop(){
                console.log(111)
            },
            getChannelNumberList(){
                    this.$get(`${this.$url}unified_account/getApp`, {}).then((res) => {
                        console.log(res)
                        let channelNumberList = [
                            {
                                "creator":"doggy.wang (王二狗)",
                                "createTime":"2018-11-11 09:08",
                                "id":2,
                                "img":"/dist/ece7b063418095d6997c2e3955ea0362.svg",
                                "name":"华为vfvfv",
                                "channelNumber":"HW0S0N84001",
                                "subordinateChannel":"华为"
                            },
                            {
                                "creator":"doggy.wang (王二狗)",
                                "createTime":"2018-11-11 09:08",
                                "id":2,
                                "img":"/dist/ece7b063418095d6997c2e3955ea0362.svg",
                                "name":"华为vfvfv",
                                "channelNumber":"HW0S0N84001",
                                "subordinateChannel":"中兴"
                            },
                            {
                                "creator":"doggy.wang (王二狗)",
                                "createTime":"2018-11-11 09:08",
                                "id":2,
                                "img":"/dist/ece7b063418095d6997c2e3955ea0362.svg",
                                "name":"华为vfvfv2222",
                                "channelNumber":"HW0S0N84001",
                                "subordinateChannel":"三星"
                            },
                            {
                                "creator":"doggy.wang (王二狗)",
                                "createTime":"2018-11-11 09:08",
                                "id":2,
                                "img":"/dist/ece7b063418095d6997c2e3955ea0362.svg",
                                "name":"华为vfvfvvfvfv222",
                                "channelNumber":"HW0S0N84001",
                                "subordinateChannel":"三星222"
                            },
                            {
                                "creator":"doggy.wang (王二狗222)",
                                "createTime":"2018-11-11 09:08",
                                "id":2,
                                "img":"/dist/ece7b063418095d6997c2e3955ea0362.svg",
                                "name":"华为vfvfv2vgbg",
                                "channelNumber":"HW0S0N84001",
                                "subordinateChannel":"三星3444"
                            }
                        ];
                        this.channelNumberTableData = channelNumberList;
                        this.currentApp = "梦幻家园";
                        this.currentAppSrc = "/dist/ece7b063418095d6997c2e3955ea0362.svg";
                        this.avatorPath = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAELSURBVEhLxZRbCoQwDEVnteo+xA91iwr672MJHe5M20njjQ8G8cAF0SQH29KXu5nnBdM0uTzPXZZlSYqicPM8+yobU4BmPdTKsiy+awsV1HVNB+2laRrfnbIRWMP7vvcV7vPMapgkEeBXWaMcHui6jtbq5UoErAGxYLWIJApwWlgxYsFqEfkXUcCOYsiVJUJwhANRwAplpGRveEjgtOBqAs8LqqryFVvKsqQ9SCAKsDFW0RG6j26yvnuuInvpMQWyaBxH//aYYRiSXkki0FfFGYkevq6r//IlEQBcWLJBrqdG71vbtv7Lj40AaMmZsOGACoB1s7LoZZGYggBE7AjjnTwtFoeCf7lZ4NwbwtpbArKxQn4AAAAASUVORK5CYII=";
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
