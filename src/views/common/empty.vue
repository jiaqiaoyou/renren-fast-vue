<template>
  <h1>
    空页面
  </h1>
</template>

<script>
export default{
  data() {
    return{

    }
  },
  created(){
    this.$router.replace({
      path:'/',
      name:'father'
    })
  }
}
</script>
