<template>
    <div class="main">
        <h2>文章列表</h2>
        <div class="my-table">
<!--            .filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))-->
            <el-table
                    :data="articleList.filter(data => !search || data.title.includes(search.toLowerCase()))"
                    style="width: 100%"
                    border
                    stripe>
                <el-table-column
                        label=""
                        type="index">
                </el-table-column>
                <el-table-column
                        label="文章名"
                        prop="title">
                </el-table-column>

                <el-table-column
                        label="日期"
                        prop="date">
                </el-table-column>
                <el-table-column
                        label="分类"
                        >
                    <template slot-scope="scope" v-if="scope.row.label">
                        <span v-if="scope.row.label.length === 0">未分类</span>
                        <el-tag v-else class="tag_margin" type="primary" effect="light" v-for="tag in scope.row.label" :key="tag.id">{{ tag }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        width="210"
                        label="操作"
                        >
                    <template slot="header" slot-scope="scope">
                        <el-input
                                v-model="search"
                                size="mini"
                                placeholder="输入关键字搜索"/>
                    </template>
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                round
                                type="success"
                                @click="handleLook(scope.$index, scope.row)">查看</el-button>
                        <el-button
                                size="mini"
                                round
                                type="primary"
                                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                                size="mini"
                                round
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import BaseHeader from "@/components/BaseHeader";
    import BaseFooter from "@/components/BaseFooter";
    import Pagination from "@/components/Pagination";
    import { webUrl } from "@/assets/js/public.js";
    export default {
        name: "ArticleList",
        data() {
            return {
                articleList: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                },],
                search: ''
            }
        },
        beforeCreate: function() {},
        mounted: function() {
            // 获取文章列表
            // console.log(this.$route.path)
            // str.indexOf('admin')
            this.$axios.get(webUrl + "articleList").then(res => {
                if (res) {
                    console.log(res.data);
                    this.articleList = res.data.reverse();
                }
            });
        },
        methods: {
            async getTableData() {
                let res = await this.$get('/api/articleList');
                console.log(res);
                this.tableData = res;
            },
            handleLook(index, row) {
                //查看
                let id = row._id;
                // window.open("/detail/" + id);
                this.$router.push("/detail/" + id);
            },
            handleEdit(index, row) {
                console.log(index, row);
                let id = row._id;
                this.$router.push('/admin/articleEdit/' + id);
                // window.open('/admin/articleEdit');
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
        },
        components: {
            BaseHeader,
            BaseFooter,
            Pagination
            // SideBar
        },
    }
</script>

<style scoped lang="scss">
    .main {
        padding: 0 80px;
        h2 {
            margin: 20px 5px;
        }
        .tag_margin {
            margin: 2px 5px;
            /*border-radius: 20px;*/
            min-width: 60px;
            text-align: center;
            /*min-block-size: 20px;*/
        }
    }

</style>