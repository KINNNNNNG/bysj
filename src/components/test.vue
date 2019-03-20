<template>
    <div id="bac" :style="back">
    </div>
</template>

<script>
export default {
  data(){
    return{
      back:{
        backgroundImage:'url('+require("../assets/login.jpg")+")",
        backgroundRepeat:"no-repeat",
        backgroundSize:"100% 100%",
        width:"100%",
        height:"100",   
        filter: "blur(10px)"
      }
    }
  }
}
</script>

<style>

</style>
