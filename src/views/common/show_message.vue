<template>
  <div v-loading.fullscreen.lock="this.loading" element-loading-text="拼命加载中">
    <template v-if="!this.loading">

      <el-dialog
        title="拒绝理由"
        :visible.sync="this.refuse_reson"
        width="30%">
        <el-input type="textarea" v-model="reason" :autosize="{minRows:5,maxRows:10}"></el-input>
        <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleRefuse">确定</el-button>
                <el-button type="danger" @click="refuse_reson=false">取消</el-button>
        </span>
      </el-dialog>

      <div v-model="dataForm">
        <el-card>
          <h1>邮件主题：{{ dataForm.name }}</h1>
          <h3>发布者：{{ dataForm.sender.name }}</h3>
          <h3>发布时间：{{ dataForm.created }}</h3>
          <h3>状态：
            <span v-if="this.dataForm.read" style="color: blue">已读</span>
            <span v-else style="color: red">未读</span>
          </h3>
        </el-card>
      </div>
      <br><br>

      <el-alert v-if="type_join" title="这是一个社团加入申请" type="info" center show-icon></el-alert>

      <div v-model="dataForm">
        <br>
        <el-tag v-if="!type_join">正文</el-tag>
        <el-tag v-if="type_join">申请理由</el-tag>
        <el-card>
          <p v-html="dataForm.context"></p>
        </el-card>
      </div>

      <div v-if="this.dataForm.source_id!==0">
        <br><br>
        <el-tag>往来邮件</el-tag>
        <el-card style="background-color: #2a3746">
          <el-card>
            <h1>主题：{{ origin.name }}</h1>
            <h2>发信人：{{ origin.sender.name }}</h2>
            <h2>接收人：{{ origin.receiver.name }}</h2>
            <h2>发送时间：{{ origin.created }}</h2>
            <div>
              <h2>正文：<br></h2>
              <p v-html="origin.context"></p>
            </div>
          </el-card>
          <br><br>
          <div v-for="msg in origin.children_messages">
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

      <div v-if="type_join&&(owning||managing)">
        <el-tag>操作</el-tag>
        <el-card>
          <el-button v-if="!this.dataForm.read"
                     size="mini"
                     type="primary"
                     @click="handleRead()">标为已读
          </el-button>
          <el-button v-else
                     size="mini"
                     type="danger"
                     @click="handleUnread()">标为未读
          </el-button>
          <el-button type="primary"
                     size="mini"
                     @click="handleEnter">
            同意
          </el-button>

          <el-button type="danger"
                     size="mini"
                     @click="refuse_reson=true">
            拒绝
          </el-button>
        </el-card>
      </div>

      <div v-model="dataForm" v-if="!type_join||(!membering&&!owning&&!managing)">
        <el-tag>更多</el-tag>
        <el-card>
          <el-button v-if="!this.dataForm.read"
                     size="mini"
                     type="primary"
                     @click="handleRead()">标为已读
          </el-button>
          <el-button v-else
                     size="mini"
                     type="danger"
                     @click="handleUnread()">标为未读
          </el-button>
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
      origin: [],
      type_join: false,
      authorize_to_join: false,
      owning: null,
      managing: null,
      membering: null,
      refuse_reson: false,
      reason: ''
    }
  },
  methods: {
    handleRead () {
      this.$http({
        url: this.$http.adornUrl('/msg/' + this.dataForm.id),
        method: 'put',
        data: this.$http.adornData({
          'read': 1
        })
      }).then(({data}) => {
        if (data && data.code === 200) {
          this.getDataList()
        }
      })
    },
    handleUnread () {
      this.$http({
        url: this.$http.adornUrl('/msg/' + this.dataForm.id),
        method: 'put',
        data: this.$http.adornData({
          'read': 0
        })
      }).then(({data}) => {
        if (data && data.code === 200) {
          this.getDataList()
        }
      })
    },
    getDataList () {
      this.id = this.$route.params.id
      this.$http({
        url: this.$http.adornUrl('/msg/' + this.id),
        method: 'get'
      }).then(({data}) => {
        if (data && data.code === 200) {
          this.dataForm = data
          this.loading = false
          this.type_join = (!!data.join_id)
          // eslint-disable-next-line camelcase
          let source_id = data.source_id === 0 ? data.id : data.source_id
          this.$http({
            // eslint-disable-next-line camelcase
            url: this.$http.adornUrl('/msg/' + source_id),
            method: 'get'
          }).then(({data}) => {
            this.origin = data
          })
          if (this.type_join) {
            this.$http({
              url: this.$http.adornUrl('/club/' + this.dataForm.join_id),
              method: 'get',
              params: this.$http.adornParams({
                'role_info': 1
              })
            }).then(({data}) => {
              this.owning = data.owning
              this.managing = data.managing
              this.membering = data.membering
            })
          }
        }
      })
    },
    submit () {
    },
    back () {
      this.$router.back()
    },
    handleEnter () {
      this.$http({
        url: this.$http.adornUrl('/club/' + this.dataForm.join_id),
        method: 'put',
        params: this.$http.adornParams({
          'join': 1,
          'join_id': this.dataForm.sender.id
        })
      }).then(({data}) => {
        if (data && data.code === 200) {
          this.$http({
            url: this.$http.adornUrl('/msg'),
            method: 'post',
            data: this.$http.adornData({
              'school_numbers': this.dataForm.sender.school_number,
              'name': '你的申请已通过',
              'context': '你的申请已通过，欢迎加入^_^',
              'sid': this.id
            })
          }).then(({data}) => {
            if (data && data.code === 200) {
              this.$notify.success('操作成功')
            }
          })
        }
      })
    },
    handleRefuse () {
      this.$http({
        url: this.$http.adornUrl('/msg'),
        method: 'post',
        data: this.$http.adornData({
          'school_numbers': this.dataForm.sender.school_number,
          'name': '你的申请被拒绝',
          'context': this.reason,
          'sid': this.id
        })
      }).then(({data}) => {
        if (data && data.code === 200) {
          this.$notify.success('操作成功')
          this.refuse_reson = false
        }
      })
    },
    reply () {
      this.$router.push('/create_message/?reply=1&&sid=' + this.dataForm.id)
    }
  }
}
</script>

<style scoped>

</style>
