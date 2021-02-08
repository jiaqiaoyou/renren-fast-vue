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
            <br>
            <el-button @click="ambigious_search" type="danger">筛选查询</el-button>
          </el-form-item>
        </el-form>
      </div>

      <el-dialog
        title="提示"
        :visible.sync="delete_success_visible"
        width="30%">
        <span>解散成功</span>
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="afterDelete()">确定</el-button>
      </span>
      </el-dialog>


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
              @click="handleCheck(scope.row.id)">查看/编辑
            </el-button>

            <el-dialog
              title="提示"
              :visible.sync="delete_warning_visible"
              width="30%">
              <span>确定解散？</span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="delete_warning_visible=false">取消</el-button>
                <el-button type="primary" @click="handleDelete(scope.$index,scope.row)">确定</el-button>
              </span>
            </el-dialog>

            <el-button
              size="mini"
              type="danger"
              @click="delete_warning_visible=true">解散
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
      delete_success_visible: false,
      delete_warning_visible: false,
      tableData: [],
      search: '',
      loading: true,
      offset: 1,
      limit: 10,
      total: undefined,
      search_name: '',
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
          'search_owner': this.search_owner,
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
    handleDelete (index, row) {
      console.log(row)
      this.$http({
        url: this.$http.adornUrl('/club/' + row.id),
        method: 'delete',
        params: this.$http.adornParams({})
      }).then(({data}) => {
        if (data && data.code === 200) {
          console.log(data)
          this.delete_warning_visible = false
          this.getClubList()
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
