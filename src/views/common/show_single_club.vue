<template>
  <div v-loading.fullscreen.lock="this.loading" element-loading-text="拼命加载中">
    <template v-if="!this.loading">
      <el-dialog
        title="警告"
        :visible.sync="this.out_confirm"
        width="30%">
        <span>确定退出？</span>
        <span slot="footer" class="dialog-footer" v-model="out_confirm">
                <el-button @click="out_confirm=false">取消</el-button>
                <el-button type="primary" @click="handleOut">确定</el-button>
          </span>
      </el-dialog>

      <el-dialog
        title="警告"
        :visible.sync="this.dismiss_confirm"
        width="30%">
        <span>确定解散？</span>
        <span slot="footer" class="dialog-footer" v-model="dismiss_confirm">
                <el-button @click="dismiss_confirm=false">取消</el-button>
                <el-button type="primary" @click="handleDismiss">确定</el-button>
          </span>
      </el-dialog>

      <div v-model="dataForm">
        <el-card>
          <h1>社团名称：{{ dataForm.name }}</h1>
          <h3>创建者：{{ dataForm.owner.name }}</h3>
          <h3>创建时间：{{ dataForm.created }}</h3>
        </el-card>
      </div>
      <br><br>


      <div v-model="dataForm">
        <el-tag>社团描述</el-tag>
        <el-card>
          <p v-html="dataForm.description"></p>
        </el-card>
      </div>
      <br><br>


      <div v-model="dataForm">
        <el-tag>社团成员</el-tag>
        <el-card>
          <div>
            <el-form :inline="true" :model="dataForm.members">
              <el-form-item>
                <el-input v-model="search_name" placeholder="用户名" clearable></el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="getDataList()">查询</el-button>
                <el-button type="danger" v-if="managing" @click="kickHandle()"
                           :disabled="dataListSelections.length <= 0">批量踢出
                </el-button>
              </el-form-item>
            </el-form>

            <el-table
              :data="dataForm.members"
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
                             v-if="managing"
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
          </div>
        </el-card>
      </div>
      <br><br>

      <div v-model="dataForm">
        <el-tag>更多</el-tag>
        <el-card>
          <el-button type="primary"
                     size="medium"
                     v-if="managing"
                     @click="handleEdit">
            编辑社团信息
          </el-button>
          <el-button type="primary"
                     size="medium"
                     @click="handleArticle">
            查看社团历史文章
          </el-button>
          <el-button type="danger"
                     size="medium"
                     v-if="owning"
                     @click="dismiss_confirm=true">
            解散社团
          </el-button>
          <el-button type="danger"
                     size="medium"
                     v-if="membering"
                     @click="out_confirm=true">
            退出社团
          </el-button>
          <el-button type="primary"
                     size="medium"
                     v-if="!membering"
                     @click="handleIn()">
            申请加入
          </el-button>
        </el-card>
      </div>
    </template>
  </div>

</template>

<script>

export default {
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getRoleInfo()
      vm.getDataList()
    })
  },
  created () {
    this.getRoleInfo()
    this.getDataList()
  },
  data () {
    return {
      editor: null,
      edit_visible: false,
      dismiss_confirm: false,
      owning: undefined,
      managing: undefined,
      membering: undefined,

      search_name: '',
      dataListSelections: [],
      out_confirm: false,
      inClub: false,
      loading: false,
      id: undefined,
      club_name: this.$route.params.club_name,
      dataForm: {
        name: '',
        description: ''
      },
      dataRule: {
        name: [
          {required: true, message: '社团名称不能为空', trigger: blur}
        ]
      },
      reason: ''
    }
  },
  methods: {
    refresh () {
      this.edit_visible = false
      this.getRoleInfo()
      this.getDataList()
    },
    getRoleInfo () {
      this.$http({
        url: this.$http.adornUrl('/club/' + this.$route.params.id),
        method: 'get',
        params: this.$http.adornParams({
          'role_info': 1
        })
      }).then(({data}) => {
        if (data && data.code === 200) {
          this.owning = data.owning
          this.managing = data.managing
          this.membering = data.membering
        }
      })
    },
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
    // eslint-disable-next-line camelcase
    sendMessageHandle (school_number) {
      // eslint-disable-next-line camelcase
      this.$router.push('/create_message/?school_numbers=' + school_number)
    },
    getDataList () {
      this.id = this.$route.params.id
      this.$http({
        url: this.$http.adornUrl('/club/' + this.id),
        method: 'get'
      }).then(({data}) => {
        if (data && data.code === 200) {
          this.dataForm = data
          this.loading = false
        }
      })
    },
    submit () {
    },
    back () {
      this.$router.back()
    },
    handleArticle () {
      this.id = this.$route.params.id
      this.$router.push('/show_article_list/?clubs='+this.$route.params.id)
    },
    handleDismiss () {
      this.$http({
        url: this.$http.adornUrl('/club/' + this.id),
        method: 'delete'
      }).then(({data}) => {
        this.dismiss_confirm = false
        this.$notify.success('社团已被解散')
        this.$router.push('/show_club_list/?me=1')
      })
    },
    handleEdit () {
      this.$router.push('/edit_club/' + this.$route.params.id)
    },
    handleOut () {
      this.id = this.$route.params.id
      this.$http({
        url: this.$http.adornUrl('/club/' + this.id),
        params: this.$http.adornParams({
          'outclub': 1
        }),
        method: 'get'
      }).then(({data}) => {
        this.$notify.success('你已退出')
        this.$router.push('/show_club_list/?me=1')
      })
    },
    handleIn () {
      this.$http({
        url: this.$http.adornUrl('/user/me'),
        method: 'get'
      }).then(({data}) => {
        console.log(data)
        // eslint-disable-next-line camelcase
        let join_name = data.name
        // eslint-disable-next-line camelcase
        let join_id = data.id
        this.$http(
          {
            url: this.$http.adornUrl('/msg'),
            method: 'post',
            data: {
              'school_numbers': this.dataForm.owner.school_number,
              // eslint-disable-next-line camelcase
              'name': '用户 "' + join_name + '"' + ' 申请加入社团 ' + '"' + this.dataForm.name + '"',
              'context':
                '<i>用户的申请理由如下:</i>' +
                '<br><br>' +
                '<h3>' +
                this.reason +
                '</h3>' +
                '<br><br>' +
                // eslint-disable-next-line camelcase
                '<a v-if="canAgree" href="/#/add_member/' + this.dataForm.id + '/?join_id=' + join_id + '"> <h2>同意</h2> </a>' +
                // eslint-disable-next-line camelcase
                '<a v-if="canAgree" href="/#/add_member/' + this.dataForm.id + '/?join_id=' + join_id + '"> <h2>拒绝</h2> </a>' +
                '<br>' +
                '<i> *注：如不同意，请勿点击同意并将理由回复于此邮件</i>',
            }
          }
        ).then(({data}) => {
          this.$notify.success('申请已发送，请等候管理员的同意')
        })
      })
    }
  }
}
</script>
