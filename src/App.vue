<template>
    <div id="app">
        <el-container class="container">
            <el-header class="header">
                <h1>HAIHUI CODE TEST</h1>
            </el-header>
            <el-container>

                <el-aside class="aside">
                    <el-col>
                        <el-menu
                                default-active="1"
                                class="el-menu-vertical-demo"
                                background-color="#f7f8fa"
                        >
                            <el-menu-item index="1">
                                <i class="el-icon-document"></i>
                                <span slot="title">pets</span>
                            </el-menu-item>

                            <el-menu-item index="2">
                                <i class="el-icon-setting"></i>
                                <span slot="title">java</span>
                            </el-menu-item>
                        </el-menu>
                    </el-col>
                </el-aside>
                <el-main  class="main">
                    <router-view class="router-view"></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: 'app',
        components: {}
    }
</script>

<style lang="scss">
    html, body {
        width: 100%;
        height: 100%;
        margin: 0;
    }

    #app {


        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        height: 100%;

        .container {
            height: 100%;
            position: absolute;
            width: 100%;
            z-index: 10;

            .header {
                background: #30c9e8;

            }

            .aside {
                background: #f7f8fa;
            }
            .main {
                padding: 0;
            }
        }

    }

    @media screen and (max-width: 1200px) {
        .aside {
            display: none;
        }
    }
</style>
