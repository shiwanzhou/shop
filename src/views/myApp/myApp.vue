<style lang="less">
    @import "./../main.less";
</style>
<template>
    <div class="main appCreate" >
        <div class="main-header-con" >
            <div class="main-header">
                <div class="navicon-con">
                    <Row type="flex" justify="end" align="middle" >
                        <div class="logo-con">
                            <div class="logo"><img  src="../../images/logo.png"/></div>
                            <span class="title">技术中台服务门户</span>
                        </div>
                        <div class="app" @click="changeApp" v-show="showAppList">
                            <div class="left">
                                <div class="img">
                                    <img :src="currentAppSrc">
                                </div>
                                <div class="text">{{currentApp}}</div>
                            </div>
                            <div class="right">
                                <Icon type="ios-arrow-down"></Icon>
                            </div>
                        </div>
                        <div class="app_list" id="appList" v-show="showAppList"  >
                            <div class="item" v-for="(item,index) in appList" @click="clickCurrentApp(item)">
                                <div class="img">
                                    <img :src="item.img">
                                </div>
                                <div class="text">{{item.name}}</div>
                            </div>
                        </div>
                    </Row>
                </div>
                <div class="header-avator-con">
                    <div class="link">
                        <div class="option">
                            <Icon type="android-apps" style="font-size: 16px;"></Icon>
                            <span class="text">产品</span>
                        </div>
                        <div class="option">
                            <Icon type="headphone" style="font-size: 16px;"></Icon>
                            <span class="text">支持</span>
                        </div>
                        <div class="option">
                            <Icon type="ios-paper-outline" style="font-size: 16px;"></Icon>
                            <span class="text">文档</span>
                        </div>
                    </div>
                    <div class="user-dropdown-menu-con">
                        <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                            <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                                <a href="javascript:void(0)">
                                    <span class="main-user-name">vbggb</span>
                                    <Icon type="arrow-down-b"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem name="ownSpace">帐号中心</DropdownItem>
                                    <DropdownItem name="loginout"  divided>退出登录</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            <Avatar :src="avatorPath" style="margin-left: 10px;"></Avatar>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
        <!--我的应用-->
        <div class="myApp">
             <div class="left">
                 <div class="title">我的应用</div>
                 <div class="search">
                     <div class="system_platform">
                         <span class="text">系统平台：</span>
                         <Select v-model="searchOption.currentSystemPlatformName" @on-change="changeSystemPlatform"  class="select" style="width:200px">
                             <Option v-for="item in searchOption.systemPlatformList" :value="item.id" >{{ item.name }}</Option>
                         </Select>
                     </div>
                     <div class="input">
                         <Input v-model="searchOption.appName" icon="ios-search" @on-enter="search($event)"  placeholder="应用名称" style="width: 300px"></Input>
                     </div>
                 </div>
                 <div class="btn">
                     <div class="left_btn">
                         <Radio-group v-model="searchOption.tab" @on-change="changeTab" type="button">
                             <Radio label="recentVisit">最近访问</Radio>
                             <Radio label="oneselfCreate">我创建的</Radio>
                             <Radio label="latestCreate">最新创建</Radio>
                         </Radio-group>
                     </div>
                     <div class="right_btn">
                         <span @click="changeAppList(1)" :class="{blue:1 == changeAppIndex}" >
                             <Icon class="change_card"   type="ios-keypad-outline"></Icon>
                         </span>
                         <span @click="changeAppList(2)"  :class="{blue:2 == changeAppIndex}" >
                             <Icon class="change_table"  type="ios-settings"></Icon>
                         </span>
                         <Button type="primary" @click="create">创建</Button>
                     </div>
                 </div>
                 <!--应用卡片列表-->
                 <div class="appCard_list">
                     <div  v-show="showAppCardList" class="card">
                         <Card class="item" v-for="(item,index) in appList" style="width: 250px;">
                             <div class="img">
                                 <img :src="item.img">
                             </div>
                             <div class="title">{{item.name}}</div>
                             <div class="text">
                                 {{item.text}}
                             </div>
                             <div class="tag">
                                 <Button disabled size="small" v-show="item.tag == 'iOS' || item.tag == 'iOS,Android'">
                                     iOS
                                 </Button>
                                 <Button disabled size="small"  v-show="item.tag == 'Android' || item.tag == 'iOS,Android'">
                                     Android
                                 </Button>
                             </div>
                         </Card>
                         <div class="clear"></div>
                         <div class="page">
                             <Page :total="totalPage" show-total show-elevator show-sizer  @on-change="handleCurrentChange"></Page>
                         </div>
                     </div>
                     <div v-show="!showAppCardList"  class="table">
                         <Table :columns="appTableColumns" :data="appTableData"></Table>
                         <div class="clear"></div>
                         <div class="page">
                             <Page :total="totalPage" :current="curPage" show-total show-elevator show-sizer  @on-change="handleCurrentChange"></Page>
                         </div>
                     </div>
                 </div>
             </div>
             <div class="right">
                 <div class="title">平台服务产品</div>
                 <Card class="card"style="width: 220px;cursor: pointer">
                     <a class="item" :href="channelManagementHref" target="_blank">
                         <Icon class="icon" type="disc"></Icon>
                         <div class="item_text">
                             <div class="small_title">
                                 渠道管理
                             </div>
                             <div class="text">
                                 这是一个平台服务注释，你可以先看看。
                             </div>
                         </div>
                     </a>
                 </Card>
                 <Card class="card" style="width: 220px;">
                     <a class="item" href="http://dc.idreamsky.com/" target="_blank">
                         <Icon class="icon" type="disc"></Icon>
                         <div class="item_text">
                             <div class="small_title">
                                 数据平台
                             </div>
                             <div class="text">
                                 这是一个平台服务注释，你可以先看看。
                             </div>
                         </div>
                     </a>
                 </Card>
             </div>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import VueI18n from 'vue-i18n';
    Vue.use(VueI18n);

    export default {
        name: 'myApp',
        data () {
            return {
                api:{
                    "getAppList":this.$url+"unified_account/getApp",  //获取应用列表
                },
                channelManagementHref:this.$url+"/#/issueChannel/channelNumber",
                searchOption:{
                    appName:"",
                    tab:"recentVisit",
                    systemPlatformList:[],
                    currentSystemPlatformName:"",
                    currentSystemPlatformId:""
                },
                currentApp: "",
                currentAppSrc: "",
                avatorPath: "",
                showAppList: false,
                appList: [],
                menuTheme: "dark",
                shrink: false,
                userName: '',
                tabIndex: 0,
                changeAppIndex:1,
                curPage:1,
                totalPage:20,
                pageSize:this.$pageSize,
                showAppCardList:false,
                appTableColumns: [
                    {
                        title: '应用名称',
                        key: 'name',
                        render: (h, params) => {
                            return h('div',{
                                style: {
                                   display:"flex"
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
                                           marginTop:"15px",
                                           marginBottom:"5px",
                                           fontWeight:'bold',
                                           fontSize:'16px'
                                        },
                                        domProps: {
                                            innerHTML: params.row.name
                                        },
                                    }),
                                    h('div', {
                                        style: {
                                            color: '#909399',
                                            marginBottom:"15px",
                                        },
                                        domProps: {
                                            innerHTML: params.row.text
                                        }
                                    })
                                ])
                            ]);
                        }
                    },
                    {
                        title: '平台',
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
                                        innerHTML: "iOS"
                                    },
                                    style: {
                                        marginRight:"10px",
                                        display:(params.row.tag == 'iOS' ||  params.row.tag == 'iOS,Android')?"inline-block":"none",
                                    }
                                }),
                                h('Button', {
                                    attrs: {
                                        disabled: "true",
                                        size: "small",
                                    },
                                    domProps: {
                                        innerHTML: "Android"
                                    },
                                    style: {
                                        marginRight:"10px",
                                        display:(params.row.tag == 'Android' ||  params.row.tag == 'iOS,Android')?"inline-block":"none"
                                    }
                                })
                            ]);
                        }
                    },
                    {
                        title: '创建者',
                        key: 'creator'
                    },
                    {
                        title: '创建时间',
                        key: 'createTime'
                    }
                ],
                data1: [

                ]
            };
        },
        computed: {
            menuList () {
                return this.$store.state.app.menuList;
            },
            serviceList () {
                return this.$store.state.app.serviceList;
            },
            avatorPath () {
                return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAELSURBVEhLxZRbCoQwDEVnteo+xA91iwr672MJHe5M20njjQ8G8cAF0SQH29KXu5nnBdM0uTzPXZZlSYqicPM8+yobU4BmPdTKsiy+awsV1HVNB+2laRrfnbIRWMP7vvcV7vPMapgkEeBXWaMcHui6jtbq5UoErAGxYLWIJApwWlgxYsFqEfkXUcCOYsiVJUJwhANRwAplpGRveEjgtOBqAs8LqqryFVvKsqQ9SCAKsDFW0RG6j26yvnuuInvpMQWyaBxH//aYYRiSXkki0FfFGYkevq6r//IlEQBcWLJBrqdG71vbtv7Lj40AaMmZsOGACoB1s7LoZZGYggBE7AjjnTwtFoeCf7lZ4NwbwtpbArKxQn4AAAAASUVORK5CYII=";
            }
        },
        created(){
        },
        mounted(){
            this.getSystemPlatformList();
        },
        methods: {
            create(){
                this.$router.push({
                    name: 'appCreate'
                });
            },
            changeAppList(index){
                this.showAppCardList = !this.showAppCardList;
                this.changeAppIndex = index;
            },
            /*重置分页器*/
            resetPage(){
                this.curPage = 1;
                this.totalPage = 20;
                this.pageSize = this.$pageSize;
            },
            /*搜索渠道号列表*/
            search(){
                this.getAppList(1);
            },
            /*获取系统平台列表*/
            getSystemPlatformList(){
                this.$get(this.api.getAppList, {}).then((res) => {
                    this.searchOption.systemPlatformList = [
                        {"id":"IOSid","name":"IOS"},
                        {"id":"Androidid","name":"Android"},
                        {"id":"网页id","name":"网页"}
                    ];
                    this.getAppList();
                    var res = res.data;
                    if(res.code === 1 && res.data && res.data.records){
                        this.searchOption.systemPlatformList = [
                            {"id":"IOSid","name":"IOS"},
                            {"id":"Androidid","name":"Android"}
                        ];
                    } else {
                        this.$Message.error(res.msg);
                    }
                }).catch((err) => {
                    this.$Message.error(this.$ajaxErrorMsg);
                });
            },
            getAppList(searchStatus){
                if(searchStatus){
                    this.resetPage()
                }
                var param  = {
                    "page":this.curPage,
                    "pageSize":this.pageSize,
                    "appName":this.searchOption.appName,
                    "tab":this.searchOption.tab,
                    "currentSystemPlatformId":this.searchOption.currentSystemPlatformId
                }
                console.log(param)
                this.$get(this.api.getAppList, {}).then((res) => {
                    console.log(res)
                    let appList = [
                        {"creator":"Fuller","createTime":"2018-11-11 09:08","id":2,"img":"/dist/ece7b063418095d6997c2e3955ea0362.svg","name":"神庙逃亡","text":"这是一个演示控制台能力的DEMO，你可以先看看。","tag":"iOS"},
                        {"creator":"Fuller","createTime":"2018-11-11 09:08","id":2,"img":"/dist/ece7b063418095d6997c2e3955ea0362.svg","name":"地铁跑酷","text":"这是一个演示控制台能力的DEMO，你可以先看看。","tag":"iOS"},
                        {"creator":"Fuller","createTime":"2018-11-11 09:08","id":2,"img":"/dist/ece7b063418095d6997c2e3955ea0362.svg","name":"地铁跑酷2","text":"这是一个演示控制台能力的DEMO，你可以先看看。","tag":"Android"},
                        {"creator":"Fuller3","createTime":"2018-11-11 09:08","id":2,"img":"/dist/ece7b063418095d6997c2e3955ea0362.svg","name":"地铁跑酷3","text":"这是一个演示控制台能力的DEMO，你可以先看看。","tag":"Android"},
                        {"creator":"Fuller2","createTime":"2018-11-11 09:08","id":2,"img":"/dist/ece7b063418095d6997c2e3955ea0362.svg","name":"地铁跑酷4","text":"这是一个演示控制台能力的DEMO，你可以先看看。","tag":"iOS,Android"}
                    ];
                    this.appList = appList;
                    this.currentApp = "梦幻家园";
                    this.currentAppSrc = "/dist/ece7b063418095d6997c2e3955ea0362.svg";
                    this.avatorPath = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAELSURBVEhLxZRbCoQwDEVnteo+xA91iwr672MJHe5M20njjQ8G8cAF0SQH29KXu5nnBdM0uTzPXZZlSYqicPM8+yobU4BmPdTKsiy+awsV1HVNB+2laRrfnbIRWMP7vvcV7vPMapgkEeBXWaMcHui6jtbq5UoErAGxYLWIJApwWlgxYsFqEfkXUcCOYsiVJUJwhANRwAplpGRveEjgtOBqAs8LqqryFVvKsqQ9SCAKsDFW0RG6j26yvnuuInvpMQWyaBxH//aYYRiSXkki0FfFGYkevq6r//IlEQBcWLJBrqdG71vbtv7Lj40AaMmZsOGACoB1s7LoZZGYggBE7AjjnTwtFoeCf7lZ4NwbwtpbArKxQn4AAAAASUVORK5CYII=";
                    this.appTableData = appList;
                    var res = res.data;
                    if(res.code === 1 && res.data && res.data.records){
                       // this.channelNumberTableData = res.data.records;
                       // this.totalPage = res.data.total;
                    } else {
                        this.$Message.error(res.msg);
                    }
                }).catch((err) => {
                    this.$Message.error(this.$ajaxErrorMsg);
                });
            },
            /*切换选择系统平台*/
            changeSystemPlatform(val){
                console.log(val)
                this.searchOption.currentSystemPlatformId = val;
            },
            changeTab(val){
              console.log(val)
              this.searchOption.tab = val;
              this.getAppList(1);
            },
            changeApp(){
                this.showAppList = !this.showAppList
            },
            clickCurrentApp(item){
                this.showAppList = false;
                this.currentApp = item.name;
                this.currentAppSrc = item.img;
            },
            toggleClick () {
                this.shrink = !this.shrink;
            },
            clickItem(index){
                this.tabIndex = index;
            },
            handleSubmenuChange (val) {
            },
            beforePush (name) {
                return true;
            },
            handleCurrentChange(val) {
                this.curPage = val;
                this.getAppList();
            },
            handleClickUserDropdown (name) {
                if (name === 'ownSpace') {
                    this.$router.push({
                        name: 'accountCenter'
                    });
                } else if (name === 'loginout') {
                    // 退出登录
                    this.$store.dispatch('logout', this);
                    this.$router.push({
                        name: 'login'
                    });
                }
            }
        }
    };
</script>
