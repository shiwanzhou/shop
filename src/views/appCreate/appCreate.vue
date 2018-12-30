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
            <!--应用信息详情-->
            <Form :model="form" label-position="left" :label-width="100">
                <Alert type="error" v-show="showError" show-icon>{{error}}</Alert>
                <div class="appInfo_detail">
                    <div class="app_name">
                        <span class="text">应用名称：</span>
                        <div class="right">
                            <Input type="text" v-model="form.name" style="width: 500px;"></Input>
                            <div class="desc_text">1-100个字符。</div>
                        </div>
                    </div>
                    <div class="system_platform">
                        <span class="text">系统平台：</span>
                        <div class="right">
                            <div class="checkbox">
                                <CheckboxGroup v-model="form.systemPlatform" >
                                    <Checkbox label="iOS" size="large"></Checkbox>
                                    <Checkbox label="Android" size="large"></Checkbox>
                                    <Checkbox label="小程序" size="large"></Checkbox>
                                    <Checkbox label="网页" size="large"></Checkbox>
                                    <Checkbox label="桌面客户端" size="large"></Checkbox>
                                </CheckboxGroup>
                            </div>
                            <div class="desc_text">当你的业务需要跨平台使用用户数据时请多选。</div>
                        </div>
                    </div>
                    <div class="icon">
                        <span class="text">图标<em>（可选）</em>：</span>
                        <div class="right">
                            <Upload
                                ref="upload"
                                :show-upload-list="true"
                                :on-success="handleSuccess"
                                :on-error="handleError"
                                :format="['jpg','jpeg','png']"
                                :max-size="500"
                                :on-format-error="handleFormatError"
                                :on-exceeded-size="handleMaxSize"
                                :before-upload="handleBeforeUpload"
                                multiple="false"
                                :action="uploadAction"
                                :data="uploadData"
                                name="photo">
                                <Button type="ghost" icon="ios-cloud-upload-outline">上传</Button>
                            </Upload>
                            <div class="desc_text">不超过500KB, 长宽比例1:1的 .jpg或.png文件。</div>
                        </div>
                    </div>
                    <div class="remarks">
                        <span class="text">备注<em>（可选）</em>：</span>
                        <div class="right">
                            <Input v-model="form.remarks" style="width: 500px;" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注"></Input>
                            <div class="desc_text">1-500个字符。如有必要，特别标注说明业务的独特类型。如：小包，或线下投放使用。</div>
                        </div>
                    </div>
                    <Button type="primary" class="update" size="large" @click="create">创建</Button>
                    <Button class="cancel" size="large" @click="cancelCreate">取消</Button>
                </div>
            </Form>
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
                api:{
                    "createChannel":this.$url+"channel/getChannelList",  //创建渠道
                },
                error:"",
                showError:0,
                form: {
                    name:"",
                    systemPlatform: [],
                    remarks: "",
                    uploadImgUrl:""
                },
                uploadAction:this.$url+"upload/servicesPic",
                uploadData:{
                    "pic_type":"service_icon"
                },
                currentApp: "",
                currentAppSrc: "",
                avatorPath: "",
                showAppList: false,
                appList: [],
                menuTheme: "dark",
                shrink: false,
                userName: '',
                tabIndex: 0
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

        },
        methods: {
            handleSuccess (res, file) {
                this.form.uploadImgUrl =   res.data.url;
                file.url =   res.data.url;
            },
            handleError (res, file) {
                this.$Notice.warning({
                    title: '上传失败！',
                    desc: res
                });
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: '文件格式不对！',
                    desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: '文件大小有限制！',
                    desc: 'File  ' + file.name + ' is too large, no more than 500kb.'
                });
            },
            create(){
                if(this.form.name == ""){
                    this.showError = 1;
                    this.error = "请输入应用名称！";
                } else if(this.form.name.length > 100){
                    this.showError = 1;
                    this.error = "请输入1-100个字符！";
                } else if(!this.form.systemPlatform.length){
                    this.showError = 1;
                    this.error = "请选择系统平台！";
                }
                var param  = {
                    name:this.form.name,
                    systemPlatform: this.form.systemPlatform,
                    remarks: this.form.remarks,
                    uploadImgUrl:this.form.uploadImgUrl
                }
                if(!this.showError){
                    console.log(param)
                    this.$post(this.api.createChannel, param).then((res) =>{
                        console.log(res)
                        if(res.code === 1){
                            this.$router.push({
                                name: 'appCreateSuc'
                            })
                        } else {
                            this.$Message.error(res.msg);
                        }
                    }).catch((err) => {
                        this.$Message.error(this.$ajaxErrorMsg);
                    });
                }
            },
            cancelCreate(){
                this.$router.replace({
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
