<style lang="less">
    @import "./../main.less";
</style>
<template>
    <div class="main appCreate" >
        <top-header></top-header>
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
    import topHeader from '../main-components/header/header.vue';
    export default {
        name: 'myApp',
        components: {
            topHeader
        },
        data () {
            return {
                api:{
                    "getPlatformsList":this.$url+"app/platforms",      //获取平台列表
                    "searchAppList":this.$url+"app/search",              //搜索应用列表
                    "accessAppList":this.$url+"app/access/apps",          //最近访问应用列表
                    "mineAppList":this.$url+"app/mine/apps",            //我创建的应用列表
                    "latestAppList":this.$url+"app/list",            //最新创建的应用列表
                },
                channelManagementHref:this.$url+"/#/issueChannel/channelNumber",
                searchOption:{
                    appName:"",
                    tab:"recentVisit",
                    systemPlatformList:[],
                    currentSystemPlatformName:"",
                    currentSystemPlatformId:""
                },
                curPage:1,
                totalPage:20,
                pageSize:this.$pageSize,
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
                                        src: params.row.iconUrl
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
                                            innerHTML: params.row.remark
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
                                        display:(params.row.platform == 'iOS' ||  params.row.platform == 'iOS,Android')?"inline-block":"none",
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
                                        display:(params.row.platform == 'Android' ||  params.row.platform == 'iOS,Android')?"inline-block":"none"
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
                        key: 'gmtCreate'
                    }
                ],
                data1: [

                ]
            };
        },
        mounted(){
            this.getPlatformsList();
            //this.getAccessAppList();
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
            getPlatformsList(){
                this.$get(this.api.getPlatformsList, {}, (data) =>{
                    console.log(data)
                    this.searchOption.systemPlatformList = [
                        {"id":"IOSid","name":"IOS"},
                        {"id":"Androidid","name":"Android"},
                        {"id":"网页id","name":"网页"}
                    ];
                    this.searchOption.systemPlatformList = data.result;
                    this.getAccessAppList();
                },(data) =>{
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
                    "userId":10018,
                    "name":this.searchOption.appName,
                    "platform":1,
                }
                console.log(param)
                this.$get(this.api.searchAppList, param, (data) =>{
                    this.appTableData = [];
                    this.appTableData = data.result.records;
                    this.totalPage = data.result.total;
                },(data) =>{
                    this.$Message.error(this.$ajaxErrorMsg);
                });
            },
            /*获取最新创建*/
            getLatestAppList(searchStatus){
                var param  = {
                    "page":this.curPage,
                    "pageSize":this.pageSize,
                    "companyId":[1223]
                }
                this.$get(this.api.latestAppList, param, (data) =>{
                    this.appTableData = [];
                    this.appTableData = data.result.records;
                    this.totalPage = data.result.total;
                },(data) =>{
                    this.$Message.error(this.$ajaxErrorMsg);
                });
            },
            /*获取最近访问*/
            getAccessAppList(searchStatus){
                var param  = {
                    "page":this.curPage,
                    "pageSize":this.pageSize,
                    "userId":10018
                }
                this.$get(this.api.accessAppList, param, (data) =>{
                    this.appTableData = [];
                    this.appTableData = data.result.records;
                    this.totalPage = data.result.total;
                },(data) =>{
                    this.$Message.error(this.$ajaxErrorMsg);
                });
            },
            /*获取我创建的*/
            getMineAppList(searchStatus){
                var param  = {
                    "page":this.curPage,
                    "pageSize":this.pageSize,
                    "userId":10018
                }
                this.$get(this.api.mineAppList, param, (data) =>{
                    this.appTableData = [];
                    this.appTableData = data.result.records;
                    this.totalPage = data.result.total;
                },(data) =>{
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
              if( this.searchOption.tab == "latestCreate"){
                  this.getLatestAppList();
              } else if(this.searchOption.tab == "oneselfCreate"){
                  this.getMineAppList();
              } else if(this.searchOption.tab == "recentVisit"){
                  this.getAccessAppList();
              }
            }
        }
    };
</script>
