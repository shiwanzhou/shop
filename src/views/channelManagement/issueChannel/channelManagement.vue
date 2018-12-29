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
                            class-name="vertical-center-modal  form createChannelModel" width="650">
                           <div class="content">
                                <Alert type="error" v-show="showError" show-icon>{{error.createChannelError}}</Alert>
                                <div class="item">
                                    <span class="text channel_name_text">渠道名称：</span>
                                    <div class="right">
                                        <Input   style="width: 330px;" v-model="createChannelParam.channelName" placeholder="请输入渠道名称"></Input>
                                        <div class="desc_text">1-100个字符。用于协作沟通识别指定的渠道号。</div>
                                    </div>
                                </div>
                                <div class="item">
                                    <span class="text">备注<em>(可选)</em>：</span>
                                    <div class="right">
                                        <Input type="textarea"  :rows="4"  v-model="createChannelParam.remarks"   style="width: 330px; " placeholder="如有必要，请说明添加渠道号的场景与用途。"></Input>
                                        <div class="desc_text"> 1-500个字符。如：腾讯应用宝。</div>
                                    </div>
                                </div>
                           </div>
                        <div slot="footer">
                            <Button type="text" size="large" @click="createChannelModelCancel">取消</Button>
                            <Button type="primary" size="large" @click="createChannelModelOk">创建</Button>
                        </div>
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
                            <Select placeholder="请选择渠道"  v-model="currentSelectBelongChannel" slot="prepend" style="width: 320px">
                                <Option v-for="item in belongChannels"  :value="item.channelName">{{item.channelName}}</Option>
                            </Select>
                            <div class="desc_text"> 注意：错误的所属渠道可能导致某些服务在线配置不符合其所在渠道的《内容发行合作协议》，最终导致法律纠纷。</div>
                        </div>
                    </div>
                </div>
                <div slot="footer">
                    <Button type="text" size="large" @click="deleteChannelModelCancel">取消</Button>
                    <Button type="primary" size="large" @click="deleteChannelModelOk">修改</Button>
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
                            <Select  v-model="currentSelectBelongChannel" placeholder="请选择渠道" slot="prepend" style="width: 320px">
                                <Option v-for="item in belongChannels"  :value="item.channelName">{{item.channelName}}</Option>
                            </Select>
                            <div class="desc_text"> 注意：错误的所属渠道可能导致某些服务在线配置不符合其所在渠道的《内容发行合作协议》，最终导致法律纠纷。</div>
                        </div>
                    </div>
                </div>
                <div slot="footer">
                    <Button type="text" size="large" @click="updateChannelModelCancel">取消</Button>
                    <Button type="primary" size="large" @click="updateChannelModelOk">修改</Button>
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
            return {
                api:{
                    "getChannelList":this.$url+"channel/getAllChannel", //获取渠道列表
                    "createChannel":this.$url+"channel/createChannel",  //创建渠道
                    "updateChannel":this.$url+"channel/updateChannel",   //修改渠道
                    "deleteChannel":this.$url+"channel/deleteChannel"   //删除渠道
                },
                createChannelModel:false,
                deleteChannelModel:false,
                updateChannelModel:false,
                showError:false,
                createChannelParam:{
                    channelName:"",
                    remarks:""
                },
                currentSelectBelongChannel:"",
                belongChannels:[],
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
                        key: 'belongChannelName'
                    },
                    {
                        title: '渠道ID',
                        key: 'identifier',
                    },
                    {
                        title: '备注',
                        key: 'remark',
                    },
                    {
                        title: '渠道号数量',
                        key: 'channelNumberNum',
                    },
                    {
                        title: '创建者',
                        key: 'username'
                    },
                    {
                        title: '创建时间',
                        key: 'createdDate',
                        sortable: true
                    },
                    {
                        title: '操作',
                        key: 'operation',
                        render: (h, params) => {
                            let _this = this;
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
                                        click:function(event) {
                                             event.preventDefault();
                                            _this.update(params.row.channelID)
                                        }
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
                                        click:function(event) {
                                            event.preventDefault();
                                            _this.delete(params.row.channelID)
                                        }
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
                this.getChannelNumberList(this.searchOption.channelNumberName);
            },
            /*获取渠道号列表*/
            getChannelNumberList(channelName){
                var param = {
                    "page":this.curPage,
                    "pageSize":this.pageSize,
                    "query":channelName || ""
                };
                this.$get(this.api.getChannelList, param).then((res) =>{
                    this.channelNumberTableData = [];
                    var res = res.data;
                    if(res.code === 1 && res.data && res.data.records){
                        this.channelNumberTableData = res.data.records;
                        this.totalPage = res.data.total;
                    }
                }).catch((err) => {
                    this.$Message.error('请求失败');
                });
            },
            validateCreateChannel(){
                if(this.createChannelParam.channelName == ""){
                        this.showError = 1;
                        this.error.createChannelError = "渠道名称不能为空！";
                } else if(this.createChannelParam.channelName.length > 100){
                        this.showError = 1;
                        this.error.createChannelError = "请输入1-100个渠道名称字符！";
                } else  if(this.createChannelParam.remarks.length > 500){
                        this.showError = 1;
                        this.error.createChannelError = "请输入1-500个备注字符！";
                } else {
                    this.showError = 0;
                }
                if(!this.showError){
                    this.loading = false;
                } else {
                    this.loading = true;
                }
            },
            /*修改渠道*/
            update(channelID){
                var param  = {
                    channelID:channelID
                }
                this.$get(`${this.$url}unified_account/getApp`, param).then((res) => {
                    console.log(res)
                    this.belongChannels = [
                        {"channelName":"cdfvf11222211"},
                        {"channelName":"22223vgg222222222222222"}
                    ]
                }).catch((err) => {
                    this.$Message.error('This is an error tip');
                });
                this.updateChannelModel = true;
            },
            /*删除渠道*/
            delete(channelID){
                var param  = {
                    channelID:channelID
                }
                this.$get(`${this.$url}unified_account/getApp`, param).then((res) => {
                    console.log(res)
                    this.belongChannels = [
                        {"channelName":"cdfvf11222211"},
                        {"channelName":"22223vgg222222222222222"}
                    ]
                }).catch((err) => {
                    this.$Message.error('This is an error tip');
                });
                this.deleteChannelModel = true;
            },
            /*取消修改渠道*/
            updateChannelModelCancel(){
                this.currentSelectBelongChannel = "";
                this.updateChannelModel = false;
            },
            /*确定修改渠道*/
            updateChannelModelOk(){
                if(this.currentSelectBelongChannel == ""){
                    this.showError = 1;
                    this.error.updateChannelError = "请选择渠道！";
                }
                if(!this.showError){
                    this.$post(`${this.$url}unified_account/getApp`, param).then((res) => {
                        console.log(res)
                        this.updateChannelModel = false;
                        this.$Message.success('修改渠道成功！');
                    }).catch((err) => {
                        this.$Message.error('This is an error tip');
                    });
                }
            },
            /*取消删除渠道*/
            deleteChannelModelCancel(){
                this.deleteChannelModel = false;
            },
            /*确定删除渠道*/
            deleteChannelModelOk(){
                if(this.currentSelectBelongChannel == ""){
                    this.showError = 1;
                    this.error.deleteChannelError = "请选择渠道！";
                }
                if(!this.showError){
                    this.$post(`${this.$url}unified_account/getApp`, param).then((res) => {
                        console.log(res)
                        this.deleteChannelModel = false;
                        this.$Message.success('修改渠道成功！');
                    }).catch((err) => {
                        this.$Message.error('This is an error tip');
                    });
                }
            },
            /*取消创建渠道*/
            createChannelModelCancel(){
                this.showError = false;
                this.createChannelModel = false;
            },
            /*确定创建渠道*/
            createChannelModelOk(){
                this.validateCreateChannel("");
                if(!this.showError){
                    this.createChannelModel = false;
                    var param = {
                        channelName:this.createChannelParam.channelName,
                        remarks:this.createChannelParam.remarks
                    };
                    this.$post(`${this.$url}unified_account/getApp`, param).then((res) => {
                        console.log(res)
                        this.$Message.success('创建渠道成功！');
                    }).catch((err) => {
                        this.$Message.error('This is an error tip');
                    });
                }
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
