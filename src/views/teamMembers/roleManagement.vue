<style lang="less" scoped>
    input::-webkit-input-placeholder { /* WebKit browsers */
        line-height: 20px
    }
</style>

<template>
    <div class="appInfo roleManagement">
        <div class="title">角色/权限</div>
        <div class="desc">管理各角色在控制台中可以访问的资源与权限。目前业务控制台仅支持编辑预设角色的权限，需要新增角色请联系 <span class="blue">角色和权限example@email.com </span>。</div>
        <div class="border"></div>
        <!--角色详情-->
        <div class="detail">
           <div class="select">
               <Button  icon="ios-person-outline">角色一</Button>
               <Button  icon="ios-person-outline">角色二</Button>
               <Button type="primary" icon="ios-person-outline">角色三</Button>
               <Button  icon="ios-person-outline">角色四</Button>
               <Button  icon="ios-person-outline">角色五</Button>
           </div>
           <div class="module">
               <div class="item">
                   <div class="left">
                       <span class="name">模块一</span>
                       <Checkbox
                               :indeterminate="indeterminate"
                               :value="checkAll"
                               class="checkAll"
                               @click.prevent.native="handleCheckAll">全选</Checkbox>
                   </div>
                   <CheckboxGroup class="checkbox_group" v-model="checkAllGroup" @on-change="checkAllGroupChange">
                       <Checkbox label="权限一"></Checkbox>
                       <Checkbox label="权限二"></Checkbox>
                       <Checkbox label="权限三"></Checkbox>
                   </CheckboxGroup>
               </div>
               <div class="item">
                   <div class="left">
                       <span class="name">模块二</span>
                       <Checkbox
                               :indeterminate="indeterminate"
                               :value="checkAll"
                               class="checkAll"
                               @click.prevent.native="handleCheckAll">全选</Checkbox>
                   </div>
                   <CheckboxGroup class="checkbox_group" v-model="checkAllGroup" @on-change="checkAllGroupChange">
                       <Checkbox label="权限一"></Checkbox>
                       <Checkbox label="权限二"></Checkbox>
                       <Checkbox label="权限三"></Checkbox>
                       <Checkbox label="权限二"></Checkbox>
                       <Checkbox label="权限三"></Checkbox>
                       <Checkbox label="权限二"></Checkbox>
                       <Checkbox label="权限三"></Checkbox>
                       <Checkbox label="权限二"></Checkbox>
                       <Checkbox label="权限三"></Checkbox>
                       <Checkbox label="权限二"></Checkbox>
                       <Checkbox label="权限三"></Checkbox>
                       <Checkbox label="权限二"></Checkbox>
                       <Checkbox label="权限三"></Checkbox>
                   </CheckboxGroup>
               </div>
               <div class="item">
                   <div class="left">
                       <span class="name">模块三</span>
                       <Checkbox
                               :indeterminate="indeterminate"
                               :value="checkAll"
                               class="checkAll"
                               @click.prevent.native="handleCheckAll">全选</Checkbox>
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
</template>

<script>
    export default {
        name: 'appInfo',
        data () {
            return {
                indeterminate: true,
                checkAll: false,
                checkAllGroup: ['权限一', '权限二']
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
            update(){
                console.log("update");
            },
            delete(){
                console.log("delete");
            },
            createMember(){
                /* this.$router.push({
                 name: "appCreate"
                 });*/
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
