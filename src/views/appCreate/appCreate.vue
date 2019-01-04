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
            <!--应用信息详情-->
            <Form :model="form" label-position="left" :label-width="100">
                <Alert type="error" v-show="showError" show-icon>{{error}}</Alert>
                <div class="appInfo_detail">
                    <div class="app_name">
                        <span class="text">应用名称：</span>
                        <div class="right">
                            <Input type="text" v-model="form.name" style="width: 500px;"></Input>
                            <div class="desc_text">1-50个字符。</div>
                        </div>
                    </div>
                    <div class="system_platform">
                        <span class="text">系统平台：</span>
                        <div class="right">
                            <div class="checkbox">
                                <CheckboxGroup v-model="form.platform" >
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
                                name="iconFile">
                                <Button type="ghost" icon="ios-cloud-upload-outline">上传</Button>
                            </Upload>
                            <div class="desc_text">不超过500KB, 长宽比例1:1的 .jpg或.png文件。</div>
                        </div>
                    </div>
                    <div class="remarks">
                        <span class="text">备注<em>（可选）</em>：</span>
                        <div class="right">
                            <Input v-model="form.remark" style="width: 500px;" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注"></Input>
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
    import topHeader from '../main-components/header/header.vue';
    export default {
        name: 'appCreate',
        components: {
            topHeader
        },
        data () {
            return {
                api:{
                    "createApp":this.$url+"app/create",  //创建应用
                },
                error:"",
                showError:0,
                form: {
                    companyId:1,
                    name:"",
                    platform: [],
                    remarks: "",
                    iconUrl:""
                },
                uploadAction:this.$url+"app/upload/icon",
                uploadData:{
                }
            };
        },
        methods: {
            handleSuccess (res, file) {
                this.form.iconUrl =   res.result;
                file.url = res.result;
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
                } else if(this.form.name.length > 50){
                    this.showError = 1;
                    this.error = "请输入1-50个应用名称字符！";
                } else if(!this.form.platform.length){
                    this.showError = 1;
                    this.error = "请选择系统平台！";
                } else {
                    this.showError = 0;
                }
                var param  = {
                    name:this.form.name,
                    platform: 7,
                    remark: this.form.remark,
                    iconUrl:this.form.iconUrl
                }
                if(!this.showError){
                    console.log(param)
                    this.$post(this.api.createApp, param,(data) =>{
                        console.log(data)
                        this.$router.push({
                            name: 'appCreateSuc'
                        })
                    },(data) =>{
                        this.$Message.error(this.$ajaxErrorMsg);
                    });
                }
            },
            cancelCreate(){
                this.$router.replace({
                    name: 'myApp'
                });
            }
        }
    };
</script>
