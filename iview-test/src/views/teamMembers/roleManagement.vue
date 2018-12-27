<style lang="less" scoped>
    input::-webkit-input-placeholder { /* WebKit browsers */
        line-height: 20px
    }
</style>

<template>
    <div class="appInfo roleManagement">
        <div class="title">角色/权限</div>
        <div class="desc">管理各角色在控制台中可以访问的资源与权限。目前业务控制台仅支持编辑预设角色的权限，需要新增角色请联系 <a class="blue" href="mailto:example@email.com">example@email.com </a>。</div>
        <div class="border"></div>
        <!--角色详情-->
        <div class="detail">
           <div class="select">
               <Radio-group v-model="tab" type="button" >
                   <Radio label="large"><Icon  type="ios-person-outline"></Icon>角色一</Radio>
                   <Radio label="default"><Icon type="ios-person-outline"></Icon>角色二</Radio>
                   <Radio label="default2"><Icon type="ios-person-outline"></Icon>角色三</Radio>
                   <Radio label="default3"><Icon type="ios-person-outline"></Icon>角色四</Radio>
               </Radio-group>
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
              <!-- <div class="item">
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
               </div>-->
           </div>
            <Button type="primary" class="update" size="large" @click="update">更新</Button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'roleManagement',
        data () {
            return {
                tab:"default",
                indeterminate: false,
                checkAll: false,
                checkAllGroup: []
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
                    this.roleList = roleList;
                    this.currentApp = "梦幻家园";
                    this.currentAppSrc = "/dist/ece7b063418095d6997c2e3955ea0362.svg";
                    this.avatorPath = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAELSURBVEhLxZRbCoQwDEVnteo+xA91iwr672MJHe5M20njjQ8G8cAF0SQH29KXu5nnBdM0uTzPXZZlSYqicPM8+yobU4BmPdTKsiy+awsV1HVNB+2laRrfnbIRWMP7vvcV7vPMapgkEeBXWaMcHui6jtbq5UoErAGxYLWIJApwWlgxYsFqEfkXUcCOYsiVJUJwhANRwAplpGRveEjgtOBqAs8LqqryFVvKsqQ9SCAKsDFW0RG6j26yvnuuInvpMQWyaBxH//aYYRiSXkki0FfFGYkevq6r//IlEQBcWLJBrqdG71vbtv7Lj40AaMmZsOGACoB1s7LoZZGYggBE7AjjnTwtFoeCf7lZ4NwbwtpbArKxQn4AAAAASUVORK5CYII=";
                    this.memberTableData = memberList;
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
            handleCheckAll () {
                if (this.indeterminate) {
                    this.checkAll = false;
                } else {
                    this.checkAll = !this.checkAll;
                }
                this.indeterminate = false;

                if (this.checkAll) {
                    this.checkAllGroup = ['权限一', '权限二', '权限三'];
                } else {
                    this.checkAllGroup = [];
                }
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
            },
            handleCurrentChange(val) {
                this.curPage = val;
                this.getRoleList();
            }
        }
    };
</script>

<style>

</style>
