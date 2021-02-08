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
                    readonly
                    clearable/>
        </el-form-item>

        <el-form-item prop="description">
          <el-tag>个人描述</el-tag>
          <p v-html="dataForm.description"></p>
        </el-form-item>

        <el-form-item prop="membered_clubs">
          <el-tag>加入的社团</el-tag>
          <span><br></span>
          <el-button
            :key="club"
            v-for="club in dataForm.membered_clubs"
            @click="handleEnter(club.id)">
            {{ club.name }}
          </el-button>
        </el-form-item>


        <el-form-item>
          <el-tag>其他信息</el-tag>
          <span><br></span>
          <el-button type="text"
                     size="medium"
                     @click="handleArticle">
            发布的文章
          </el-button>
        </el-form-item>

        <el-form-item>
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
      out_confirm: false,
      inClub: false,
      access: false,
      loading: false,
      id: undefined,
      success_visible: false,
      dataForm: {
        name: '',
        description: '',
        membered_clubs: [{'name': 'aclub'}, {'name': 'bclub'}]
      }
    }
  },
  methods: {
    getDataList () {
      this.id = this.$route.params.id
      this.$http({
        url: this.$http.adornUrl('/user/me'),
        method: 'get'
      }).then(({data}) => {
        if (data && data.code === 200) {
          this.dataForm = data
          this.loading = false
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
    handleArticle () {
      this.$router.push('/show_article_list/?owner='+this.dataForm.name)
    }
  }
}
</script>

<style scoped>

</style>
