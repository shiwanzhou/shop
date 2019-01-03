<style lang="less" scoped>

</style>

<template>
    <div class="appInfo userLogin">
        <div class="title" id="aaa">用户登录</div>
        <div class="desc">仅用于alpha0.5版本测试客户端登录DEMO。</div>
        <div class="border"></div>
        <!--用户登录信息详情-->
        <Form class="form" :model="formItem" :label-width="80">
            <FormItem label="游客登录">
                <i-switch v-model="formItem.visitorLogin" size="large" @on-change="changeVisitorLogin">
                    <span slot="open">开</span>
                    <span slot="close">关</span>
                </i-switch>
            </FormItem>
            <FormItem label="帐号登录">
                <i-switch v-model="formItem.accountLogin" size="large" @on-change="changeAccountLogin">
                    <span slot="open">开</span>
                    <span slot="close">关</span>
                </i-switch>
            </FormItem>
        </Form>
    </div>
</template>

<script>

    export default {
        name: 'userLogin',
        data () {
            return {
                formItem:{
                    visitorLogin:false,
                    accountLogin:true
                }
            };
        },
        mounted(){
            console.log($)
            console.log($("#aaa").text())
            this.$get(`${this.$url}unified_account/getApp`, {}).then((res) => {
                console.log(res)
                let formItem = {
                    visitorLogin:true,
                    accountLogin:true
                }
                this.formItem = formItem;
            }).catch((err) => {
                this.$Message.error('This is an error tip');
            });
        },
        methods: {
            changeVisitorLogin(status){
                console.log(999)
                console.log(status)
              /*  var param = {
                    status:status
                }*/
             /*   this.$post(`${this.$url}unified_account/getApp`, param).then((res) => {
                    console.log(res)
                }).catch((err) => {
                    this.$Message.error('设置失败！');
                });*/
               var url =  this.$url+"channel/createBelongChannel"
                var param = {
                   name:"111",
                   remark:"2334g"
                }
                $.ajax({
                    url: url,
                    type: "POST",
                    datType: "JSON",
                    contentType: "application/json",
                    data: JSON.stringify(param),
                    success: function(data){
                      console.log(data)
                    },
                    error:function (XMLHttpRequest, textStatus, errorThrown) {
                    }
                });
            },
            changeAccountLogin(status){
                console.log(999)
                console.log(status)
                this.formItem.visitorLogin = !status;
                var param = {
                    status:status
                }
                this.$post(`${this.$url}unified_account/getApp`, param).then((res) => {
                    console.log(res)
                }).catch((err) => {
                    this.$Message.error('设置失败！');
                });
            }
        }
    };
</script>

<style>

</style>
