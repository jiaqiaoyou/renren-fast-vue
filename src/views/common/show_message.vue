<template>
  <div v-loading.fullscreen.lock="this.loading" element-loading-text="拼命加载中">
    <template v-if="!this.loading">


      <div v-model="dataForm">
        <el-card>
          <h1>邮件主题：{{ dataForm.name }}</h1>
          <h3>发布者：{{ dataForm.sender.name }}</h3>
          <h3>发布时间：{{ dataForm.created }}</h3>
        </el-card>
      </div>
      <br><br>


      <div v-model="dataForm">
        <el-tag>正文</el-tag>
        <el-card>
          <p v-html="dataForm.context"></p>
        </el-card>
      </div>
      <br><br>

      <div>
        <el-tag>往来邮件</el-tag>
        <el-card>
          <div v-for="msg in origin">
            <el-card>
              <h1>主题：{{ msg.name }}</h1>
              <h2>发信人：{{ msg.sender.name }}</h2>
              <h2>接收人：{{ msg.receiver.name }}</h2>
              <h2>发送时间：{{ msg.created }}</h2>
              <div>
                <h2>正文：<br></h2>
                <p v-html="msg.context"></p>
              </div>
            </el-card>
            <br><br>
          </div>
        </el-card>
      </div>
      <br><br>

      <div v-model="dataForm">
        <el-tag>更多</el-tag>
        <el-card>
          <el-button type="primary"
                     size="mini"
                     @click="reply()">
            回复
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
      reply_visible: false,
      reply_name: '',
      reply_context: '',
      out_confirm: false,
      inClub: false,
      access: false,
      loading: false,
      id: undefined,
      success_visible: false,
      dataForm: {
        name: '',
        context: '',
        description: '',
        membered_clubs: [{'name': 'aclub'}, {'name': 'bclub'}]
      },
      origin: []
    }
  },
  methods: {
    getDataList () {
      this.id = this.$route.params.id
      this.$http({
        url: this.$http.adornUrl('/msg/' + this.id),
        method: 'get'
      }).then(({data}) => {
        if (data && data.code === 200) {
          this.dataForm = data
          this.loading = false

          // eslint-disable-next-line camelcase
          let source_id = data.source_id === 0 ? data.id : data.source_id
          this.$http({
            // eslint-disable-next-line camelcase
            url: this.$http.adornUrl('/msg/' + source_id),
            method: 'get'
          }).then(({data}) => {
            this.origin = data.children_messages
          })
        }
      })
    },
    submit () {
    },
    back () {
      this.$router.back()
    },
    handleEnter (id) {
      this.$router.push('/show_single_club/' + id)
    },
    reply () {
      this.$router.push('/create_message/?reply=1&&sid=' + this.dataForm.id)
    }
  }
}
</script>

<style scoped>

</style>
