<template>
  <div v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中">
    <template v-if="!loading">

      <div>
        <el-form :inline="true" @keypress.enter="search">
          <el-form-item>
            <el-tag>标题</el-tag>
            <el-input v-model="search_name" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-tag>社团标签</el-tag>
            <br>
            <el-select v-model="search_club" placeholder="请选择" clearable>
              <el-option
                v-for="club in club_options"
                :key="club.id"
                :label="club.name"
                :value="club.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <br>
            <el-button @click="ambigious_search" type="danger">筛选查询</el-button>
          </el-form-item>
        </el-form>
      </div>

      <el-card>
        <el-table :data="tableData" style="width: 100%">

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
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="offset"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-card>

    </template>
  </div>
</template>

<script>
export default {
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getAllClubs()
      vm.getArticleList()
    })
  },
  created () {
    this.getAllClubs()
    this.getArticleList()
  },
  data () {
    return {
      search_value: '',
      search_name: '',
      search_owner: '',
      search_club: [],
      options: [{
        value: '1',
        label: '通过发布者名字'
      }, {
        value: '2',
        label: '通过文章标题'
      }, {
        value: '3',
        label: '通过社团标签'
      }],
      filter_by: '',
      tableData: [],
      search: '',
      loading: true,
      offset: 1,
      limit: 10,
      total: undefined,
      club_options: []
    }
  },
  methods: {
    getAllClubs () {
      this.$http({
        url: this.$http.adornUrl('/club'),
        method: 'get',
        params: this.$http.adornParams({
          'limit': 50,
          'offset': 1,
          'me': 0
        })
      }).then(({data}) => {
        if (data && data.code === 200) {
          this.loading = false
          this.club_options = data.clubs
          this.total = data.total
        }
      })
    },
    getArticleList () {
      this.$http({
        url: this.$http.adornUrl('/article'),
        method: 'get',
        params: this.$http.adornParams({
          'limit': this.limit,
          'offset': this.offset,
          'me': 1
        })
      }).then(({data}) => {
        console.log(data)
        if (data && data.code === 200) {
          console.log(data)
          this.loading = false
          this.tableData = data.articles
          this.total = data.total
        }
      })
    },
    ambigious_search () {
      console.log(this.search_club)
      this.$http({
        url: this.$http.adornUrl('/article'),
        method: 'get',
        params: this.$http.adornParams({
          'limit': this.limit,
          'offset': this.offset,
          'me': 1,
          'name': this.search_name,
          'owner': this.search_owner,
          'clubs': this.search_club
        })
      }).then(({data}) => {
        if (data && data.code === 200) {
          this.loading = false
          this.tableData = data.articles
          this.total = data.total
        }
      })
    },
    handleJoin (index, row) {
      console.log(index, row)
    },
    handleCheck (id) {
      this.$router.push('/show_article/' + id)
    },
    handleSizeChange (val) {
      this.limit = val
      this.offset = 1
      this.getClubList()
    },
    handleCurrentChange (val) {
      this.offset = val
      this.getClubList()
    }
  }
}
</script>

<style scoped>

</style>
