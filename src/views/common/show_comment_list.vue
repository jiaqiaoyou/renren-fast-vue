<template>
  <div v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中">
    <template v-if="!loading">
      <el-table :data="tableData" style="width: 100%">

        <el-table-column
          label="名称"
          prop="name">
        </el-table-column>

        <el-table-column
          label="创建者"
          prop="owner.name">
        </el-table-column>

        <el-table-column
          label="描述"
          prop="description">

        </el-table-column>

        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"/>
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleCheck(scope.$index, scope.row)">查看
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
  </div>
</template>

<script>
export default {
  created () {
    this.getClubList()
    this.reload()
  },
  data () {
    return {
      tableData: [],
      search: '',
      loading: true,
      offset: 1,
      limit: 10,
      total: undefined
    }
  },
  methods: {
    getClubList () {
      this.$http({
        url: this.$http.adornUrl('/club'),
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
          this.tableData = data.clubs
          this.total = data.total
        }
      })
    },
    handleJoin (index, row) {
      console.log(index, row)
    },
    handleCheck (index, row) {
      console.log(index, row)
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
