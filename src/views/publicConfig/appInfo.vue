<style lang="less" scoped>

</style>

<template>
    <div class="appInfo appManagement">
       <div class="title">应用信息</div>
        <!--应用信息详情-->
        <Form :model="form" class="form" label-position="left" :label-width="100">
            <Alert type="error" v-show="showError" show-icon>{{error}}</Alert>
            <div class="appkey_info">
                <div class="left">
                    <div class="item item_right_text">
                        <span class="text channel_name_text">App Key：</span>
                        <div class="right">
                            <Input type="text" disabled style="width: 360px;" v-model="form.appKey"></Input>
                            <span class="blue" @click="copy(form.appKey)">复制</span>
                        </div>
                    </div>
                    <div class="item item_right_text">
                        <span class="text channel_name_text">App Secret：</span>
                        <div class="right">
                            <Input type="text" disabled style="width: 360px;" v-model="form.appSecret"></Input>
                            <span class="blue"  @click="copy(form.appSecret)">复制</span>
                        </div>
                    </div>
                    <div class="btn">
                        <Button @click="read">阅读指南</Button>
                        <Button @click="download">下载SDK</Button>
                        <div class="desc_text" style="margin-top: 10px;">提示：请先阅读指南，诊断自身业务所需的服务。</div>
                    </div>
                </div>
                <div class="right">
                    <div class="item">
                        <span class="text channel_name_text">App ID：</span>
                        <div class="right">
                            <Input type="text" disabled style="width: 360px;" v-model="form.id"></Input>
                        </div>
                    </div>
                    <div class="item">
                        <span class="text">创建时间：</span>
                        <div class="right">
                           {{form.gmtCreate}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="border"></div>
            <div class="appkey_info">
               <div class="left">
                   <div class="item">
                       <span class="text channel_name_text">应用名称：</span>
                       <div class="right">
                           <Input type="text" style="width: 360px;" v-model="form.name" placeholder="请输入应用名称"></Input>
                           <div class="desc_text">1-100个字符。</div>
                       </div>
                   </div>
                   <div class="item system_platform">
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
                   <div class="item remarks">
                       <span class="text">备注<em>（可选）</em>：</span>
                       <div class="right">
                           <Input v-model="form.remark"  style="width: 360px" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注"></Input>
                           <div class="desc_text">1-500个字符。如有必要，特别标注说明业务的独特类型。如：小包，或线下投放使用。</div>
                       </div>
                   </div>
               </div>
               <div class="right">
                   <div class="item icon">
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
               </div>
            </div>
            <Button type="primary" class="update" size="large" @click="update">更新</Button>
        </Form>
    </div>
</template>

<script>
    function getElementByClassName(classnames){
        var objArray= new Array();//定义返回对象数组
        var tags=document.getElementsByTagName("*");//获取页面所有元素
        var index = 0;
        for(var i in tags){
            if(tags[i].nodeType==1){
                if(tags[i].getAttribute("class") == classnames){ //如果某元素的class值为所需要
                    objArray[index]=tags[i];
                    index++;
                }
            }
        }
        return objArray;
    }
    export default {
        name: 'appInfo',
        data () {
            return {
                api:{
                    "getAppInfo":this.$url+"app/info",  //获取应用信息
                    "updateAppInfo":this.$url+"app/update",  //更新应用信息
                },
                error:"",
                showError:0,
                form: {
                    name:"",
                    platform: 7,
                    remark: "",
                    iconUrl:"",
                    appKey:"",
                    appSecret:"",
                    id:"",
                    gmtCreate:""
                },
                uploadAction:this.$url+"upload/servicesPic",
                uploadData:{
                    "pic_type":"service_icon"
                },
                copyStatus:0
            };
        },
        computed: {
        },
        created(){
        },
        mounted(){
          /*  this.$get(`${this.$url}unified_account/getApp`, {}).then((res) => {
                console.log(res)
                let form = {
                    systemPlatform:['HTML5'],
                    remarks:"平台，强制联网，微信登录，小程序传播222,强制联网，微信登录，小程序传播222,强制联网，微信登录，小程序传播222,",
                    appKey:"dfvfvfv",
                    appSecret:"vfv",
                    appID:"vf344"
                }
                this.form = form;
            }).catch((err) => {
                this.$Message.error('This is an error tip');
            });*/
            var param = {
                id:"10018"
            }
            this.$get(this.api.getAppInfo, param,(data) =>{
                console.log(data)
                 let form = {
                        systemPlatform:['网页'],
                        remarks:"平台，强制联网，微信登录，小程序传播222,强制联网，微信登录，小程序传播222,强制联网，微信登录，小程序传播222,",
                        name:"cdcd",
                        uploadImgUrl:"http://192.168.2.40:82/group1/M00/0B/65/wKgCKFwnVu6AVrZWAAAZh-cmTGU348.png",
                        appKey:"appkeyappkeyappkeyappkey",
                        appSecret:"App SecretApp SecretApp Secret",
                        appID:"cfvfvfvf",
                        createTime:" yy-mm-dd HH:MM"
                    };
                 this.form = data.result;
            },(data) =>{
                 this.$Message.error('This is an error tip');
            });
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
            update(){
               /* if(this.form.name == ""){
                    this.showError = 1;
                    this.error = "请输入应用名称！";
                } else if(this.form.name.length > 100){
                    this.showError = 1;
                    this.error = "请输入1-100个字符！";
                } else if(!this.form.systemPlatform.length){
                    this.showError = 1;
                    this.error = "请选择系统平台！";
                }*/
                var param  = {
                    name:this.form.name,
                    platform: 7,
                    remark:  this.form.remark,
                    iconUrl: this.form.iconUrl,
                    id: this.form.id,
                }
                if(!this.showError){
                    console.log(param)
                    this.$post(this.api.updateAppInfo, param,(data) =>{
                        this.$Message.success(data.desc);
                    },(data) =>{
                        this.$Message.error(this.$ajaxErrorMsg);
                    });
                }
            }
        }
    };
</script>

<style>

</style>
