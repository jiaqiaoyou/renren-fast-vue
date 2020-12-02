<template>
  <div>
    <el-dialog
      title="评论"
      :visible.sync="edit_visible"
      width="70%">
      <el-input type="textarea" v-model="my_comment"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleEditComment()">确定</el-button>
      </span>
    </el-dialog>

    <div v-model=comments>
      <el-card class="header-box">
        <h1>标题：{{ article.name }}</h1>
        <h3>作者：{{ article.owner.name }}</h3>
        <h3>发布时间：{{ article.created }}</h3>
        <el-button type="text" size="medium" @click="back">返回文章</el-button>
        <el-button type="text" size="medium" @click="edit_visible=true">写评论</el-button>
      </el-card>
    </div>
    <br><br>
    <div>
      <el-tag>评论区</el-tag>
      <span class="el-table__empty-text" v-if="!comments[0]">暂无数据</span>
    </div>

    <div>
      <div v-for="comment in comments">
        <el-dialog
          title="评论"
          :visible.sync="reply_visible"
          width="30%">
          <el-input type="textarea" v-model="my_reply"></el-input>
          <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleReply(comment)">确定</el-button>
          </span>
        </el-dialog>

        <el-card class="box-card" style="background-color: #2a3746">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>{{ comment.publisher.name }}</span>
            </div>
            <div>
              <h2>{{ comment.context }}</h2>
              <el-button style="float: right" type="primary" size="mini"
                         @click="reply_to_id=comment.id" v-if="reply_to_id!=comment.id">
                写评论
              </el-button>
              <transition v-if="reply_to_id==comment.id">
                <div>
                  <el-input type="textarea" v-model="my_reply" clearable></el-input>

                  <el-button style="float: right" type="danger" size="mini"
                             @click="reply_to_id=undefined">收起
                  </el-button>

                  <el-button style="float: right" type="primary" size="mini"
                             @click="handleReply(comment)">回复
                  </el-button>
                </div>
              </transition>
            </div>
            <br><br>
          </el-card>

          <div v-for="review in comment.children_reviews">
            <el-card class="child-box-card">
              <div slot="header" class="clearfix">
                <span>{{ review.publisher.name }} 回复: {{ review.receiver.name }}</span>
              </div>
              <div class="clearfix">
                <h3>{{ review.context }}</h3>
                <el-button style="float: right" type="primary" size="mini"
                           @click="reply_to_id=review.id" v-if="reply_to_id!=review.id">
                  写评论
                </el-button>
                <transition v-if="reply_to_id==review.id">
                  <div>
                    <el-input type="textarea" v-model="my_reply" clearable></el-input>

                    <el-button style="float: right" type="danger" size="mini"
                               @click="reply_to_id=undefined">收起
                    </el-button>

                    <el-button style="float: right" type="primary" size="mini"
                               @click="handleReply(review)">回复
                    </el-button>
                  </div>
                </transition>
              </div>
            </el-card>
          </div>
        </el-card>
        <br><br>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getDataList()
    })
  },
  created () {
    this.getDataList()
  },
  data () {
    return {
      delete_confirm: false,
      reply_to_id: undefined,
      edit_visible: false,
      reply_visible: false,
      article: {},
      comments: [],
      my_comment: '',
      my_reply: ''
    }
  },
  methods: {
    // eslint-disable-next-line camelcase
    handleReply (reply_to) {
      console.log(reply_to)
      this.$http({
        url: this.$http.adornUrl('/review'),
        method: 'post',
        data: this.$http.adornData({
          'article_id': this.$route.params.id,
          'context': this.my_reply,
          'receiver_id': reply_to.publisher.id,
          'parent_review_id': reply_to.id
        })
      }).then(({data}) => {
        if (data && data.code === 200) {
          this.$notify.success('发布成功')
          this.getDataList()
          this.reply_to_id = undefined
          this.my_reply = ''
        }
      })
    },
    handleEditComment () {
      this.$http({
        url: this.$http.adornUrl('/review'),
        method: 'post',
        data: this.$http.adornData({
          'article_id': this.$route.params.id,
          'context': this.my_comment,
          'receiver_id': this.article.owner.id
        })
      }).then(({data}) => {
        if (data && data.code === 200) {
          this.$notify.success('发布成功')
          this.getDataList()
          this.edit_visible = false
          this.my_reply = ''
        }
      })
    },
    back () {
      this.$router.push('/show_article/' + this.$route.params.id)
    },
    getDataList () {
      this.$http({
        url: this.$http.adornUrl('/review'),
        method: 'get',
        params: this.$http.adornParams({
          'article_id': this.$route.params.id
        })
      }).then(({data}) => {
        if (data && data.code === 200) {
          this.article = data.article
          this.comments = data.reviews
        }
      })
    }
  }
}
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.box-card {
  width: 100%;
  border: 3px solid #2a3746;
}

.header-box {
  width: 100%;
  /*background-color: #82848a;*/
}

.child-box-card {
  width: 70%;
  float: right;
}
</style>
