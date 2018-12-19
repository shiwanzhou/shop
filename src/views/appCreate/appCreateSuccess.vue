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
                            <Icon type="cube"></Icon>
                            <span class="text">产品</span>
                        </div>
                        <div class="option">
                            <Icon type="pricetags"></Icon>
                            <span class="text">支持</span>
                        </div>
                        <div class="option">
                            <Icon type="wrench"></Icon>
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
        <div class="appInfo">
            <div class="title">应用信息</div>
            <div class="desc">应用基本信息用于团队协作沟通，请认真填写。</div>
            <div class="border"></div>
            <!--应用成功信息详情-->
            <div class="appCreate_suc">
                <Icon class="icon" type="checkmark-circled"></Icon>
                <div class="title_text">创建成功</div>
                <div class="desc">请立即阅读接入指南后，开始服务集成。</div>
                <Form :model="appCreateSucInfo" class="info" :label-width="100" >
                    <FormItem label="App Key：">
                        <Input v-model="appCreateSucInfo.key" disabled ></Input>
                    </FormItem>
                    <FormItem label="App Secret：">
                        <Input v-model="appCreateSucInfo.key" disabled ></Input>
                    </FormItem>
                    <FormItem label="App ID：">
                        <Input v-model="appCreateSucInfo.key" disabled ></Input>
                        <div class="detail_desc">原Game ID，仅用于系统内部识别唯一业务的标识。</div>
                    </FormItem>
                </Form>
                <div class="btn">
                    <Button >阅读指南</Button>
                    <Button type="primary" @click="start">开始集成</Button>
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
        name: 'appInfo',
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
                appCreateSucInfo:{
                    key:"cdcfvfv"

                }
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
            this.$get(`${this.$url}unified_account/getApp`, {}).then((res) => {
                console.log(res)
                let appList = [
                    {"id":2,"img":"/dist/ece7b063418095d6997c2e3955ea0362.svg","name":"神庙逃亡"},
                    {"id":2,"img":"/dist/ece7b063418095d6997c2e3955ea0362.svg","name":"地铁跑酷"},
                    {"id":2,"img":"/dist/ece7b063418095d6997c2e3955ea0362.svg","name":"地铁跑酷2"},
                    {"id":2,"img":"/dist/ece7b063418095d6997c2e3955ea0362.svg","name":"地铁跑酷3"},
                    {"id":2,"img":"/dist/ece7b063418095d6997c2e3955ea0362.svg","name":"地铁跑酷4"}
                ];
                this.appList = appList;
                this.currentApp = "梦幻家园";
                this.currentAppSrc = "/dist/ece7b063418095d6997c2e3955ea0362.svg";
                this.avatorPath = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAELSURBVEhLxZRbCoQwDEVnteo+xA91iwr672MJHe5M20njjQ8G8cAF0SQH29KXu5nnBdM0uTzPXZZlSYqicPM8+yobU4BmPdTKsiy+awsV1HVNB+2laRrfnbIRWMP7vvcV7vPMapgkEeBXWaMcHui6jtbq5UoErAGxYLWIJApwWlgxYsFqEfkXUcCOYsiVJUJwhANRwAplpGRveEjgtOBqAs8LqqryFVvKsqQ9SCAKsDFW0RG6j26yvnuuInvpMQWyaBxH//aYYRiSXkki0FfFGYkevq6r//IlEQBcWLJBrqdG71vbtv7Lj40AaMmZsOGACoB1s7LoZZGYggBE7AjjnTwtFoeCf7lZ4NwbwtpbArKxQn4AAAAASUVORK5CYII=";
            }).catch((err) => {
                this.$Message.error('This is an error tip');
            });
        },
        methods: {
            start(){
                this.$router.push({
                    name: 'appInfo'
                });
            },
            cancelCreate(){
                this.$router.push({
                    name: 'myApp'
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
            handleClickUserDropdown (name) {
                if (name === 'ownSpace') {
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
