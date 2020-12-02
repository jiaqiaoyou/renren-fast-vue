<template>
  <div>
    <el-dialog
      title="提示"
      :visible.sync="success_visible"
      width="30%">
      <span>创建成功</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="click_success()">确定</el-button>
      </span>
    </el-dialog>


    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="submit()" status-icon>
      <el-form-item prop="name">
        <el-tag>社团名称</el-tag>
        <el-input placeholder="请输入社团名称"
                  v-model="dataForm.name"
                  clearable/>
      </el-form-item>

      <el-form-item prop="description">
        <el-tag>社团描述</el-tag>
        <div id="demo1"></div>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit()">编辑</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import wangEditor from 'wangeditor'

export default {
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getData()
    })
  },
  created () {
    this.configEditor()
    this.getData()
  },
  mounted () {
    this.configEditor()
    this.getData()
  },
  data () {
    return {
      editor: null,
      update: false,
      success_visible: false,
      dataForm: {
        name: '',
        description: '<h1>guga</h1>'
      },
      dataRule: {
        name: [
          {required: true, message: '社团名称不能为空', trigger: blur}
        ]
      }
    }
  },
  methods: {
    getData () {
      // eslint-disable-next-line camelcase
      let club_id = this.$route.params.id
      this.$http({
        // eslint-disable-next-line camelcase
        url: this.$http.adornUrl('/club/' + club_id),
        method: 'get'
      }).then(({data}) => {
        this.dataForm.name = data.name
        this.editor.txt.html(data.description)
      })
    },
    configEditor () {
      // eslint-disable-next-line new-cap
      const editor = new wangEditor(`#demo1`)
      editor.create()
      this.editor = editor
    },
    submit () {
      this.$refs['dataForm'].validate((valid) => {
        console.log(valid)
        if (valid) {
          this.$http({
            url: this.$http.adornUrl('/club/'+this.$route.params.id),
            method: 'put',
            data: this.$http.adornData({
              'name': this.dataForm.name,
              'description': this.editor.txt.html()
            })
          }).then(({data}) => {
            console.log(' then ')
            // console.log(data)
            if (data && data.code === 200) {
              this.$notify.success('编辑成功')
              this.$router.push('/show_club_list_me')
            } else {
              this.$message.error('error')
            }
          }).catch(({response}) => {
            if (response.status === 400 && response.data.message === 'club already exist') {
              this.$notify.error('社团名称重复')
            }
          })
        }
      })
    },
    click_success () {
      this.success_visible = false
      this.$router.push({name: 'show_club_list_me'})
    },
    valid () {
      this.$http({
        url: this.$http.adornUrl('/club/validate'),
        method: 'post',
        data: this.$http.adornData({
          'name': this.dataForm.name,
          'description': this.dataForm.description
        })
      }).then(({data}) => {
        if (data && data.code === 200 && data.exist === true) {
          this.$notify.error('社团名称重复')
        }
      })
    }

  }

}
</script>


<style>

</style>
