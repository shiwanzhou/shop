<style lang="less" scoped>

</style>

<template>
    <div class="appInfo appManagement">
       <div class="title">应用信息</div>
        <!--应用信息详情-->
        <Form :model="form" label-position="left" :label-width="100">
            <div class="appkey_info">
                <div class="item">
                    <FormItem label="App Key：">
                        <Input v-model="form.appKey"  ></Input>
                    </FormItem>
                    <FormItem label="App ID：">
                        <Input v-model="form.appID"  ></Input>
                        <div class="detail_desc">原Game ID，仅用于系统内部识别唯一业务的标识。</div>
                    </FormItem>
                </div>
                <div class="item">
                    <FormItem label="App Secret：">
                        <Input v-model="form.appSecret" ></Input>
                    </FormItem>
                </div>
                <div class="btn">
                    <Button @click="read">阅读指南</Button>
                    <Button @click="download">下载SDK</Button>
                </div>
            </div>
            <div class="border"></div>
            <div class="appInfo_detail">
               <div class="left_span">
                   <div class="app_name">
                       <span class="text">应用名称：</span>
                       <div class="right">
                           <Input type="text" ></Input>
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
                                   <Checkbox label="HTML5" size="large"></Checkbox>
                                   <Checkbox label="小程序" size="large"></Checkbox>
                               </CheckboxGroup>
                           </div>
                           <div class="desc_text">当你的业务需要跨平台使用用户数据时请多选。</div>
                       </div>
                   </div>
                   <div class="icon">
                       <span class="text">图标：</span>
                       <div class="right">
                           <Upload
                                   ref="upload"
                                   :show-upload-list="false"
                                   :default-file-list="defaultList"
                                   :on-success="handleSuccess"
                                   :on-error="handleError"
                                   :format="['jpg','jpeg','png']"
                                   :max-size="500"
                                   :on-format-error="handleFormatError"
                                   :on-exceeded-size="handleMaxSize"
                                   :before-upload="handleBeforeUpload"
                                   multiple
                                   type="drag"
                                   action="//jsonplaceholder.typicode.com/posts/"
                                   style="display: inline-block;">
                               <Button type="ghost" icon="ios-cloud-upload-outline">上传</Button>
                           </Upload>
                           <div class="desc_text">不超过500KB, 长宽比例1:1的 .jpg或.png文件。</div>
                       </div>
                   </div>
               </div>
               <div class="right_span">
                   <div class="remarks">
                       <span class="text">备注<i>（可选）</i>：</span>
                       <div class="right">
                           <Input v-model="form.remarks"   type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
                           <div class="desc_text">1-500个字符。如有必要，特别标注说明业务的独特类型。如：小包，或线下投放使用。</div>
                       </div>
                   </div>
               </div>
            </div>
            <Button type="primary" class="update" size="large" @click="update">更新</Button>
        </Form>
    </div>
</template>

<script>
    export default {
        name: 'appInfo',
        data () {
            return {
                form:{
                    systemPlatform:[],
                    remarks:"",
                    appKey:"",
                    appSecret:"",
                    appID:""
                }
            };
        },
        computed: {
        },
        created(){
        },
        mounted(){
            this.$get(`${this.$url}unified_account/getApp`, {}).then((res) => {
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
            });
        },
        methods: {
            handleSuccess (res, file) {
                file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
                file.name = '7eb99afb9d5f317c912f08b5212fd69a';
            },
            handleError (res, file) {
                console.log(res)
                this.$Notice.warning({
                    title: '上传失败！',
                    desc: res
                });
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: 'The file format is incorrect',
                    desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: 'Exceeding file size limit',
                    desc: 'File  ' + file.name + ' is too large, no more than 2M.'
                });
            },
            handleBeforeUpload () {

            },
            update(){
                console.log(999)
                this.$router.push({
                    name: "appCreate"
                });
            }
        }
    };
</script>

<style>

</style>
