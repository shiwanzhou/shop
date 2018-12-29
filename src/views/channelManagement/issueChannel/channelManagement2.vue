<style lang="less" scoped>
    .vertical-center-modal {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .vertical-center-modal .ivu-modal{
        top: 0;
    }
</style>

<template>
    <div class="appInfo memberManagement channelNumber">
        <div class="breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem to="/issueChannel/channelNumber">平台参数</BreadcrumbItem>
                <BreadcrumbItem to="/issueChannel/channelNumber">发行渠道</BreadcrumbItem>
                <BreadcrumbItem>渠道管理</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="title">渠道管理</div>
        <div class="desc">
            渠道号的集合，用于识别用户所属的流量媒体，如，应用商店、手机厂商、移动运营商等合作方。
        </div>
        <div class="border"></div>
        <!--渠道号列表-->
        <div class="option">
            <div class="search">
                <div class="left">
                    <Input  icon="ios-search" placeholder="渠道名称或ID" v-model="searchOption.channelNumberName" @on-enter="search($event)" style="width: 300px"></Input>
                </div>
                <div class="right">
                    <Button type="primary" class="update" size="large" @click="createChannelModel = true">创建</Button>
                    <Modal
                            title="创建渠道"
                            v-model="createChannelModel"
                            @on-ok="createChannelModelOk"
                            @on-cancel="createChannelModelCancel"
                            class-name="vertical-center-modal  form createChannelModel" width="650">
                        <Form ref="createChannelValidate" :model="createChannelParam" :rules="ruleCreateChannelValidate" :label-width="80">
                            <div class="content">
                                <Alert type="error" v-show="showError" show-icon>{{error.createChannelError}}</Alert>
                                <div class="item">
                                    <span class="text channel_name_text">渠道名称：</span>
                                    <div class="right">
                                        <FormItem label="channelName" prop="channelName">
                                            <Input type="text" style="width: 330px;"   v-model="createChannelParam.channelName"  placeholder="请输入渠道名称"></Input>
                                        </FormItem>
                                        <Input  style="width: 330px;" v-model="createChannelParam.channelName" placeholder="请输入渠道名称"></Input>
                                        <div class="desc_text">1-100个字符。用于协作沟通识别指定的渠道号。</div>
                                    </div>
                                </div>
                                <div class="item">
                                    <span class="text">备注<em>(可选)</em>：</span>
                                    <div class="right">
                                        <Input type="textarea" :rows="4"  v-model="createChannelParam.remarks"   style="width: 330px; " placeholder="如有必要，请说明添加渠道号的场景与用途。"></Input>
                                        <div class="desc_text"> 1-500个字符。如：腾讯应用宝。</div>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </Modal>
                </div>
                <div class="clear"></div>
            </div>
        </div>
        <div class="member_table">
            <Table  ref="selection" :columns="channelNumberTableColumns" :data="channelNumberTableData"></Table>
            <Modal
                    title="删除渠道"
                    v-model="deleteChannelModel"
                    @on-ok="deleteChannelModelOk"
                    @on-cancel="deleteChannelModelCancel"
                    :loading="loading"
                    class-name="vertical-center-modal  form deleteChannelModel" width="485">
                <div class="content">
                    <Alert type="error" v-show="showError" show-icon></Alert>
                    <div class="desc_text remind_text">
                        注意：你想删除的 “渠道名称”包含#####个渠道号，请移动这些渠道号到另一个现有渠道下。
                    </div>
                    <div class="item">
                        <span class="text">所属渠道：</span>
                        <div class="right">
                            <Select placeholder="请选择渠道"  v-model="select1" slot="prepend" style="width: 320px">
                                <Option value="http">http://</Option>
                                <Option value="https">https://</Option>
                            </Select>
                            <div class="desc_text"> 注意：错误的所属渠道可能导致某些服务在线配置不符合其所在渠道的《内容发行合作协议》，最终导致法律纠纷。</div>
                        </div>
                    </div>
                </div>
            </Modal>
            <Modal
                    title="修改所属渠道"
                    v-model="updateChannelModel"
                    @on-ok="updateChannelModelOk"
                    @on-cancel="updateChannelModelCancel"
                    :loading="loading"
                    class-name="vertical-center-modal  form deleteChannelModel" width="485">
                <div class="content">
                    <Alert type="error" v-show="showError" show-icon></Alert>
                    <div class="desc_text remind_text">
                        注意：你将修改 “渠道号名称”、“渠道号名称” 等#####个渠道号的所属渠道。
                    </div>
                    <div class="item">
                        <span class="text">所属渠道：</span>
                        <div class="right">
                            <Select placeholder="请选择渠道" v-model="select1" slot="prepend" style="width: 320px">
                                <Option value="http">http://</Option>
                                <Option value="https">https://</Option>
                            </Select>
                            <div class="desc_text"> 注意：错误的所属渠道可能导致某些服务在线配置不符合其所在渠道的《内容发行合作协议》，最终导致法律纠纷。</div>
                        </div>
                    </div>
                </div>
            </Modal>
            <div class="clear"></div>
            <div class="page">
                <Page :total="totalPage" show-total show-elevator show-sizer  @on-change="handleCurrentChange"></Page>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'channelManagement',
        data () {
            const validateChannelName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please enter your name'));
                } else {
                    if (this.createChannelParam.channelName !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.createChannelValidate.validateField('channelName');
                    }
                    callback();
                }
            };
            const validateRemarks = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please enter your Remarks'));
                } else {
                    if (this.createChannelParam.remarks !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.createChannelValidate.validateField('remarks');
                    }
                    callback();
                }
            };
            return {
                createChannelModel:false,
                deleteChannelModel:false,
                updateChannelModel:false,
                showError:false,
                loading:true,
                createChannelParam:{
                    channelName:"",
                    remarks:""
                },
                ruleCreateChannelValidate: {
                    channelName: [
                        { validator: validateChannelName, trigger: 'blur' }
                    ],
                    remarks: [
                        { validator: validateRemarks, trigger: 'blur' }
                    ]
                },
                error:{
                    createChannelError:"",
                    deleteChannelError:"",
                    updateChannelError:""
                },
                searchOption:{
                    channelNumberName:"",
                    subordinateChannel:[]
                },
                channelNumberTableData:[],
                channelNumberTableColumns: [
                    {
                        title: '渠道号名称 ',
                        key: 'name'
                    },
                    {
                        title: '渠道ID',
                        key: 'channelID',
                    },
                    {
                        title: '备注',
                        key: 'remarks',
                    },
                    {
                        title: '渠道号数量',
                        key: 'channelNumberNum',
                    },
                    {
                        title: '创建者',
                        key: 'creator'
                    },
                    {
                        title: '创建时间',
                        key: 'createTime',
                        sortable: true
                    },
                    {
                        title: '操作',
                        key: 'operation',
                        render: (h, params) => {
                            return h('div',{
                                style: {
                                    "display":"flex",
                                    "padding-top":"15px",
                                    "padding-bottom":"15px",
                                    "align-items":"center"
                                },
                            }, [
                                h('span', {
                                    domProps: {
                                        innerHTML:"修改"
                                    },
                                    style: {
                                        marginRight:"20px",
                                        color:"#2d8cf0",
                                        cursor: "pointer"
                                    },
                                    on: {
                                        click: this.update
                                    }
                                }),
                                h('span',{
                                    domProps: {
                                        innerHTML:"删除"
                                    },
                                    style: {
                                        color:"#2d8cf0",
                                        cursor: "pointer"
                                    },
                                    on: {
                                        click: this.delete
                                    }
                                })
                            ]);
                        }
                    }
                ],
                curPage:1,
                totalPage:20,
                pageSize:this.$pageSize,
            };
        },
        computed: {
        },
        created(){
        },
        mounted(){
            this.getChannelNumberList();
        },
        methods: {
            /*搜索渠道号列表*/
            search(){
                console.log(this.searchOption.channelNumberName)
                this.getChannelNumberList(this.searchOption.channelNumberName);
            },
            /*修改渠道*/
            update(){
                this.updateChannelModel = true;
            },
            /*删除渠道*/
            delete(){
                this.deleteChannelModel = true;
            },
            /*获取渠道号列表*/
            getChannelNumberList(channelID){
                var param = {
                    "channelID":"AD0S0N00003"
                };
                var url =  `${this.$url}channel/getChannelByIdentifier/`+channelID;
                var url2 =  `${this.$url}channel/getChannelByIdentifier/`;
                this.$get(`${this.$url}unified_account/getApp`, {}).then((res) => {
                    console.log(res)
                    let channelNumberList = [
                        {
                            "creator":"doggy.wang (王二狗)",
                            "createTime":"2018-11-11 09:08",
                            "id":2,
                            "img":"/dist/ece7b063418095d6997c2e3955ea0362.svg",
                            "name":"华为vfvfv",
                            "channelID":"HW0S0N84001",
                            "remarks":"vffvfvf",
                            "channelNumberNum":"1222",
                            "subordinateChannel":"华为",
                            "belongChannel":[
                                {"channelID":"HW0S0N84001","channelName":"网游"},
                                {"channelID":"HW0S0N84002","channelName":"网游2"},
                                {"channelID":"HW0S0N84003","channelName":"网游3"}
                            ]
                        },
                        {
                            "creator":"doggy.wang (王二狗)",
                            "createTime":"2018-11-11 09:08",
                            "id":2,
                            "img":"/dist/ece7b063418095d6997c2e3955ea0362.svg",
                            "name":"华为vfvfv",
                            "channelID":"HW0S0N84001",
                            "remarks":"vffvfvfdd111",
                            "channelNumberNum":"1222",
                            "subordinateChannel":"中兴",
                            "belongChannel":[
                                {"channelID":"XW0S0N84001","channelName":"休闲"},
                                {"channelID":"XW0S0N84002","channelName":"休闲2"},
                                {"channelID":"XW0S0N84003","channelName":"休闲3"}
                            ]
                        },
                        {
                            "creator":"doggy.wang (王二狗)",
                            "createTime":"2018-11-11 09:08",
                            "id":2,
                            "img":"/dist/ece7b063418095d6997c2e3955ea0362.svg",
                            "name":"华为vfvfv2222",
                            "channelID":"HW0S0N84001",
                            "remarks":"vffvfvfdd111",
                            "channelNumberNum":"1222",
                            "subordinateChannel":"三星"
                        },
                        {
                            "creator":"doggy.wang (王二狗)",
                            "createTime":"2018-11-11 09:08",
                            "id":2,
                            "img":"/dist/ece7b063418095d6997c2e3955ea0362.svg",
                            "name":"华为vfvfvvfvfv222",
                            "channelID":"HW0S0N84001",
                            "remarks":"vffvfvfdd111",
                            "channelNumberNum":"1222",
                            "subordinateChannel":"三星222"
                        },
                        {
                            "creator":"doggy.wang (王二狗222)",
                            "createTime":"2018-11-11 09:08",
                            "id":2,
                            "img":"/dist/ece7b063418095d6997c2e3955ea0362.svg",
                            "name":"华为vfvfv2vgbg",
                            "channelID":"HW0S0N84001",
                            "remarks":"vffvfvfdd111333",
                            "channelNumberNum":"1222",
                            "subordinateChannel":"三星3444"
                        }
                    ];
                    this.channelNumberTableData = channelNumberList;
                    this.currentApp = "梦幻家园";
                    this.currentAppSrc = "/dist/ece7b063418095d6997c2e3955ea0362.svg";
                    this.avatorPath = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAELSURBVEhLxZRbCoQwDEVnteo+xA91iwr672MJHe5M20njjQ8G8cAF0SQH29KXu5nnBdM0uTzPXZZlSYqicPM8+yobU4BmPdTKsiy+awsV1HVNB+2laRrfnbIRWMP7vvcV7vPMapgkEeBXWaMcHui6jtbq5UoErAGxYLWIJApwWlgxYsFqEfkXUcCOYsiVJUJwhANRwAplpGRveEjgtOBqAs8LqqryFVvKsqQ9SCAKsDFW0RG6j26yvnuuInvpMQWyaBxH//aYYRiSXkki0FfFGYkevq6r//IlEQBcWLJBrqdG71vbtv7Lj40AaMmZsOGACoB1s7LoZZGYggBE7AjjnTwtFoeCf7lZ4NwbwtpbArKxQn4AAAAASUVORK5CYII=";
                }).catch((err) => {
                    this.$Message.error('This is an error tip');
                });
            },
            /*确定创建渠道*/
            createChannelModelOk(){
                this.$refs.createChannelValidate.validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');

                    }
                })
                /*   if(this.createChannelParam.channelName == ""){
                 this.showError = 1;
                 this.error.createChannelError = "渠道名称不能为空！";
                 return false;
                 } else if(this.createChannelParam.channelName.length > 100){
                 this.showError = 1;
                 this.error.createChannelError = "请输入1-100个渠道名称字符！";
                 return false;
                 } else  if(this.createChannelParam.remarks.length > 500){
                 this.showError = 1;
                 this.error.createChannelError = "请输入1-500个备注字符！";
                 } else {
                 this.showError = 0;
                 }*/
                /*  if(!this.showError){
                 this.$post(`${this.$url}unified_account/getApp`, {}).then((res) => {
                 console.log(res)
                 this.createChannelModel = true;
                 this.$Message.success('创建渠道成功！');
                 }).catch((err) => {
                 this.$Message.error('This is an error tip');
                 });
                 }*/
            },
            /*分页切换*/
            handleCurrentChange(val) {
                this.curPage = val;
                this.getChannelNumberList();
            }
        }
    };
</script>

<style>

</style>
