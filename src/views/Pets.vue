<template>
    <div class="pet">

        <vue-particles
                class="particles"
                color="#dedede"
                :particleOpacity="0.7"
                :particlesNumber="80"
                shapeType="circle"
                :particleSize="4"
                linesColor="#dedede"
                :linesWidth="1"
                :lineLinked="true"
                :lineOpacity="0.4"
                :linesDistance="150"
                :moveSpeed="3"
                :hoverEffect="true"
                hoverMode="grab"
                :clickEffect="true"
                clickMode="push"
        >
        </vue-particles>
        <div class="pet-left">
            <!--<el-button @click="getData">aaa</el-button>-->
            <el-tree
                    class="pet-left-tree"
                    :data="treeData"
                    :props="defaultProps"
                    @node-click="handleNodeClick"
                    :default-expand-all="true"
                    :render-content="renderContent"
            ></el-tree>
        </div>
        <div class="pet-right">
            <canvas id="stcanvas" width='800' height='800'></canvas>
        </div>
    </div>
</template>

<script>
    import {fabric} from 'fabric'

    export default {
        name: "Pets",
        data() {
            return {
                treeData: null,
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                imgcount: 0
            };
        },
        methods: {
            getData() {
                this.axios.get("/owners").then(res => {
                    this.getTreedataByRequestData(res.data)
                });
            },
            getTreedataByRequestData(requestData) {
                function getPetChildren(owner) {
                    let petChildren;
                    if (owner.pets) {
                        for (const pet of owner.pets) {
                            if (pet.type === "Cat") {
                                if (!petChildren) {
                                    petChildren = [];
                                }
                                petChildren.push({
                                    label: pet.name,
                                    imgsrc: require("@/assets/images/cat.svg"),
                                    type: 'cat'
                                });
                            }
                        }
                    }
                    return petChildren;
                }

                let treeData = [];
                // node Male
                let nMale = {
                    label: 'Male',
                    imgsrc: require("@/assets/images/baobia.svg")
                };
                // node Female
                let nFemale = {
                    label: 'Female',
                    imgsrc: require("@/assets/images/baobia.svg")
                };
                if (requestData) {
                    requestData = _.orderBy(requestData, ['name'], ['asc'])
                    for (const owner of requestData) {
                        if (owner.gender === 'Male') {
                            if (!nMale.children) {
                                nMale.children = [];
                            }
                            let petChildren = getPetChildren(owner);
                            let nOwner = {
                                label: owner.name,
                                age: owner.age,
                                imgsrc: require("@/assets/images/male.svg")
                            };
                            if (petChildren) {
                                nOwner.children = petChildren;
                            }
                            nMale.children.push(nOwner);
                        } else {
                            if (!nFemale.children) {
                                nFemale.children = [];
                            }
                            let petChildren = getPetChildren(owner);
                            let nOwner = {
                                label: owner.name,
                                age: owner.age,
                                imgsrc: require("@/assets/images/female.svg")
                            };
                            if (petChildren) {
                                nOwner.children = petChildren;
                            }
                            nFemale.children.push(nOwner);
                        }
                    }
                }
                treeData.push(nMale);
                treeData.push(nFemale);
                this.treeData = treeData;
            },
            renderContent(h, {node, data, store}) {
                return (
                    < span
            class
                = "custom-tree-node" >
                    < i
            class
                = {data.className} > < /i>
                    < img
                src = {data.imgsrc}
                style = "width:14px;height:14px;" / >
                    < span
                style = "margin-left:5px;" > {node.label} < /span>
                    < /span>
            )
                ;
            },
            handleNodeClick(data) {
                if (data && data.type && data.type === 'cat') {
                    this.imgcount++;
                    if (this.imgcount > 6) {
                        this.$message.error(`oh no, too many cats here, doesn't work!`);
                        return;
                    }


                    var rect = new fabric.Rect({
                        left: 800 * Math.random(),//距离画布左侧的距离，单位是像素
                        top: 800 * Math.random(),//距离画布上边的距离
                        fill: 'red',//填充的颜色
                        width: 30,//方形的宽度
                        height: 30//方形的高度
                    });
                    stcanvas.add(rect);
                }
            }
        },
        created() {
            this.getData();
        },
        mounted() {
            window.stcanvas = new fabric.Canvas('stcanvas');
        }
    }
</script>

<style lang="scss" scoped>

    .pet {
        position: relative;
        padding: 0;
        width: 100%;
        height: 100%;
        background-color: #F2F2F2;

        .particles {
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 1;
        }

        &-left {
            position: absolute;
            z-index: 10;
            width: 20%;
            height: 95%;
            margin: 15px;
            border-radius: 10px;
            background-color: white;

            &-tree {
                margin: 15px;
            }
        }

        &-right {
            position: absolute;
            z-index: 10;
            width: 75%;
            left: 22%;
            height: 95%;
            margin: 15px;
            border-radius: 10px;
            background-color: white;
            margin: 15px;
        }
    }

    #stcanvas {
        margin: 15px;
        border: 1px solid #d3d1ff;
        border-radius: 10px
    }
</style>
