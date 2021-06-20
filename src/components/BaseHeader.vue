<template>
    <header>
        <div class="wrapper">
            <el-row>
                <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
                    <el-menu
                            :default-active="activeIndex"
                            class="el-menu-demo hidden-xs-only nav-pc"
                            mode="horizontal"
                            @select="handleSelect"
                            background-color="#2d2d2d"
                            text-color="#9d9d9d"
                            active-text-color="#fff"
                    >
                        <el-menu-item index="/home"><router-link to="/home">主页</router-link></el-menu-item>
                        <el-menu-item index="2"><router-link to="/tags">标签</router-link></el-menu-item>
                        <el-menu-item index="3"><router-link to="/about">关于</router-link></el-menu-item>
                        <el-menu-item index="4"><router-link to="/about">其他</router-link></el-menu-item>
                        <el-menu-item index="5">
                            <router-link to="/login" v-if="this.$route.path.indexOf('admin') === -1">登录</router-link>
                            <router-link to="/admin/articleList" v-else>列表</router-link>
                        </el-menu-item>
                    </el-menu>
                </el-col>
                <el-col :xs="4" :sm="0" :md="0" :lg="0" :xl="0" class="">
                    <div class="nav-mob">
                        <transition  name="slide-fade">
                            <div v-if="navMobile" class="content">
                                <ul  @click='slideUp'>
                                    <li><router-link to="/home">主页</router-link></li>
                                    <li><router-link to="/tags">标签</router-link></li>
                                    <li><router-link to="/about">关于</router-link></li>
                                    <li><router-link to="/about">其他</router-link></li>
                                    <li>
                                        <router-link to="/login" v-if="~this.$route.path.indexOf('admin')  === -1">登录</router-link>
                                        <router-link to="/admin/articleList" v-else>列表</router-link>
                                    </li>

                                </ul>
                            </div>
                        </transition >
                    </div>
                </el-col>
<!--                <el-col :xs="20" :sm="4" :md="4" :lg="4" :xl="4"><right-link></right-link></el-col>-->
            </el-row>
        </div>

    </header>




</template>

<script>
    import RightLink from "@/components/RightLink";
    import BaseFooter from "@/components/BaseFooter";
    export default {
        name: "BaseHeader",
        components: {
            RightLink,
        },
        data() {
            return {
                // activeIndex: '1',
                navMobile: false
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                this.$store.commit("changeIndex", key);
            },
            navToggle() {
                this.navMobile = !this.navMobile;
            },
            slideUp() {
                this.navMobile = !this.navMobile;
            }
        },
        // created(){
        //   console.log(this.$store.state.activeIndex)
        // },
        computed: {
            activeIndex() {
                return this.$store.state.activeIndex;
            },
            isSignIn() {
                return this.$store.state.isSignIn;
            },
            nickName() {
                return localStorage.getItem("nickName");
            },
            avatar() {
                return localStorage.getItem("avatar");
            }
        }
    }
</script>

<style lang="scss" scoped>

    header {
        background: #2d2d2d;
        color: #9d9d9d;
        box-shadow: 0 2px 4px 1px rgba(0, 0, 0, 0.5);
        margin-bottom: 10px;

        .nav-pc {
            border-bottom: none;
            float: left;
            > li {
                padding: 0;
                > a {
                    display: inline-block;
                    padding: 0 30px;
                    text-align: center;
                }
            }
        }
        .nav-mob {
            position: relative;
            z-index: 9999;
            i {
                font-size: 24px;
                position: absolute;
                right: 6px;
                top: 7px;
            }
            .avatar {
                width: 24px;
                height: 24px;
                border-radius: 50%;
                border: 1px solid #9d9d9d;
                position: absolute;
                right: 7px;
                top: 7px;
            }
            .content {
                ul {
                    position: absolute;
                    right: 5px;
                    top: 40px;
                    background: #2d2d2d;
                    color: #9d9d9d;
                    border-radius: 0 0 4px 4px;
                    box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.5);
                    li {
                        list-style-type: none;
                        padding: 6px 10px;
                        text-align: center;
                        border-bottom: 1px solid #696464;
                    }
                }
            }
        }
    }
    @media (min-width: 768px) {
        //pc
        header {
            margin-bottom: 20px;
            .logo {
                line-height: 60px;
                font-size: 18px;
            }
        }
        .meBtnOff {
            transition: all 0.3s;
            background: #3b99fc !important;
            color: #fff !important;
            line-height: 60px;
            vertical-align: top;
        }
        .meBtnOn {
            transition: all 0.3s;
            background: #3b99fc !important;
            color: #fff !important;
            line-height: 58px;
            vertical-align: top;
        }
    }
</style>