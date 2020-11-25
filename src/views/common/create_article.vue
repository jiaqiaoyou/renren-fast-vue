<template>
  <div v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中">
    <template v-if="!loading">
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
          <el-tag>标题</el-tag>
          <el-input placeholder="请输入文章标题"
                    v-model="dataForm.name"
                    clearable/>
        </el-form-item>

        <el-form-item prop="context">
          <el-tag>正文</el-tag>
          <el-input placeholder="请输入文章正文"
                    v-model="dataForm.description"
                    type="textarea"
                    :autosize="{minRows:17,maxRows:100}"
                    clearable/>
        </el-form-item>

        <el-form-item>
          <el-tag>社团标签</el-tag>
          <el-checkbox-group v-model="dataForm.clubs" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="club in club_options" :label="club.id" :key="club.id">{{ club.name }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submit()">发布</el-button>
        </el-form-item>
      </el-form>
    </template>
  </div>
</template>

<script>
export default {
  created () {
    this.getClubs()
    this.reload()
  },
  data () {
    return {
      update: false,
      success_visible: false,
      loading: true,
      dataForm: {
        name: '',
        context: '',
        clubs: []
      },
      dataRule: {
        name: [
          {required: true, message: '文章标题不能为空', trigger: blur}
        ]
      },
      club_options: [{'id': 10, 'name': 'a'}, {'id': 2, 'name': 'b'}]
    }
  },
  methods: {
    handleCheckedCitiesChange (value) {
      console.log(this.dataForm.clubs)
    },
    submit () {
      this.$refs['dataForm'].validate((valid) => {
        console.log(valid)
        if (valid) {
          this.$http({
            url: this.$http.adornUrl('/article'),
            method: 'post',
            data: this.$http.adornData({
              'name': this.dataForm.name,
              'context': this.dataForm.context,
              'tag_clubs_dict': this.dataForm.clubs
            })
          }).then(({data}) => {
            if (data && data.code === 200) {
              this.success_visible = true
            } else {
              this.$message.error('error')
            }
          })
        }
      })
    },
    click_success () {
      this.success_visible = false
      this.$router.push({name: 'show_article_list_me'})
      this.reload()
    },
    getClubs () {
      this.$http({
        url: this.$http.adornUrl('/club'),
        method: 'get',
        params: this.$http.adornParams({
          'limit': 50,
          'offset': 1,
          'me': 1
        })
      }).then(({data}) => {
        console.log(data)
        if (data && data.code === 200) {
          console.log(data)
          this.loading = false
          this.club_options = data.clubs
          this.total = data.total
        }
      })
    }
  }
}
</script>

<style>

</style>
