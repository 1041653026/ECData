<template>
    <div class="container">
        <div ref='main' :style='`width: 90%; height: 90%;`'></div>
    </div>
</template>

<script>
import $e from 'echarts';
import 'echarts/map/js/world.js';

export default {
    name: 'mapPage',
    data() {
        return {
            options: {},
        }
    },
    created() {
    },
    mounted() {
        this.setChart();
    },
    methods: {
        setChart() {
            let myChart = $e.init(this.$refs.main)
            /*
                图中相关城市经纬度,根据你的需求添加数据
                关于国家的经纬度，可以用首都的经纬度或者其他城市的经纬度
            */
            var geoCoordMap = {
                '广州': [113.5107, 23.2196],
                '芬兰': [24.909912, 60.169095], 
                '美国': [-100.696295, 33.679979], 
                '日本': [139.710164, 35.706962], 
                '韩国': [126.979208, 37.53875], 
                '瑞士': [7.445147, 46.956241],
                '东南亚': [117.53244, 5.300343], 
                '澳大利亚': [135.193845, -25.304039], 
                '德国': [13.402393, 52.518569], 
                '英国': [-0.126608, 51.208425], 
                '加拿大': [-102.646409, 59.994255]
            };

            /* 
                记录下起点城市和终点城市的名称，以及权重
                数组第一位为终点城市，数组第二位为起点城市，以及该城市的权重，就是图上圆圈的大小
            */

            // 广州
            var GZData = [
                [{name: '广州'}, {name: "日本",value: 60}],
                [{name: '广州'}, {name: "东南亚",value: 60}],
                [{name: '广州'}, {name: "加拿大",value: 60}],
                [{name: '广州'}, {name: "美国",value: 60}],
                [{name: '广州'}, {name: "澳大利亚",value: 60}],
                [{name: '广州'}, {name: "瑞士",value: 60}],
                [{name: '广州'}, {name: "芬兰",value: 60}],
                [{name: '广州'}, {name: "德国",value: 60}],
                [{name: '广州'}, {name: "英国",value: 60}],
                [{name: '广州'}, {name: "韩国",value: 60}]
            ];

            // 回流
            var RGZData = [
                [{name: '日本'}, {name: "广州"}],
                [{name: '东南亚'}, {name: "广州"}],
                [{name: '加拿大'}, {name: "广州"}],
                [{name: '美国'}, {name: "广州"}],
                [{name: '澳大利亚'}, {name: "广州"}],
                [{name: '瑞士'}, {name: "广州"}],
                [{name: '芬兰'}, {name: "广州"}],
                [{name: '德国'}, {name: "广州"}],
                [{name: '英国'}, {name: "广州"}],
                [{name: '韩国'}, {name: "广州"}]
            ];

            // 小飞机的图标，可以用其他图形替换
            // var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';

            // 获取地图中起点和终点的坐标，以数组形式保存下来
            var convertData = function(data) {
                var res = []; 
                for(var i = 0; i < data.length; i++) {
                    var dataItem = data[i];
                    var fromCoord = geoCoordMap[dataItem[1].name];
                    var toCoord = geoCoordMap[dataItem[0].name];
                    if(fromCoord && toCoord) {
                        res.push([{
                            coord: fromCoord // 起点坐标
                        }, {
                            coord: toCoord // 终点坐标
                        }])
                    }
                }
                return res;
            }
            var color  = ['#f7d956'];	// 自定义图中要用到的颜色
            var series = [];			// 用来存储地图数据

            /*
                图中一共用到三种效果，分别为航线特效图、飞机航线图以及城市图标涟漪图。
                要用到setOption中的series属性，并且对每个城市都要进行三次设置。
            */
            series.push({  // 小飞机航线效果
                type: 'lines',
                zlevel: 2,
                effect: {
                    show: true,
                    trailLength: 0.2,
                    period: 6,
                    color: 'skyblue',
                    symbol: 'arrow',         // 特效形状，可以用其他svg pathdata路径代替
                    symbolSize: 6           
                },
                lineStyle: {
                    normal: {
                        color: ['rgba(66, 66, 66, 0)'],
                        width: 1,
                        opacity: 0.6,
                        curveness: 0
                    }
                },
                data: convertData(GZData)// 特效的起始、终点位置，一个二维数组，相当于coords: convertData(item[1])
            }, { // 散点效果
                type: 'effectScatter',         
                coordinateSystem: 'geo',       // 表示使用的坐标系为地理坐标系
                zlevel: 2,
                label: {
                    normal: {                  // 默认的文本标签显示样式
                        show: false,
                    }
                },
                symbolSize: 5,
                itemStyle: {
                    normal: {
                        color: color[0]
                    }
                },
                data: GZData.map(function(dataItem) {
                    return {
                        name: dataItem[1].name,
                        value: geoCoordMap[dataItem[1].name],  // 起点的位置
                    };
                })
            });
            series.push({  // 小飞机航线效果
                type: 'lines',
                zlevel: 2,
                // symbol: ['none', 'arrow'],   // 用于设置箭头
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0.2,
                    color: 'orange',
                    symbol: 'arrow',         // 特效形状，可以用其他svg pathdata路径代替
                    symbolSize: 6           
                },
                lineStyle: {
                    normal: {
                        color: ['rgba(66, 66, 66, 0)'],
                        width: 1,
                        opacity: 0.6,
                        curveness: 0
                    }
                },
                data: convertData(RGZData)     // 特效的起始、终点位置，一个二维数组，相当于coords: convertData(item[1])
            });

            // 显示终点位置,类似于上面最后一个效果，放在外面写，是为了防止被循环执行多次
            series.push({
                type: 'effectScatter',
                coordinateSystem: 'geo',
                zlevel: 2,
                rippleEffect: {
                    scale: 3,
                    brushType: 'stroke'
                },
                label: {
                    normal: {
                        show: false,
                    }
                },
                symbolSize: 12,
                itemStyle: {
                    normal: {
                        color: ['rgb(88,202,154)']
                    }
                },
                data: [{
                    name: '广州',
                    value: [113.5107, 23.2196, 30],
                }]
            });

            // 最后初始化世界地图中的相关数据
            let options = {
                title: {
                    textStyle: {
                        color: '#fff',
                    },
                },
                geo: {
                    map: 'world',       // 与引用进来的地图js名字一致
                    roam: false,        // 禁止缩放平移
                    itemStyle: {        // 每个区域的样式 
                        normal: {
                            areaColor: '#022548',
                            borderColor: '#0DABEA'  
                        },
                        emphasis: {
                            areaColor: '#011B34'
                        }
                    },
                    label: {
                        emphasis: {
                            show: false,
                        },
                    },
                    regions: [],
                    center: [10, 25],
                },
                series: series,   // 将之前处理的数据放到这里
                textStyle: {
                    fontSize: 12
                }
            }
            myChart.setOption(options);
            window.addEventListener('resize', function() {
                myChart.setOption(options);
                myChart.resize();
            })
        },
    },
    watch: {
        data() {
            this.data && this.setChart();
        }
    }
}
</script>

<style lang='scss' scoped>
.container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
