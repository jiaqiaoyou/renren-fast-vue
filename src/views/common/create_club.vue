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
        <el-input placeholder="请输入社团描述"
                  v-model="dataForm.description"
                  type="textarea"
                  :autosize="{minRows:15,maxRows:15}"
                  clearable/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit()">创建</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
export default {
  created () {
    console.log(this.$store.state.clubs_update)
  },
  data () {
    return {
      update: false,
      success_visible: false,
      dataForm: {
        name: '',
        description: ''
      },
      dataRule: {
        name: [
          {required: true, message: '社团名称不能为空', trigger: blur}
        ]
      }
    }
  },
  methods: {
    submit () {
      this.$refs['dataForm'].validate((valid) => {
        console.log(valid)
        if (valid) {
          this.$http({
            url: this.$http.adornUrl('/club'),
            method: 'post',
            data: this.$http.adornData({
              'name': this.dataForm.name,
              'description': this.dataForm.description
            })
          }).then(({data}) => {
            console.log(' then ')
            // console.log(data)
            if (data && data.code === 200) {
              this.success_visible = true
              this.update = !this.update
              this.$store.state.clubs_update++
              console.log(this.$store.state.clubs_update)
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
      this.reload()
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
    },

    setup (editor) {
      console.log(editor)
    }
  }
}
</script>


<style>

</style>
