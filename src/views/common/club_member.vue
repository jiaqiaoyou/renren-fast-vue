<template>
  <div>
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.name" placeholder="用户名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button type="danger" @click="kickHandle()" :disabled="dataListSelections.length <= 0">批量踢出</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        prop="school_number"
        header-align="center"
        align="center"
        width="80"
        label="学号">
      </el-table-column>
      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        label="用户名">
      </el-table-column>
      <el-table-column
        prop="email"
        header-align="center"
        align="center"
        label="邮箱">
      </el-table-column>
      <el-table-column
        prop="phone"
        header-align="center"
        align="center"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="club_role"
        header-align="center"
        align="center"
        label="角色">
      </el-table-column>

      <el-table-column
        label="操作">

        <template slot-scope="scope">

          <el-button type="text" size="small"
                     @click="checkUserHandle(scope.row.id)">
            查看
          </el-button>

          <el-button type="text" size="small"
                     @click="sendMessageHandle(scope.row.school_number)">
            发消息
          </el-button>

          <el-dialog
            title="提示"
            :visible.sync="out_confirm"
            width="30%">
            <span>确定踢出？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="out_confirm=false">取消</el-button>
                <el-button type="primary" @click="kickHandle(scope.row.id)">确定</el-button>
              </span>
          </el-dialog>

          <el-button type="text"
                     size="small"
                     @click="out_confirm=true">
            踢出
          </el-button>


        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>

    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
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
      loading: true,
      out_confirm: false,
      id: undefined,
      editor: null,
      dataForm: {
        userName: ''
      },
      dataList: [{'id': 1, 'school_number': '1', 'name': 'yjq', 'email': '1.com', 'phone': '110'}],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false
    }
  },
  activated () {
    this.getDataList()
  },
  methods: {
    // 获取数据列表
    getDataList () {
      this.id = this.$route.params.id
      this.$http({
        url: this.$http.adornUrl('/club/' + this.id),
        method: 'get'
      }).then(({data}) => {
        if (data && data.code === 200) {
          this.dataList = data.members
          this.loading = false
        }
      })
    },
    // 每页数
    sizeChangeHandle (val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList()
    },
    // 当前页
    currentChangeHandle (val) {
      this.pageIndex = val
      this.getDataList()
    },
    // 多选
    selectionChangeHandle (val) {
      this.dataListSelections = val
    },
    // 新增 / 修改
    addOrUpdateHandle (id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id)
      })
    },
    // eslint-disable-next-line camelcase
    kickHandle (user_id) {
      this.id = this.$route.params.id
      this.$http({
        url: this.$http.adornUrl('/club/' + this.id),
        method: 'put',
        params: this.$http.adornParams({
          'kick': 1
        }),
        data: this.$http.adornData({
          'user_id': user_id
        })
      }).then(({data}) => {
        if (data && data.code === 200) {
          this.out_confirm = false
          this.getDataList()
        }
      })
    },
    checkUserHandle (id) {
      this.$router.push('/show_user/' + id)
    },
    sendMessageHandle (school_number) {
      this.$router.push('/create_message/?school_numbers=' + school_number)
    },
    handleOut_ () {
      this.out_confirm = true
    },
    _handleOut_ () {
      this.out_confirm = false
    }
  }
}
</script>

<style scoped>

</style>
