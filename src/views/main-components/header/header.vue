<style lang="less">
    @import "./../../main.less";
</style>
<template>
    <div class="main-header-con" >
        <div class="main-header">
            <div class="navicon-con">
                <Row type="flex" justify="end" align="middle" >
                    <div class="logo-con">
                        <div class="logo"><img  src="../../../images/logo.png"/></div>
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
                                <DropdownItem name="ownSpace"><Icon  type="ios-person-outline" class="user-dropdown-menu-icon"></Icon>帐号中心</DropdownItem>
                                <DropdownItem name="ownSpace"><div class="desc_text">创梦天地</div></DropdownItem>
                                <DropdownItem name="companyMemberManagement"><Icon  type="person-stalker" class="user-dropdown-menu-icon"></Icon>公司成员管理</DropdownItem>
                                <DropdownItem name="companyRoleManagement"><Icon  type="compose" class="user-dropdown-menu-icon"></Icon>角色/权限管理</DropdownItem>
                                <DropdownItem name="loginout"  divided>退出登录</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Avatar :src="avatorPath" style="margin-left: 10px;"></Avatar>
                    </Row>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import VueI18n from 'vue-i18n';
    Vue.use(VueI18n);

    export default {
        name: 'header',
        data () {
            return {
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
            this.getAppList();
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
            getAppList(){
                this.$get(`${this.$url}unified_account/getApp`, {}).then((res) => {
                    //console.log(res)
                    let appList = [
                        {"text":"这是一个演示控制台能力的DEMO，你可以先看看。","createTime":"2018-11-11 09:08","id":2,"img":"/dist/ece7b063418095d6997c2e3955ea0362.svg","name":"神庙逃亡","role":"角色一","platform":"iOS"},
                        {"text":"这是一个演示控制台能力的DEMO，你可以先看看。","createTime":"2018-11-11 09:08","id":2,"img":"/dist/ece7b063418095d6997c2e3955ea0362.svg","name":"地铁跑酷","role":"角色一、角色二","platform":"iOS"},
                        {"text":"这是一个演示控制台能力的DEMO，你可以先看看。","createTime":"2018-11-11 09:08","id":2,"img":"/dist/ece7b063418095d6997c2e3955ea0362.svg","name":"地铁跑酷2","role":"角色一、角色二","platform":"Android"},
                    ];
                    let platformList = [
                        {"text":"游戏发行与投放的用户来源标识...","type":"微服务","createTime":"2018-11-11 09:08","id":2,"img":"/dist/ece7b063418095d6997c2e3955ea0362.svg","name":"渠道管理","role":"角色一","platform":"iOS"},
                        {"text":"DATAX 数据相关报表，提取，查询等...","type":"微服务","createTime":"2018-11-11 09:08","id":2,"img":"/dist/ece7b063418095d6997c2e3955ea0362.svg","name":"大数据平台","role":"角色一、角色二","platform":"iOS"},
                    ];
                    this.appList = appList;
                    this.currentApp = "梦幻家园";
                    this.currentAppSrc = "/dist/ece7b063418095d6997c2e3955ea0362.svg";
                    this.avatorPath = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAELSURBVEhLxZRbCoQwDEVnteo+xA91iwr672MJHe5M20njjQ8G8cAF0SQH29KXu5nnBdM0uTzPXZZlSYqicPM8+yobU4BmPdTKsiy+awsV1HVNB+2laRrfnbIRWMP7vvcV7vPMapgkEeBXWaMcHui6jtbq5UoErAGxYLWIJApwWlgxYsFqEfkXUcCOYsiVJUJwhANRwAplpGRveEjgtOBqAs8LqqryFVvKsqQ9SCAKsDFW0RG6j26yvnuuInvpMQWyaBxH//aYYRiSXkki0FfFGYkevq6r//IlEQBcWLJBrqdG71vbtv7Lj40AaMmZsOGACoB1s7LoZZGYggBE7AjjnTwtFoeCf7lZ4NwbwtpbArKxQn4AAAAASUVORK5CYII=";
                    this.appTableData = appList;
                    this.platformTableData = platformList;
                }).catch((err) => {
                    this.$Message.error('This is an error tip');
                });
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
                }  else if (name === 'companyMemberManagement') {
                    this.$router.push({
                        name: 'companyMemberManagement'
                    });
                }
                else if (name === 'companyRoleManagement') {
                    this.$router.push({
                        name: 'companyRoleManagement'
                    });
                }
                else if (name === 'loginout') {
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
