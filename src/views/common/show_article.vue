<template>
  <div v-loading.fullscreen.lock="this.loading" element-loading-text="拼命加载中">
    <template v-if="!this.loading">

      <el-dialog
        title="警告"
        :visible.sync="delete_confirm"
        width="30%">
        <span>确定删除？</span>
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleDelete()">确定</el-button>
          <el-button type="danger" @click="delete_confirm=false">取消</el-button>
      </span>
      </el-dialog>

      <div v-model="dataForm">
        <el-card>
          <h1>文章标题：{{ dataForm.name }}</h1>
          <h3>发布者：{{ dataForm.owner.name }}</h3>
          <h3>发布时间：{{ dataForm.created }}</h3>
          <h3>最后编辑于：{{ dataForm.updated }}</h3>
          <h3>社团标签：</h3>
          <el-tag
            v-for="club in dataForm.tag_clubs"
            :key="club.id"
            :type="club.id"
            effect="plain">

            {{ club.name }}
          </el-tag>
        </el-card>
      </div>
      <br><br>

      <div v-model="dataForm">
        <el-tag>文章正文</el-tag>
        <el-card>
          <p v-html="dataForm.context"></p>
        </el-card>
      </div>
      <br><br>

      <div v-model="dataForm">
        <el-tag>更多</el-tag>
        <el-card>
          <el-button type="primary"
                     size="mini"
                     @click="handleEdit">
            编辑文章
          </el-button>
          <el-button type="danger"
                     size="mini"
                     @click="delete_confirm=true">
            删除文章
          </el-button>
          <el-button type="primary"
                     size="mini"
                     @click="handleEnterComment">
            评论区
          </el-button>

          <el-button type="primary"
                     size="mini"
                     @click="back">
            返回
          </el-button>
        </el-card>
      </div>
    </template>
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
      out_confirm: false,
      loading: false,
      id: undefined,
      dataForm: {}
    }
  },
  methods: {
    handleEdit () {
      this.$router.push('/edit_article/' + this.$route.params.id)
    },
    handleDelete () {
      this.$http({
        url: this.$http.adornUrl('/article/' + this.$route.params.id),
        method: 'delete'
      }).then(({data}) => {
        if (data && data.code === 200) {
          this.$router.push('/show_article_list/?me=1')
          this.delete_confirm = false
        }
      })
    },
    getDataList () {
      this.id = this.$route.params.id
      this.$http({
        url: this.$http.adornUrl('/article/' + this.id),
        method: 'get'
      }).then(({data}) => {
        if (data && data.code === 200) {
          this.dataForm = data
          this.loading = false
        }
      })
    },
    back () {
      this.$router.back()
    },
    handleEnterComment () {
      this.$router.push('/comments_zone/' + this.$route.params.id)
    }
  }
}
</script>

<style scoped>

</style>
