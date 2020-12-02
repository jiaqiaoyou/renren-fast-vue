<template>

</template>

<script>
export default {
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.addMember()
    })
  },
  data () {
    return {
      id: undefined,
      join_id: undefined
    }
  },
  methods: {
    addMember () {
      this.id = this.$route.params.id
      this.join_id = this.$route.query.join_id
      this.$http({
        url: this.$http.adornUrl('/club/' + this.id),
        method: 'put',
        params: this.$http.adornParams({
          'join': 1
        }),
        data: this.$http.adornData({
          'join_id': this.join_id
        })
      }).then(({data}) => {
        if (data && data.code === 200) {
          this.$notify.info('添加新成员成功')
          this.$router.back()
        }
      }).catch(({response}) => {
        console.log(response)
        if (response.status === 403) {
          this.$notify.error('你无权操作')
          this.$router.back()
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
