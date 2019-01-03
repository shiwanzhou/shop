<style lang="less">
    @import "./../main.less";
</style>
<template>
    <div class="main appCreate" >
       <top-header></top-header>
        <!--我的应用-->
        <div class="appInfo  roleManagement companyRoleManagement">
            <div class="title">公司角色管理</div>
            <div class="desc">管理各角色在 {公司名称} 帐号下中可以访问的资源与权限。目前业务控制台仅支持编辑预设 <a class="blue" href="">角色的权限</a>。</div>
            <div class="border"></div>
            <div class="detail">
                <div class="select">
                    <div class="item">
                        <div class="text">公司级：</div>
                        <div class="role_tab">
                            <Radio-group v-model="tab" type="button" >
                                <Radio label="large"><Icon  type="ios-person-outline"></Icon>角色一</Radio>
                                <Radio label="default"><Icon type="ios-person-outline"></Icon>角色二</Radio>
                                <Radio label="default2"><Icon type="ios-person-outline"></Icon>角色三</Radio>
                                <Radio label="default3"><Icon type="ios-person-outline"></Icon>角色四</Radio>
                            </Radio-group>
                        </div>
                    </div>
                    <div class="item">
                        <div class="text">应用级：</div>
                        <div class="role_tab">
                            <Radio-group v-model="tabs" type="button" >
                                <Radio label="large"><Icon  type="ios-person-outline"></Icon>角色一</Radio>
                                <Radio label="default"><Icon type="ios-person-outline"></Icon>角色二</Radio>
                                <Radio label="default2"><Icon type="ios-person-outline"></Icon>角色三</Radio>
                                <Radio label="default3"><Icon type="ios-person-outline"></Icon>角色四</Radio>
                            </Radio-group>
                        </div>
                    </div>
                    <div class="desc_text">提示：应用类角色仅影响用户在应用下的资源访问与权限，当用户被添加至指定应用的团队后生效。</div>
                    <div class="right">
                        <Button  class="setup" size="large" @click="roleManagementModel = true">设置</Button>
                        <Modal
                                title="角色管理"
                                v-model="roleManagementModel"
                                class-name="vertical-center-modal  form roleManagementModel" width="485">
                            <div class="content" style="height: auto">
                                <div class="desc">
                                    当前版本暂不支持自定义角色。如有需要添加请联系<a class="blue">example@email.com </a>。
                                </div>
                            </div>
                            <div slot="footer">
                                <Button  size="large" @click="cancel">完成</Button>
                            </div>
                        </Modal>
                    </div>
                </div>
                <div class="module">
                    <div class="item">
                        <div class="left">
                            <span class="name">模块一</span>
                        </div>
                        <CheckboxGroup class="checkbox_group" v-model="checkAllGroup" @on-change="checkAllGroupChange">
                            <Checkbox label="权限一" disabled="disabled"></Checkbox>
                            <Checkbox label="权限二" disabled="disabled"></Checkbox>
                            <Checkbox label="权限三" disabled="disabled"></Checkbox>
                        </CheckboxGroup>
                    </div>
                    <div class="item">
                        <div class="left">
                            <span class="name">模块一</span>
                        </div>
                        <CheckboxGroup class="checkbox_group" v-model="checkAllGroup" @on-change="checkAllGroupChange">
                            <Checkbox label="权限一"></Checkbox>
                            <Checkbox label="权限二"></Checkbox>
                            <Checkbox label="权限三"></Checkbox>
                        </CheckboxGroup>
                    </div>
                    <div class="item">
                        <div class="left">
                            <span class="name">模块一</span>
                        </div>
                        <CheckboxGroup class="checkbox_group" v-model="checkAllGroup" @on-change="checkAllGroupChange">
                            <Checkbox label="权限一"></Checkbox>
                            <Checkbox label="权限二"></Checkbox>
                            <Checkbox label="权限三"></Checkbox>
                        </CheckboxGroup>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import topHeader from '../main-components/header/header.vue';
    export default {
        name: 'companyRoleManagement',
        components: {
            topHeader
        },
        data () {
            return {
                roleManagementModel:false,
                tab:"default",
                indeterminate: false,
                checkAll: false,
                checkAllGroup: ["权限一"]
            };
        },
        computed: {
        },
        created(){
        },
        mounted(){
            this.getRoleList();
        },
        methods: {
            getRoleList(){
                this.$get(`${this.$url}unified_account/getApp`, {}).then((res) => {
                    console.log(res)
                    let roleList = [
                        {
                            "lastLoginTime":"2018-11-11 09:08",
                            "createTime":"2018-11-11 09:11",
                            "id":2,
                            "img":"/dist/ece7b063418095d6997c2e3955ea0362.svg",
                            "name":"(fullname) 姓名",
                            "text":"这是一个演示控制台能力的DEMO，你可以先看看。",
                            "company":"创梦天地",
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
                            "role":"开发"
                        }
                    ];
                    //this.roleList = roleList;
                    this.currentApp = "梦幻家园";
                    this.currentAppSrc = "/dist/ece7b063418095d6997c2e3955ea0362.svg";
                    this.avatorPath = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAELSURBVEhLxZRbCoQwDEVnteo+xA91iwr672MJHe5M20njjQ8G8cAF0SQH29KXu5nnBdM0uTzPXZZlSYqicPM8+yobU4BmPdTKsiy+awsV1HVNB+2laRrfnbIRWMP7vvcV7vPMapgkEeBXWaMcHui6jtbq5UoErAGxYLWIJApwWlgxYsFqEfkXUcCOYsiVJUJwhANRwAplpGRveEjgtOBqAs8LqqryFVvKsqQ9SCAKsDFW0RG6j26yvnuuInvpMQWyaBxH//aYYRiSXkki0FfFGYkevq6r//IlEQBcWLJBrqdG71vbtv7Lj40AaMmZsOGACoB1s7LoZZGYggBE7AjjnTwtFoeCf7lZ4NwbwtpbArKxQn4AAAAASUVORK5CYII=";
                }).catch((err) => {
                    this.$Message.error('This is an error tip');
                });
            },
            cancel(){
                this.roleManagementModel = false;
            },
            checkAllGroupChange (data) {
                if (data.length === 3) {
                    this.indeterminate = false;
                    this.checkAll = true;
                } else if (data.length > 0) {
                    this.indeterminate = true;
                    this.checkAll = false;
                } else {
                    this.indeterminate = false;
                    this.checkAll = false;
                }
            }
        }
    };
</script>
