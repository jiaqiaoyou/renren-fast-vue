<template>
  <div v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中">
    <template v-if="!loading">
      <el-table :data="tableData" style="width: 100%">

        <el-table-column
          label="内容">
          <template slot-scope="scope">
            <el-button type="text" @>{{ scope.row.context }}</el-button>
          </template>
        </el-table-column>


        <el-table-column
          label="所属文章"
          prop="article.name">

        </el-table-column>

        <el-table-column
          label="发布时间"
          prop="created">

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
              @click="handleCheck(scope.row.article.id)">查看原文章
            </el-button>

            <el-dialog
              title="回复"
              :visible.sync="reply_visible"
              width="80%">
              <el-form>
                <el-form-item>
                  <el-input placeholder='请输入回复内容'
                            v-model="reply_context"
                            type="textarea"
                            :autosize="{minRows:10,max:20}"
                            clearable/>
                </el-form-item>
                <br>
                <el-form-item>
                  <el-button type="primary" @click="reply()">发送</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>

            <el-button
              size="mini"
              @click="reply_visible=true">回复
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
    this.getComments()
    this.reload()
  },
  data () {
    return {
      reply_visible: false,
      reply_name: '',
      reply_context: '',
      tableData: [],
      search: '',
      loading: true,
      offset: 1,
      limit: 10,
      total: undefined
    }
  },
  methods: {
    getComments () {
      this.$http({
        url: this.$http.adornUrl('/review'),
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
          this.tableData = data.reviews
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
    },
    reply (id) {

    }
  }
}
</script>

<style scoped>

</style>
