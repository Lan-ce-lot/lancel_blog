<template>
  <div class="page">
    <div class="wrapper">
      <h1 class="title">{{title}}</h1>
      <div class="some">
        <span class="date"><i class="iconfont icon-date"></i>{{date}}</span>
        <span class="category"><i class="iconfont icon-tubiao13"></i><span v-for="tag in category" :key="tag.id">{{tag}}</span></span>
      </div>
      <div class="detail" v-if="content">
          <mavon-editor v-model="content" default_open="preview" defaultOpen= "preview"  :toolbarsFlag="false" :subfield="false"
                        previewBackground="#222426"
          ></mavon-editor>
      </div>
    </div>
  </div>
</template>

<script>
import { webUrl } from "@/assets/js/public";
export default {
  data() {
    return {
      title: "",
      date: "",
      category: [],
      gist: "",
      content: "",
      articleId: null,
      prev: {},
      next: {}
    };
  },
  beforeCreate() {

  },
  mounted: function() {
    this.init();
  },
  methods: {
    init: function() {
      if (this.$route.params.id) {
        this.articleId = this.$route.params.id;
        console.log(this.$route.params.id);
        this.$axios
                .get("http://localhost:8089/api/detail/" + this.$route.params.id)
          .then(res => {
            let article = res.data;
            console.log(res.data);
            let {
              title,
              date,
              content,
              gist,
              category,
              prev,
              next
            } = res.data;

            this.title = title;
            this.date = date;
            this.content = content;
            this.gist = gist;
            this.category = category;
            this.prev = prev;
            this.next = next;
          });
      }
    },
    update: function() {
      this.init();
    },
    /**
     * 改变输入框状态
     * index评论序号
     * open 该评论下输入框开否
     * to_uid 该评论下目标用户id
     * to_uname 该评论下目标name
     */
    setTextarea: function(params) {
      let { index, open, to_uid, to_uname } = params;

    },
    toGo: function(id) {
      if (id) {
        this.$router.push({ path: `/detail/${id}` });
        // this.$router.push({ path: '/detail/'+id});

        // this.$router.push({ path: '/visiter'});
      }
    }
  },
};
</script>

<style>
</style>

<style lang="scss" scoped>
.wrapper {
  max-width: 1200px;
  margin: 0 200px;
  background: #f8f8fd;
  border-radius: 10px;
  /*box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4), 0 0 30px rgba(10, 10, 0, 0.1) inset;*/
  /*padding: 10px;*/
  & > .title {
    font-size: 16px;
    text-align: center;
    font-weight: 500;
  }
  & > .some {
    text-align: center;
    color: #999;
    margin: 10px 0;
    padding-bottom: 10px;

    .date {
      margin: 0 10px 0 0;
      vertical-align: middle;
    }
    .category {
      vertical-align: middle;
      & > span {
        margin-right: 5px;
      }
    }
  }
}

@media (min-width: 768px) {
  //pc

  .wrapper {
    /*padding: 20px;*/
    .detail{
      font-family: 'Cardo', serif;

    }

    & > .title {
      font-size: 28px;
    }
    & > .some {
      margin: 10px 0 40px;
      border-bottom: 1px solid #eee;
      padding-bottom: 20px;
      .date {
        margin: 0 20px 0 0;
      }
    }
  }
}
</style>
