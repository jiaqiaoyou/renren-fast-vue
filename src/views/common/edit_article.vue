<template>
  <div v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中">
    <div>
      <el-form>
        <el-form-item @keyup.enter.native="submit">
          <el-tag>标题</el-tag>
          <el-input v-model="dataForm.name" @change="this.$forceUpdate"/>
        </el-form-item>

        <el-form-item>
          <el-tag>正文</el-tag>
          <div id="demo1"></div>
        </el-form-item>

        <el-form-item>
          <el-tag>社团标签</el-tag>
          <br>
          <el-select v-model="clubs" multiple placeholder="请选择">
            <el-option
              v-for="club in club_options"
              :key="club.id"
              :label="club.name"
              :value="club.id">
            </el-option>
          </el-select>
        </el-form-item>


        <el-form-item>
          <el-button type="primary" @click="submit()">编辑</el-button>
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
      vm.getData()
    })
  },
  created () {
    this.configEditor()
    this.getClubs()
    this.getData()
  },
  mounted () {
    this.configEditor()
    this.getClubs()
    this.getData()
  },
  data () {
    return {
      editor: null,
      loading: true,
      dataForm: {
        'name': ''
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
      this.$http({
        url: this.$http.adornUrl('/article/' + this.$route.params.id),
        method: 'put',
        data: this.$http.adornData({
          'name': this.dataForm.name,
          'context': this.editor.txt.html(),
          'tag_clubs_dict': this.clubs
        })
      }).then(({data}) => {
        if (data && data.code === 200) {
          this.$notify.success('编辑成功')
          this.$router.replace('/show_article/' + this.$route.params.id)
        }
      })
    },
    getData () {
      this.$http({
        url: this.$http.adornUrl('/article/' + this.$route.params.id),
        method: 'get'
      }).then(({data}) => {
        // eslint-disable-next-line camelcase
        let tag_ids = []
        for (let i = 0; i < data.tag_clubs.length; i++) {
          tag_ids.push(data.tag_clubs[i].id)
        }
        this.dataForm.name = data.name
        this.editor.txt.html(data.context)
        // eslint-disable-next-line camelcase
        this.clubs = tag_ids
        this.loading = false
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
          this.club_options = data.clubs
        }
      })
    }
  }
}
</script>

