<template>
  <div v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中">
    <template v-if="!loading">
      <div>
        <el-form :inline="true" @keypress.enter="ambigious_search">
          <el-form-item>
            <el-tag>社团名称</el-tag>
            <el-input v-model="search_club" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-tag>创建者</el-tag>
            <el-input v-model="search_owner" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <br>
            <el-button @click="ambigious_search" type="danger">筛选查询</el-button>
          </el-form-item>
        </el-form>
      </div>

      <el-table :data="tableData" style="width: 100%">

        <el-table-column
          label="名称"
          prop="name">
        </el-table-column>

        <el-table-column
          label="创建者"
          prop="owner.name">
        </el-table-column>

        <el-table-column label="操作">
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
    </template>
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getClubList"></add-or-update>
  </div>
</template>

<script>
export default {
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getClubList()
    })
  },
  created () {
    this.getClubList()
  },
  data () {
    return {
      tableData: [],
      search: '',
      loading: true,
      offset: 1,
      limit: 10,
      total: undefined,
      search_owner: '',
      search_club: ''
    }
  },
  methods: {
    ambigious_search () {
      this.$http({
        url: this.$http.adornUrl('/club'),
        method: 'get',
        params: this.$http.adornParams({
          'search_club': this.search_club,
          'search_owner': this.search_owner
        })
      }).then(({data}) => {
        console.log(data)
        if (data && data.code === 200) {
          console.log(data)
          this.loading = false
          this.tableData = data.clubs
          this.total = data.total
        }
      })
    },
    getClubList () {
      this.$http({
        url: this.$http.adornUrl('/club'),
        method: 'get',
        params: this.$http.adornParams({
          'limit': this.limit,
          'offset': this.offset,
          'me': this.$route.query.me ? 1 : 0
        })
      }).then(({data}) => {
        console.log(data)
        if (data && data.code === 200) {
          console.log(data)
          this.loading = false
          this.tableData = data.clubs
          this.total = data.total
        }
      })
    },
    handleCheck (id) {
      this.$router.push('/show_single_club/' + id)
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
