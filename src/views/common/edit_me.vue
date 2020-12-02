<template>
  <div v-loading.fullscreen.lock="this.loading" element-loading-text="拼命加载中">
    <template v-if="!this.loading">

      <el-form :model="dataForm" :rules="dataRule" ref="dataForm">
        <el-form-item prop="school_number">
          <el-tag>学号</el-tag>
          <el-input v-model="dataForm.school_number"
                    readonly
                    clearable/>
        </el-form-item>

        <el-form-item prop="name">
          <el-tag>用户名</el-tag>
          <el-input v-model="dataForm.name"
                    readonly
                    clearable/>
        </el-form-item>

        <el-form-item prop="email">
          <el-tag>邮箱</el-tag>
          <el-input v-model="dataForm.email"
                    clearable/>
        </el-form-item>

        <el-form-item prop="description">
          <el-tag>个人描述</el-tag>
          <div id="demo1"></div>
        </el-form-item>


        <el-form-item>
          <el-button type="danger"
                     size="mini">
            修改密码
          </el-button>
        </el-form-item>

        <el-form-item>
          <el-button type="primary"
                     size="mini"
                     @click="save">
            保存
          </el-button>
          <el-button type="primary"
                     size="mini"
                     @click="back">
            返回
          </el-button>
        </el-form-item>
      </el-form>
    </template>
  </div>
</template>

<script>
import wangEditor from 'wangeditor'

export default {
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.configEditor()
      vm.getDataList()
    })
  },
  created () {
    this.configEditor()
    this.getDataList()
  },
  mounted () {
    this.configEditor()
    this.getDataList()
  },
  data () {
    return {
      editor: null,
      out_confirm: false,
      inClub: false,
      access: false,
      loading: false,
      id: undefined,
      success_visible: false,
      dataForm: {}
    }
  },
  methods: {
    configEditor () {
      // eslint-disable-next-line new-cap
      const editor = new wangEditor(`#demo1`)
      editor.create()
      this.editor = editor
    },
    getDataList () {
      this.id = this.$route.params.id
      this.$http({
        url: this.$http.adornUrl('/user/me'),
        method: 'get'
      }).then(({data}) => {
        if (data && data.code === 200) {
          this.dataForm = data
          this.editor.txt.html(this.dataForm.description)
          this.loading = false
        }
      })
    },
    submit () {
    },
    save () {
      this.$http({
        url: this.$http.adornUrl('/user/' + this.dataForm.id),
        method: 'put',
        data: this.$http.adornData(
          {
            'name': this.dataForm.name,
            'description': this.editor.txt.html(),
            'email': this.dataForm.email
          }
        )
      }).then(({data}) => {
        if (data && data.code === 200) {
          this.$notify.success('信息已保存')
          this.getDataList()
        }
      })
    },
    back () {
      this.$router.back()
    }
  }
}
</script>

<style scoped>

</style>
