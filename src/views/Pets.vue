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
            <div>
                <canvas id="stcanvas" width='800' height='800'></canvas>
            </div>
            <div style="margin: 50px">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>Operation Manual</span>
                    </div>
                    <div class="text item">
                        ①click the cats
                    </div>
                    <div class="text item">
                        ②edit as you wish
                    </div>
                    <div class="text item">
                        ③click download to get your image
                    </div>
                    <div class="text item">
                        have fun!
                    </div>
                    <div class="text item" style="height: 30px">
                    </div>
                    <div class="text item">
                        <el-button @click="downloadImg">download</el-button>
                    </div>
                </el-card>
            </div>

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
                    fabric.Image.fromURL(require("@/assets/images/cats/cat" + this.imgcount + ".jpg"), function (oImg) {
                        oImg.width = 80;
                        oImg.height = 80;
                        oImg.left = 700 * Math.random();
                        oImg.top = 700 * Math.random();
                        stcanvas.add(oImg);
                    });
                }
            },
            downloadImg() {
                // var svg = stcanvas.toSVG();
                var png = stcanvas.toDataURL("image/png");
                // console.log(png);
                this.saveFile(png, 'nopay');
            },
            saveFile(data, filename) {
                var save_link = document.createElementNS(
                    'http://www.w3.org/1999/xhtml', 'a');
                save_link.href = data;
                save_link.download = filename;

                var event = document.createEvent('MouseEvents');
                event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0,
                    false, false, false, false, 0, null);
                save_link.dispatchEvent(event);
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
            display: flex;
        }
    }

    #stcanvas {
        margin: 15px;
        border: 1px solid #d3d1ff;
        border-radius: 10px
    }
    .box-card {
        text-align: left;
        .item{
            color: #d3d1ff;
            font-size: 14px;
        }
    }
</style>
