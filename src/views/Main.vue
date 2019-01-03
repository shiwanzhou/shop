<style lang="less">
    @import "./main.less";
</style>
<template>
    <div class="main" :class="{'main-hide-text': shrink}" >
        <div class="sidebar-menu-con" :style="{width: shrink?'60px':'300px', overflow: shrink ? 'visible' : 'auto'}" style="display: flex">
            <div class="big_nav">
                <div class="item" v-for="(item,index) in serviceList"  :class="{current:index == tabIndex}"  @click="clickItem(index)" >
                  <Icon :type="item.iconType" style="font-size: 20px"></Icon>
                </div>
            </div>
            <shrinkable-menu 
                :shrink="shrink"
                @on-click="handleSubmenuChange"
                :theme="menuTheme" 
                :before-push="beforePush"
                :menu-list="menuList">
            </shrinkable-menu>
        </div>
        <div class="main-header-con" >
            <div class="main-header">
                <div class="navicon-con">
                    <!--<Button :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" type="text" @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </Button>-->
                    <Row type="flex" justify="end" align="middle" >
                        <div class="logo-con">
                            <div class="logo"><img  src="../images/logo.png"/></div>
                            <span class="title">技术中台服务门户</span>
                        </div>
                        <div class="app" @click="changeApp">
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
        <div class="single-page-con" :style="{left: shrink?'60px':'300px'}">
            <div class="single-page">
                <keep-alive :include="cachePage">
                    <router-view></router-view>
                </keep-alive>
            </div>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import VueI18n from 'vue-i18n';
    Vue.use(VueI18n);
    import shrinkableMenu from './main-components/shrinkable-menu/shrinkable-menu.vue';
    window.commonApp = 2;
    export default {
        components: {
            shrinkableMenu
        },
        data () {
            return {
                currentApp:"",
                currentAppSrc:"",
                avatorPath:"",
                showAppList:false,
                appList:[],
                bigNavList:[
                ],
                menuTheme:"dark",
                shrink: false,
                userName: '',
                tabIndex:1
            };
        },
        computed: {
            menuList () {
                return this.$store.state.app.menuList;
            },
            serviceList () {
                return this.$store.state.app.serviceList;
            },
            cachePage () {
                return this.$store.state.app.cachePage;
            },
            avatorPath () {
                return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAELSURBVEhLxZRbCoQwDEVnteo+xA91iwr672MJHe5M20njjQ8G8cAF0SQH29KXu5nnBdM0uTzPXZZlSYqicPM8+yobU4BmPdTKsiy+awsV1HVNB+2laRrfnbIRWMP7vvcV7vPMapgkEeBXWaMcHui6jtbq5UoErAGxYLWIJApwWlgxYsFqEfkXUcCOYsiVJUJwhANRwAplpGRveEjgtOBqAs8LqqryFVvKsqQ9SCAKsDFW0RG6j26yvnuuInvpMQWyaBxH//aYYRiSXkki0FfFGYkevq6r//IlEQBcWLJBrqdG71vbtv7Lj40AaMmZsOGACoB1s7LoZZGYggBE7AjjnTwtFoeCf7lZ4NwbwtpbArKxQn4AAAAASUVORK5CYII=";
            },
        },
        created(){
        },
        mounted(){
            this.$get(`${this.$url}unified_account/getApp`, {}).then((res) => {
                let appList = [
                    {"id":2,"img":"/dist/ece7b063418095d6997c2e3955ea0362.svg","name":"神庙逃亡"},
                    {"id":2,"img":"/dist/ece7b063418095d6997c2e3955ea0362.svg","name":"地铁跑酷"},
                    {"id":2,"img":"/dist/ece7b063418095d6997c2e3955ea0362.svg","name":"地铁跑酷2"},
                    {"id":2,"img":"/dist/ece7b063418095d6997c2e3955ea0362.svg","name":"地铁跑酷3"},
                    {"id":2,"img":"/dist/ece7b063418095d6997c2e3955ea0362.svg","name":"地铁跑酷4"}
                ];
              //  console.log(appList)
                this.appList = appList;
                this.currentApp = "梦幻家园";
                this.currentAppSrc = "/dist/ece7b063418095d6997c2e3955ea0362.svg";
                this.avatorPath = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAELSURBVEhLxZRbCoQwDEVnteo+xA91iwr672MJHe5M20njjQ8G8cAF0SQH29KXu5nnBdM0uTzPXZZlSYqicPM8+yobU4BmPdTKsiy+awsV1HVNB+2laRrfnbIRWMP7vvcV7vPMapgkEeBXWaMcHui6jtbq5UoErAGxYLWIJApwWlgxYsFqEfkXUcCOYsiVJUJwhANRwAplpGRveEjgtOBqAs8LqqryFVvKsqQ9SCAKsDFW0RG6j26yvnuuInvpMQWyaBxH//aYYRiSXkki0FfFGYkevq6r//IlEQBcWLJBrqdG71vbtv7Lj40AaMmZsOGACoB1s7LoZZGYggBE7AjjnTwtFoeCf7lZ4NwbwtpbArKxQn4AAAAASUVORK5CYII=";
            }).catch((err) => {
                this.$Message.error('This is an error tip');
            });
        },
        methods: {
            init () {
            },
            changeApp(){
                this.showAppList = !this.showAppList
            },
            clickCurrentApp(item){
                this.showAppList = false;
                this.currentApp = item.name;
                this.currentAppSrc = item.img;
                window.commonApp = 1;
                this.$store.commit('updateMenulist');
            },
            toggleClick () {
                this.shrink = !this.shrink;
            },
            clickItem(index){
                this.tabIndex = index;
                if(index == 0){
                    this.$router.push({
                        name: 'myApp'
                    });
                }  else {
                    this.$store.commit('updateMenulist');
                }
            },
            handleSubmenuChange (val) {
            },
            beforePush (name) {
                return true;
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
