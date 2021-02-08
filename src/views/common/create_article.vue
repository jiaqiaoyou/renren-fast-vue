<template>
  <div v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中">
    <div>
      <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="submit()" status-icon>

        <el-form-item>
          <el-tag>社团标签</el-tag>
          <br>
          <el-select v-model="clubs" multiple placeholder="请选择" filterable>
            <el-option
              v-for="club in club_options"
              :key="club.id"
              :label="club.name"
              :value="club.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="name">
          <el-tag>标题</el-tag>
          <el-input placeholder="请输入文章标题"
                    v-model="dataForm.name"
                    clearable/>
        </el-form-item>

        <el-form-item prop="context">
          <el-tag>正文</el-tag>
          <div id="demo1"></div>
        </el-form-item>


        <el-form-item>
          <el-button type="primary" @click="submit()">发布</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import wangEditor from 'wangeditor'

export default {
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getClubs()
    })
  },
  created () {
    this.configEditor()
    this.getClubs()
  },
  mounted () {
    this.configEditor()
    this.getClubs()
  },
  data () {
    return {
      editor: null,
      loading: true,
      dataForm: {},
      dataRule: {
        name: [
          {required: true, message: '文章标题不能为空', trigger: blur}
        ]
      },
      clubs: [],
      club_options: []
    }
  },
  methods: {
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
          console.log(this.club_options)
          console.log(this.clubs)
          this.$http({
            url: this.$http.adornUrl('/article'),
            method: 'post',
            data: this.$http.adornData({
              'name': this.dataForm.name,
              'context': this.editor.txt.html(),
              'tag_clubs_dict': this.clubs
            })
          }).then(({data}) => {
            if (data && data.code === 200) {
              this.dataForm = {}
              this.clubs = []
              this.editor.txt.html('')
              this.$notify.success('创建成功')
              this.$router.push('/show_article_list/?me=1')
            }
          })
        }
      })
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
        if (data && data.code === 200) {
          this.loading = false
          this.club_options = data.clubs
          this.total = data.total
        }
      })
    }
  }
}
</script>

