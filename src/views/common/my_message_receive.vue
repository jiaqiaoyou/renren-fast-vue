<template>
  <div v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中">
    <template v-if="!loading">
      <el-table :data="tableData" style="width: 100%">

        <el-table-column
          label="标题"
          prop="name">
        </el-table-column>

        <el-table-column
          label="发送者"
          prop="sender.name">
        </el-table-column>


        <el-table-column
          label="接收时间"
          prop="created">
        </el-table-column>

        <el-table-column
          label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.read" style="color: blue">已读</span>
            <span v-if="!scope.row.read" style="color: red">未读</span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleCheck(scope.row.id)">查看
            </el-button>
            <el-button v-if="!scope.row.read"
                       size="mini"
                       type="primary"
                       @click="handleRead(scope.row.id)">标为已读
            </el-button>
            <el-button v-else
                       size="mini"
                       type="danger"
                       @click="handleUnread(scope.row.id)">标为未读
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
  mounted () {
    this.timer = setInterval(this.get, 1000)
  },
  data () {
    return {
      timer: '',
      reply: 0,
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
      total: undefined
    }
  },
  methods: {
    get(){
      this.getMessageList()
    },
    handleRead (id) {
      this.$http({
        url: this.$http.adornUrl('/msg/' + id),
        method: 'put',
        data: this.$http.adornData({
          'read': 1
        })
      }).then(({data}) => {
        if (data && data.code === 200) {
          this.getMessageList()
        }
      })
    },
    handleUnread (id) {
      this.$http({
        url: this.$http.adornUrl('/msg/' + id),
        method: 'put',
        data: this.$http.adornData({
          'read': 0
        })
      }).then(({data}) => {
        if (data && data.code === 200) {
          this.getMessageList()
        }
      })
    },
    getMessageList () {
      this.reply = this.$route.query.reply
      this.$http({
        url: this.$http.adornUrl('/msg'),
        method: 'get',
        params: this.$http.adornParams({
          'limit': this.limit,
          'offset': this.offset,
          'receive': 1,
          'reply': this.reply
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
    handleJoin (index, row) {
      console.log(index, row)
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
