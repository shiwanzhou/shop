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
                    <Radio-group v-model="tableSize" type="button">
                        <Radio label="large">使用中</Radio>
                        <Radio label="default">已停用</Radio>
                    </Radio-group>
                    <div class="subordinateChannel">
                       <span>所属渠道：</span>
                        <Select  style="width:200px;margin-right: 20px;">
                            <Option>fvf</Option>
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
                        <Button  icon="ios-download-outline"  @click="batchImportModel =  true">全部导出</Button>
                        <Button  icon="ios-upload-outline"  @click="batchImportModel = true">批量导入</Button>
                        <Button type="primary" class="update" size="large" @click="createChannelModel = true">创建</Button>
                        <Modal
                                title="创建渠道号"
                                v-model="createChannelModel"
                                class-name="vertical-center-modal  form createChannelModel" width="650">
                            <div class="content">
                                <div class="item select_item">
                                    <span class="text">所属渠道：</span>
                                    <div class="right">
                                        <Select placeholder="请选择渠道" v-model="select1" slot="prepend" style="width: 330px">
                                            <Option value="http">http://</Option>
                                            <Option value="https">https://</Option>
                                        </Select>
                                        <div class="desc_text"> 注意：错误的所属渠道可能导致某些服务在线配置不符合其所在渠道的《内容发行合作协议》，最终导致法律纠纷。</div>
                                    </div>
                                </div>
                                <div class="item">
                                    <span class="text channel_name_text">渠道名称：</span>
                                    <div class="right">
                                        <Input type="text" style="width: 330px;" placeholder="请输入渠道号名称"></Input>
                                        <div class="desc_text">1-100个字符。用于协作沟通识别指定的渠道号。</div>
                                    </div>
                                </div>
                                <div class="item">
                                    <span class="text channel_name_text">渠道号：</span>
                                    <div class="right">
                                        <Input type="text" style="width: 330px;" placeholder="请输入渠道号"></Input>
                                        <div class="desc_text"> 1-100数字、字母、符号组合。</div>
                                    </div>
                                </div>
                                <div class="item">
                                    <span class="text">备注<em>(可选)</em>：</span>
                                    <div class="right">
                                        <Input type="textarea" :rows="4"  style="width: 330px; " placeholder="如有必要，请说明添加渠道号的场景与用途。"></Input>
                                        <div class="desc_text"> 1-500个字符。如：应用指定业务投放合作。</div>
                                    </div>
                                </div>
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
                <Page :total="totalPage" show-total show-elevator show-sizer  @on-change="handleCurrentChange"></Page>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'appInfo',
        data () {
            return{
                createChannelModel:false,
                updateChannelModel:false,
                stopChannelModel:false,
                batchImportModel:false,
                tableSize: 'large',
                searchOption:{
                    channelNumberName:"",
                    subordinateChannel:[]
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
                        key: 'name'
                    },
                    {
                        title: '渠道号',
                        key: 'channelNumber',
                    },
                    {
                        title: '备注',
                        key: 'remarks'
                    },
                    {
                        title: '所属渠道',
                        key: 'subordinateChannel'
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
                                        innerHTML:"停用"
                                    },
                                    style: {
                                        color:"#2d8cf0",
                                        cursor: "pointer"
                                    },
                                    on: {
                                        click: this.stop
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
            search(){
              console.log(this.searchOption.channelNumberName)
            },
            update(){
                this.updateChannelModel = true;
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
            getChannelNumberList(){
                    this.$get(`${this.$url}unified_account/getApp`, {}).then((res) => {
                        console.log(res)
                        let channelNumberList = [
                            {
                                "creator":"doggy.wang (王二狗)",
                                "createTime":"2018-11-11 09:08",
                                "id":2,
                                "img":"/dist/ece7b063418095d6997c2e3955ea0362.svg",
                                "name":"华为vfvfv",
                                "channelNumber":"HW0S0N84001",
                                "remarks":"vffvfvf",
                                "subordinateChannel":"华为"
                            },
                            {
                                "creator":"doggy.wang (王二狗)",
                                "createTime":"2018-11-11 09:08",
                                "id":2,
                                "img":"/dist/ece7b063418095d6997c2e3955ea0362.svg",
                                "name":"华为vfvfv",
                                "channelNumber":"HW0S0N84001",
                                "remarks":"vffvfvf",
                                "subordinateChannel":"中兴"
                            },
                            {
                                "creator":"doggy.wang (王二狗)",
                                "createTime":"2018-11-11 09:08",
                                "id":2,
                                "img":"/dist/ece7b063418095d6997c2e3955ea0362.svg",
                                "name":"华为vfvfv2222",
                                "channelNumber":"HW0S0N84001",
                                "remarks":"vffvfvf",
                                "subordinateChannel":"三星"
                            },
                            {
                                "creator":"doggy.wang (王二狗)",
                                "createTime":"2018-11-11 09:08",
                                "id":2,
                                "img":"/dist/ece7b063418095d6997c2e3955ea0362.svg",
                                "name":"华为vfvfvvfvfv222",
                                "channelNumber":"HW0S0N84001",
                                "remarks":"vffvfvf",
                                "subordinateChannel":"三星222"
                            },
                            {
                                "creator":"doggy.wang (王二狗222)",
                                "createTime":"2018-11-11 09:08",
                                "id":2,
                                "img":"/dist/ece7b063418095d6997c2e3955ea0362.svg",
                                "name":"华为vfvfv2vgbg",
                                "channelNumber":"HW0S0N84001",
                                "remarks":"vffvfvf",
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
            create(){
                this.$router.push({
                    name: "appCreate"
                });
            },
            handleCurrentChange(val) {
                this.curPage = val;
                this.getChannelNumberList();
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
