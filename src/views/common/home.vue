<template>
  <div v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中">
    <template v-if="!loading">
      <el-card>
        <h1>欢迎使用华南农业大学社团管理系统</h1>
        <h3>开发者：尤家荞</h3>
      </el-card>
      <br><br>
      <el-card>
        <span>为你推荐： <el-button type="text" @click="this.getRecommend">不喜欢？换一批</el-button></span>
        <div>
          <el-table :data="recommend" style="width: 100%">
            <el-table-column
              label="标题"
              prop="name">
            </el-table-column>

            <el-table-column
              label="发布者"
              prop="owner.name">
            </el-table-column>

            <el-table-column
              label="社团标签">

              <template slot-scope="prop">
                <el-tag
                  v-for="club in prop.row.tag_clubs"
                  :key="club.id"
                  :type="club.id"
                  effect="plain">

                  {{ club.name }}
                </el-tag>
              </template>
            </el-table-column>

            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleCheck(scope.row.id)">查看
                </el-button>
              </template>
            </el-table-column>

          </el-table>
        </div>
      </el-card>
    </template>
  </div>
</template>

<script>
export default {
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getRecommend()
    })
  },
  created () {
    this.getRecommend()
  },
  data () {
    return {
      recommend: []
    }
  },
  methods: {
    handleCheck (id) {
      this.$router.push('/show_article/' + id)
    },
    getRecommend () {
      this.$http({
        url: this.$http.adornUrl('/recommend'),
        method: 'get'
      }).then(({data}) => {
        this.recommend = data.articles
      })
    }
  }
}
</script>
