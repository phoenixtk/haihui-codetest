<template>
    <div class="pet">
        <div class="pet-left">
            <el-button @click="getData">aaa</el-button>
            <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        </div>
        <div class="pet-right">
            pet-right
        </div>
    </div>
</template>

<script>
    export default {
        name: "Pets",
        data() {
            return {
                treeData: null,
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            };
        },
        methods: {
            getData() {
                this.axios.get("/owners").then(res => {
                    console.log(res);
                    this.getTreedataByRequestData(res.data)
                });
            },
            getTreedataByRequestData(requestData) {
                /*let treeData = [{
                    label: '一级 1',
                    children: [{
                        label: '二级 1-1',
                        children: [{
                            label: '三级 1-1-1'
                        }]
                    }]
                }, {
                    label: '一级 2',
                    children: [{
                        label: '二级 2-1',
                        children: [{
                            label: '三级 2-1-1'
                        }]
                    }, {
                        label: '二级 2-2',
                        children: [{
                            label: '三级 2-2-1'
                        }]
                    }]
                }, {
                    label: '一级 3',
                    children: [{
                        label: '二级 3-1',
                        children: [{
                            label: '三级 3-1-1'
                        }]
                    }, {
                        label: '二级 3-2',
                        children: [{
                            label: '三级 3-2-1'
                        }]
                    }]
                }];*/

                let treeData = [];
                // node Male
                let nMale = {
                    label: 'Male',
                };
                // node Female
                let nFemale = {
                    label: 'Female',
                };

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
                                });
                            }
                        }
                    }
                    return petChildren;
                }

                if (requestData) {
                    for (const owner of requestData) {
                        if (owner.gender === 'Male') {
                            if (!nMale.children) {
                                nMale.children = [];
                            }

                            let petChildren = getPetChildren(owner);


                            let nOwner = {
                                label: owner.name,
                                age: owner.age
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
                                age: owner.age
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
            handleNodeClick(data) {
                console.log(data);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .pet {
        display: flex;
        flex-direction: row;
        padding: 0;

        &-left {
            flex: 1;
            background-color: aqua;
        }

        &-right {
            flex: 4;
            background-color: beige;
        }
    }
</style>
