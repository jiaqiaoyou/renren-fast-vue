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

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleCheck(scope.row.id)">查看/修改
            </el-button>
          </template>
        </el-table-column>

        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="text"
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
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getClubList"></add-or-update>
  </div>
</template>

<script>
import AddOrUpdate from '../modules/sys/user-add-or-update'

export default {
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getClubList()
    })
  },
  created () {
    if (this.$store.state.clubs_update === undefined) {
      this.$store.state.clubs_update = 0
    }
    console.log(this.$store.state.clubs_update)
    this.getClubList()
    this.reload()
  },
  components: {
    AddOrUpdate
  },
  data () {
    return {
      addOrUpdateVisible: false,
      tableData: [],
      search: '',
      loading: true,
      offset: 1,
      limit: 10,
      total: undefined,
      AddOrUpdate: false
    }
  },
  comments: {
    AddOrUpdate
  },
  computed: {
    clubs_update () {
      return this.$store.state.clubs_update
    }
  },
  watch: {
    clubs_update: function (newVal, oldVal) {
      console.log('trigger')
      this.getClubList()
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
          'me': 0
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
