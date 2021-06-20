<template>
    <div class="main">
        <vue-canvas-nest  :config="config"></vue-canvas-nest>
        <div class="content">
            <div class="login">
                <h4 class="title">博客后台登录</h4>
                <el-form
                        size="mini"
                        :model="ruleForm"
                        status-icon
                        :rules="rules"
                        ref="ruleForm"
                        label-width="40px"
                        class="demo-ruleForm"
                >
                    <el-form-item label="账号" prop="name">
                        <el-input type="text" v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input
                                type="password"
                                v-model="ruleForm.password"
                                autocomplete="off"
                                @keydown.native.enter.stop="passwordEnter"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')" round>登录</el-button>
                        <el-button @click="resetForm('ruleForm')" round>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>

        </div>


    </div>
</template>

<script>
    import {strToMd5} from "@/util/md5";
    import vueCanvasNest from 'vue-canvas-nest'
    export default {
        name: "Login",
        components: {vueCanvasNest,},
        data() {
            var validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入账号'));
                } else {
                    callback();
                }
            };
            var validatePassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };

            return {
                ruleForm: {
                    name: '',
                    password: '',
                },
                rules: {
                    // 验证账号
                    name: [
                        { validator: validateName, trigger: 'blur' }
                    ],

                    // 验证密码
                    password: [
                        { validator: validatePassword, trigger: 'blur' }
                    ],
                },
                config: {
                    color: '0,0,255',
                    opacity: 0.7,
                    zIndex: -2,
                    count: 99,
                },
            };
        },
        methods: {
            passwordEnter() {
                this.submitForm('ruleForm');
            },
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        // alert('submit!');
                        // this.ruleForm.passWord = strToMd5(this.ruleForm.passWord);
                        let {status, msg} = await this.$post('/api/admin/login', this.ruleForm);
                        if (status === 200) {
                            // alert("登录成功");
                            await this.$router.push('/admin');
                            // token
                            // localStorage sessionStorage
                            // sessionStorage.setItem('token', token);
                            // this.$setToken();
                            // let res = await this.$get('Room/List');
                            // console.log(res);
                        } else {
                            this.$notify({
                                title: '错误',
                                message: msg,
                                type: 'error'
                            })
                            // this.$message.error(msg);
                        }
                        console.log({status, msg});
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
        }
    }
</script>

<style scoped lang="scss">
    .main {
        width: 100vw;
        height: 100vh;
        position: relative;
        .content {
            background-color: transparent;
            position: absolute;
            width: 100vw;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            .login {
                width: 340px;
                /*height: 220px;*/
                border-radius: 10px;
                background: #ffffff;
                box-shadow:  5px 5px 9px #d4d4d4,
                -5px -5px 9px #ffffff;
                background: rgba(255, 255, 255, .8);
                /*border: 1px solid #000000;*/
                padding: 20px;
                .title {
                    font-size: 18px;
                    color: #000000;
                    text-align: center;
                    margin-bottom: 20px;
                }
            }
        }
    }
</style>