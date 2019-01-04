<style lang="less">
    @import "./../main.less";
</style>
<template>
    <div class="main appCreate" >
        <top-header></top-header>
        <div class="appInfo">
            <div class="title">应用信息</div>
            <div class="desc">应用基本信息用于团队协作沟通，请认真填写。</div>
            <div class="border"></div>
            <!--应用成功信息详情-->
            <div class="appCreate_suc">
                <Icon class="icon" type="checkmark-circled"></Icon>
                <div class="title_text">创建成功</div>
                <div class="desc">立即阅读指南，了解技术中台所提供的服务。</div>
                <Form :model="appCreateSucInfo" class="info form" :label-width="100" >
                    <div class="item item_right_text">
                        <span class="text channel_name_text">App Key：</span>
                        <div class="right">
                            <Input type="text" disabled style="width: 450px;" v-model="appCreateSucInfo.appKey"></Input>
                            <span class="blue" @click="copy(appCreateSucInfo.appKey)">复制</span>
                        </div>
                    </div>
                    <div class="item item_right_text">
                        <span class="text channel_name_text">App Secret：</span>
                        <div class="right">
                            <Input type="text" disabled style="width: 450px;" v-model="appCreateSucInfo.appSecret"></Input>
                            <span class="blue"  @click="copy(appCreateSucInfo.appSecret)">复制</span>
                        </div>
                    </div>
                    <div class="item item_right_text">
                        <span class="text channel_name_text">Game ID：</span>
                        <div class="right">
                            <Input type="text" disabled style="width: 450px;" v-model="appCreateSucInfo.id"></Input>
                        </div>
                    </div>
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
    import topHeader from '../main-components/header/header.vue';
    export default {
        name: 'appCreateSuccess',
        components: {
            topHeader
        },
        data () {
            return {
                api:{
                    "getSecretInfo":this.$url+"app/secret",  //创建应用
                },
                appCreateSucInfo:{
                    appKey:"",
                    appSecret:"",
                    gameId:""
                }
            };
        },
        mounted(){
            var param  = {
                id:10018
            }
            this.$get(this.api.getSecretInfo, param,(data) =>{
                this.appCreateSucInfo = data.result;
            },(data) =>{
                this.$Message.error(this.$ajaxErrorMsg);
            });
        },
        methods: {
            copyStr(str){
                let $this = this;
                document.addEventListener('copy',function (e) {
                    e.clipboardData.setData('text/plain',str);
                    e.preventDefault();//阻止默认行为
                    e.stopPropagation();
                });
                document.execCommand("copy");//使文档处于可编辑状态，否则无效
            },
            copy(value){
                this.copyStr(value);
            },
            start(){
                if(this.$store.state.app.serviceList[1].iconType == "ios-box"){
                    location.href = this.$url+"#publicConfig/appInfo";
                } else {
                    this.$router.push({
                        name: 'appInfo'
                    });
                }
            },
            cancelCreate(){
                this.$router.push({
                    name: 'myApp'
                });
            }
        }
    };
</script>
