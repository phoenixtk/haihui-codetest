<template>
    <div>
        Pets
        <el-button @click="getData">aaa</el-button>
    </div>
</template>

<script>
    export default {
        name: "Pets",
        methods: {
            getData() {
                this.axios.get("/owners").then(res=>{
                    console.log(res);
                })
            }
        }
    }
</script>

<style scoped>

</style>
