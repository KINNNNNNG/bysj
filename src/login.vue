<template>
    <el-container>
        <el-aside>
            
        </el-aside>
        <el-main>
            <el-carousel class="carousel">
                <el-carousel-item >
                    <img src="./assets/login.jpg" width="100%" height="100%"/>
                </el-carousel-item>
                <el-carousel-item >
                    <img src="./assets/login.jpg" width="100%" height="100%"/>
                </el-carousel-item>
                <el-carousel-item >
                    <img src="./assets/login.jpg" width="100%" height="100%"/>
                </el-carousel-item>
            </el-carousel>
        </el-main>
    </el-container>
</template>

<script>
export default {
    data(){
        return{
            fullHeight: document.documentElement.clientHeight
        }
    }
}
</script>

<style>
html{
    height: 100%;
    margin: 0;
}
body{
    height: 100%;
}
.el-container{
    height: 100%;
}
.carousel{
    height: 100%;
}
.el-container{
    height: 100%;
}
.el-carousel__container{
    height: 100%;
    margin: 0;
}
</style>
