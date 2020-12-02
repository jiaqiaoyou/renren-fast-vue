<template>
  <div>
    <el-form :model="dataForm" ref="dataForm" @keyup.enter.native="submit()" status-icon>
      <el-form-item prop="school_numbers">
        <el-tag>学号</el-tag>
        <el-input placeholder='请输入收信人学号, 多个学号用";"隔开 '
                  v-model="dataForm.school_numbers"
                  clearable/>
      </el-form-item>
      <el-form-item prop="name">
        <el-tag>标题</el-tag>
        <el-input placeholder="请输入邮件标题"
                  contentEditable="true"
                  v-model="dataForm.name"
                  clearable/>
      </el-form-item>

      <el-form-item prop="context">
        <el-tag>正文</el-tag>
        <div id="demo1"></div>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit()">发送</el-button>
      </el-form-item>

      <el-form-item v-if="this.reply_option">
        <el-tag>往来邮件</el-tag>
        <div v-for="msg in dataForm.origin">
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
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import wangEditor from 'wangeditor'

export default {
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getInfo()
    })
  },
  created () {
    this.configEditor()
    this.getInfo()
  },
  mounted () {
    this.configEditor()
    this.getInfo()
  },
  data () {
    return {
      editor: null,
      reply_option: false,
      sid: null,
      dataForm: {
        school_numbers: '',
        name: '',
        context: '',
        origin: {}
      }
    }
  },
  methods: {
    configEditor () {
      // eslint-disable-next-line new-cap
      const editor = new wangEditor(`#demo1`)
      editor.create()
      this.editor = editor
    },
    getInfo () {
      if (this.$route.query.school_numbers) {
        this.dataForm.school_numbers = this.$route.query.school_numbers
      }
      if (this.$route.query.name) {
        this.dataForm.name = this.$route.query.name
      }
      if (this.$route.query.sid) {
        this.sid = this.$route.query.sid
        let sid = this.$route.query.sid
        this.$http({
          url: this.$http.adornUrl('/msg/' + sid),
          method: 'get'
        }).then(({data}) => {
          this.reply_option = true
          this.dataForm.school_numbers = data.sender.school_number

          // eslint-disable-next-line camelcase
          let source_id = data.source_id
          // eslint-disable-next-line camelcase
          if (source_id === 0) {
            this.dataForm.name = '回复: ' + data.name
          } else {
            this.$http({
              // eslint-disable-next-line camelcase
              url: this.$http.adornUrl('/msg/' + source_id),
              method: 'get'
            }).then(({data}) => {
              this.dataForm.origin = data.children_messages
              this.dataForm.name = '回复: ' + data.name
            })
          }
        })
      }
    },
    submit () {
      this.$refs['dataForm'].validate((valid) => {
        console.log(valid)
        if (valid) {
          this.$http({
            url: this.$http.adornUrl('/msg'),
            method: 'post',
            data: this.$http.adornData({
              'school_numbers': this.dataForm.school_numbers,
              'name': this.dataForm.name,
              'context': this.editor.txt.html(),
              'sid': this.sid
            })
          }).then(({data}) => {
            if (data && data.code === 200) {
              this.$notify.success('创建成功')
              this.$router.push('/my_message_send')
            } else {
              this.$message.error('error')
            }
          })
        }
      })
    }
  }
}
</script>

<style>

</style>
