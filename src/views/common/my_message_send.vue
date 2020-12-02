<template>
  <div v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中">
    <template v-if="!loading">
      <el-table :data="tableData" style="width: 100%">

        <el-table-column
          label="标题"
          prop="name">
        </el-table-column>


        <el-table-column
          label="接收者"
          prop="receiver.name">
        </el-table-column>


        <el-table-column
          label="接收时间"
          prop="created">

        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleCheck(scope.row.id)">查看
            </el-button>
          </template>
        </el-table-column>

        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"/>
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
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getMessageList()
    })
  },
  created () {
    this.getMessageList()
  },
  data () {
    return {
      tableData: [
        {
          'name': 'a1',
          'owner': {'name': 'jiaqiao'},
          'tag_clubs': [{'id': 1, 'name': 'yclub'}, {'id': 2, 'name': 'cluby'}],
          'description': 'test'
        }
      ],
      search: '',
      loading: true,
      offset: 1,
      limit: 10,
      total: undefined,
    }
  },
  methods: {
    getMessageList () {
      this.$http({
        url: this.$http.adornUrl('/msg'),
        method: 'get',
        params: this.$http.adornParams({
          'limit': this.limit,
          'offset': this.offset,
          'send': 1
        })
      }).then(({data}) => {
        console.log(data)
        if (data && data.code === 200) {
          console.log(data)
          this.loading = false
          this.tableData = data.messages
          this.total = data.total
        }
      })
    },
    handleCheck (id) {
      this.$router.push('/show_message/' + id)
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
