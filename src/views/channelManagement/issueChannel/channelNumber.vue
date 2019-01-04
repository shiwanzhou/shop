<style lang="less" scoped>

</style>

<template>
    <div class="appInfo memberManagement channelNumber">
        <div class="breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem to="/issueChannel/channelNumber">平台参数</BreadcrumbItem>
                <BreadcrumbItem to="/issueChannel/channelNumber">发行渠道</BreadcrumbItem>
                <BreadcrumbItem>渠道号</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="title">渠道号</div>
        <div class="desc">
            最小颗粒度的用户来源属性，为了标识用户所属媒体，渠道号必须被创建在已经存在的渠道下。<a class="blue" href="#/issueChannel/channelManagement">管理渠道</a>
        </div>
        <div class="border"></div>
        <!--渠道号列表-->
        <div class="option">
            <div class="search">
                <div class="left">
                    <Radio-group v-model="searchOption.tab" type="button">
                        <Radio label="useing">使用中</Radio>
                        <Radio label="stoped">已停用</Radio>
                    </Radio-group>
                    <div class="subordinateChannel">
                       <span>所属渠道：</span>
                        <Select placeholder="请选择渠道" @on-change="changeBelongChannel"  v-model="curSelectBelongChannel" slot="prepend" style="width: 220px">
                            <Option v-for="item in belongChannels2" :value="item.channelID"  >{{item.channelName}}</Option>
                        </Select>
                    </div>
                </div>
                <div class="right">
                    <Input  icon="ios-search" placeholder="搜索渠道号或名称" v-model="searchOption.channelNumberName" @on-enter="search($event)" style="width: 300px"></Input>
                </div>
                <div class="clear"></div>
                <div class="btn">
                    <div class="left">
                        <Button>修改渠道</Button>
                        <Button  @click="stop(1)">停用</Button>
                    </div>
                    <div class="right">
                        <Button  icon="ios-download-outline"  @click="batchExport">全部导出</Button>
                        <Button  icon="ios-upload-outline"  @click="batchImportModel = true">批量导入</Button>
                        <Button type="primary" class="update" size="large" @click="createChannel">创建</Button>
                        <Modal
                                title="创建渠道号"
                                v-model="createChannelModel"
                                @on-ok="createChannelOk"
                                @on-cancel="cancel"
                                class-name="vertical-center-modal  form createChannelModel" width="650">
                            <div class="content">
                                <Alert type="error" v-show="showError" show-icon></Alert>
                                <div class="item select_item">
                                    <span class="text">所属渠道：</span>
                                    <div class="right">
                                        <Select placeholder="请选择渠道"  @on-change="changeChannelCreateModel"  slot="prepend" style="width: 330px">
                                            <Option v-for="item in belongChannels" :value="item.id"  >{{item.belongChannelName}}</Option>
                                        </Select>
                                        <div class="desc_text"> 注意：错误的所属渠道可能导致某些服务在线配置不符合其所在渠道的《内容发行合作协议》，最终导致法律纠纷。</div>
                                    </div>
                                </div>
                                <div class="item">
                                    <span class="text channel_name_text">渠道名称：</span>
                                    <div class="right">
                                        <Input type="text" v-model="createChannelParam.name" style="width: 330px;" placeholder="请输入渠道号名称"></Input>
                                        <div class="desc_text">1-100个字符。用于协作沟通识别指定的渠道号。</div>
                                    </div>
                                </div>
                                <div class="item">
                                    <span class="text channel_name_text">渠道号：</span>
                                    <div class="right">
                                        <Input type="text" v-model="createChannelParam.identifier" style="width: 330px;" placeholder="请输入渠道号"></Input>
                                        <div class="desc_text"> 1-100数字、字母、符号组合。</div>
                                    </div>
                                </div>
                                <div class="item">
                                    <span class="text">备注<em>(可选)</em>：</span>
                                    <div class="right">
                                        <Input type="textarea" :rows="4" v-model="createChannelParam.remark"  style="width: 330px; " placeholder="如有必要，请说明添加渠道号的场景与用途。"></Input>
                                        <div class="desc_text"> 1-500个字符。如：应用指定业务投放合作。</div>
                                    </div>
                                </div>
                            </div>
                            <div slot="footer">
                                <Button type="text" size="large" @click="createChannelModelCancel">取消</Button>
                                <Button type="primary" size="large" @click="createChannelModelOk">创建</Button>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
        <div class="member_table">
            <Table  ref="table" :columns="channelNumberTableColumns" :data="channelNumberTableData"></Table>
            <Modal
                    title="修改所属渠道"
                    v-model="updateChannelModel"
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
            <Modal
                    title="批量导入"
                    v-model="batchImportModel"
                    class-name="vertical-center-modal  form batchImportModel" width="640">
                <div class="content">
                    <Alert type="error" v-show="showError" show-icon></Alert>
                    <div class="desc_text remind_text">
                        <p>导入数据如下：</p>
                        <p>* {Key}一列,  ##-###个数字字母字符* ...，##-####字符；</p>
                        <p>* {Key}一列,  ##-###个数字字母字符* ...，##-####字符；</p>
                        <p>* {Key}一列,  ##-###个数字字母字符* ...，##-####字符；</p>
                        <p>* 表格中不能包含空行，单元格格式必须为文本。</p>
                    </div>
                    <div class="btn">
                        <Button  icon="ios-upload-outline"  @click="exportData(1)">上传文件</Button>
                        <a class="blue" href="" >下载模板</a>
                    </div>
                    <div class="desc_text">支持扩展名：.### .### .### .###...</div>
                </div>
            </Modal>
            <div class="clear"></div>
            <div class="page">
                <Page :total="totalPage" :current="curPage" show-total show-elevator show-sizer  @on-change="handleCurrentChange"></Page>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'channelNumber',
        data () {
            return{
                api:{
                    "getChannelList":this.$url+"channel/getChannel", //获取渠道列表
                    "getBelongChannel":this.$url+"channel/getBelongChannel",         //获取所属渠道渠道列表
                    "createChannel":this.$url+"channel/create",  //创建渠道
                    "updateChannel":this.$url+"channel/updateChannel",   //修改渠道
                    "deleteChannel":this.$url+"channel/deleteChannel"   //删除渠道
                },
                createChannelModel:false,
                updateChannelModel:false,
                stopChannelModel:false,
                batchImportModel:false,
                showError:false,
                createChannelParam:{
                    belongChannel:"", //所属渠道id
                    name:"",          //渠道号名称
                    identifier:"",    //渠道号
                    remark:""        //备注
                },
                curSelectBelongChannel:"",
                belongChannels:[],
                searchOption:{
                    tab: 'useing',
                    channelNumberName:"",
                    curSelectBelongChannelId:""
                },
                channelNumberTableData:[],
                channelNumberTableColumns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '渠道号名称 ',
                        key: 'belongChannelName'
                    },
                    {
                        title: '渠道号',
                        key: 'identifier',
                    },
                    {
                        title: '备注',
                        key: 'remark',
                    },
                    {
                        title: '所属渠道',
                        key: 'belongChannelName',
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
                                            _this.updateModal(params.row.channelID)
                                        }
                                    }
                                }),
                                h('span',{
                                    domProps: {
                                        innerHTML:"停用"
                                    },
                                    style: {
                                        color:"#2d8cf0",
                                        cursor: "pointer"
                                    },
                                    on: {
                                        click:function(event) {
                                            event.preventDefault();
                                            _this.stopModal(params.row.channelID)
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
        mounted(){
            this.getBelongChannelList();
            this.getChannelNumberList();
        },
        methods: {
            /*重置分页器*/
            resetPage(){
                this.curPage = 1;
                this.totalPage = 20;
                this.pageSize = this.$pageSize;
            },
            /*搜索渠道号列表*/
            search(){
                this.getChannelNumberList(this.searchOption.channelNumberName,1);
            },
            /*获取所属渠道列表*/
            getBelongChannelList(){
                this.belongChannels = [
                    {"channelName":"channelName11","channelID":"channelID11"},
                    {"channelName":"channelName22","channelID":"channelID22"}
                ]
                this.$get(this.api.getChannelList, {}, (data) =>{
                  //  this.belongChannels = data.result;
                },(data) =>{
                    this.$Message.error(this.$ajaxErrorMsg);
                });
            },
            /*获取渠道号列表*/
            getChannelNumberList(channelName,searchStatus){
                if(searchStatus){
                    this.resetPage()
                }
                var param = {
                    "page":this.curPage,
                    "pageSize":this.pageSize,
                    "tab":this.searchOption.tab,
                    "channelNumberName":this.searchOption.channelNumberName,
                    "curSelectBelongChannelId":this.searchOption.curSelectBelongChannelId,
                    "query":channelName || ""
                };
                console.log(param)
                this.$get(this.api.getChannelList, param, (data) =>{
                    this.channelNumberTableData = [];
                    this.channelNumberTableData = data.result.records;
                    this.totalPage = data.result.total;
                },(data) => {
                    this.$Message.error(this.$ajaxErrorMsg);
                });
            },
            update(){
                this.updateChannelModel = true;
            },
            createChannel(){
                this.createChannelModel = true;
                this.$get(this.api.getBelongChannel, {}, (data) =>{
                    this.belongChannels = data.result;
                }, (data) =>{
                    this.$Message.error(this.$ajaxErrorMsg);
                });
            },
            batchExport(){
                const title = '批量导出成功';
                const content = '<p>已成功导出 <span>##### </span>#条记录。</p>';
                this.$Modal.success({
                    title: title,
                    content: content
                });
            },
            createChannelOk(){
              console.log(233)
              this.showError = true;
                setTimeout(() => {
                    this.showError = false;
                    this.createChannelModel = false;
                }, 2000);
            },
            cancel(){
                this.showError = false;
            },
            stop(){
                this.$Modal.confirm({
                    title: '你确定要停用你选择的渠道号吗？',
                    content: '<p class="desc_text">影响：停用后其他服务将无法获取该渠道号的信息。例如：你无法再针对已停用的渠道号进行在线配置的修改与调整。</p>',
                    okText: '停用',
                    cancelText: '取消',
                    onOk: () => {
                        this.$Message.info('cfv');
                    },
                    onCancel: () => {
                        this.$Message.info('');
                    }
                });
            },
            create(){
                this.$router.push({
                    name: "appCreate"
                });
            },
            handleCurrentChange(val) {
                this.curPage = val;
                this.getChannelNumberList();
            },
            /*修改渠道弹框*/
            updateModal(channelID){
                var param  = {
                    channelID:channelID
                }
                this.belongChannels = [
                    {"channelName":"channelName11","channelID":"channelID11"},
                    {"channelName":"channelName22","channelID":"channelID22"}
                ]
                this.$get(this.api.getChannelList, param,(data) =>{
                    this.belongChannels = [
                        {"channelName":"cdfvf11222211","channelID":"1112"},
                        {"channelName":"22223vgg222222222222222","channelID":"12222112"}
                    ]
                },(data) =>{
                    this.$Message.error(this.$ajaxErrorMsg);
                });
                this.updateChannelModel = true;
            },
            /*停用渠道弹框*/
            stopModal(channelID){
                this.$Modal.confirm({
                    title: '你确定要停用你选择的渠道号吗？',
                    content: '<p class="desc_text">影响：停用后其他服务将无法获取该渠道号的信息。例如：你无法再针对已停用的渠道号进行在线配置的修改与调整。</p>',
                    okText: '停用',
                    cancelText: '取消',
                    onOk: () => {
                        var param  = {
                            channelID:channelID
                        }
                        this.$get(this.api.getChannelList, param,(data) =>{
                            this.$Message.success(data.desc);
                        },(data) => {
                            this.$Message.error(this.$ajaxErrorMsg);
                        });
                    },
                    onCancel: () => {
                    }
                });
            },
            /*切换所属渠道*/
            changeBelongChannel(val){
                console.log(val)
                this.searchOption.curSelectBelongChannelId = val;
            },
            /*创建弹框切换所属渠道*/
            changeChannelCreateModel(val){
                console.log(val)
                this.createChannelParam.belongChannel = val;
            },
            /*取消创建渠道*/
            createChannelModelCancel(){
                this.showError = false;
                this.createChannelModel = false;
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
            },
            /*确定创建渠道*/
            createChannelModelOk(){
                this.validateCreateChannel("");
                if(!this.showError){
                    this.createChannelModel = false;
                    var param = {
                        name:this.createChannelParam.channelName,
                        remark:this.createChannelParam.remarks
                    };
                    this.$post(this.api.createBelongChannel, param, (data) =>{
                        this.$Message.success(data.desc);
                    }, (data) =>{
                        this.$Message.error(this.$ajaxErrorMsg);
                    });
                }
            },
            exportData (type) {
                if (type === 1) {
                    this.$refs.table.exportCsv({
                        filename: 'The original data'
                    });
                } else if (type === 2) {
                    this.$refs.table.exportCsv({
                        filename: 'Sorting and filtering data',
                        original: false
                    });
                } else if (type === 3) {
                    this.$refs.table.exportCsv({
                        filename: 'Custom data',
                        columns: this.columns8.filter((col, index) => index < 4),
                        data: this.data7.filter((data, index) => index < 4)
                    });
                }
            }
        }
    };
</script>

<style>

</style>
