<template>
    <div class='container'>
        <div class="map">
            <map-page></map-page>
        </div>
        <div class="layer">
            <div class="left">
                <sub-card :title='"交易来源占比"'>
                    <template v-slot>
                        <div class="sub-main">
                            <pie-chart :data='originData'></pie-chart>
                        </div>
                    </template>
                </sub-card>
                <sub-card :title='"成交额top店铺"'>
                    <template v-slot>
                        <div class="sub-main">
                            <text-loop :data='topStore'></text-loop>
                        </div>
                    </template>
                </sub-card>
                <sub-card :title='"渠道销售排行"'>
                    <template v-slot>
                        <div class="sub-main">
                            <columnar-chart :data='colChartData'></columnar-chart>
                        </div>
                    </template>
                </sub-card>
            </div>
            <div class="center">
                <h1>某某某品牌 电商实时状况</h1>
                <div class="center-main">
                    <change-loop></change-loop>
                </div>
            </div>
            <div class="right">
                <sub-card :title='"销售目标达成率"'>
                    <template v-slot>
                        <div class="sub-main">
                            <pie-chart :data='sellTargetData'></pie-chart>
                        </div>
                    </template>
                </sub-card>
                <sub-card :title='"成交额top商品"'>
                    <template v-slot>
                        <div class="sub-main">
                            <text-loop :data='topGoods'></text-loop>
                        </div>
                    </template>
                </sub-card>
                <sub-card :title='"会员等级占比"'>
                    <template v-slot>
                        <div class="sub-main">
                            <pie-chart :data='vipChartData'></pie-chart>
                        </div>
                    </template>
                </sub-card>
            </div>
        </div>
    </div>
</template>

<script>
import ColumnarChart from '@/components/ColumnarChart';
import PieChart from '@/components/PieChart';
import SubCard from './components/SubCard';
import ChangeLoop from './components/ChangeLoop';
import TextLoop from './components/TextLoop';
import MapPage from './components/MapPage';

export default {
    data() {
        return {
            apiConf: {
                getColumnar: '/columnar/get',
                getPie: '/Pie/get',
            },
            colChartData: {},
            vipChartData: {},
            originData: {},
            sellTargetData: {},
            topStore: [],
            topGoods: []
        }
    },
    components: {
        ColumnarChart,
        PieChart,
        SubCard,
        ChangeLoop,
        TextLoop,
        MapPage
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            this.getColumnarData();
            this.getOrigin();
            this.getSellTarget();
            this.getVipChart();
            this.getTopStore();
            this.getTopGoods();
        },
        getColumnarData() {
            let data = {
                url: this.apiConf.getColumnar,
                params: {
                }
            }
            this.colChartData = {
                title: '',
                lenged: [],
                xAxis: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
                yAxis: {
                    axisLabel: {
                        color: '#aaa'
                    },
                },
                series: [{
                    name: '直接访问',
                    type: 'bar',
                    data: [335, 310, 234, 135, 1548]
                }]
            }
            return;

            this.$http.commonGet(data).then(res => {
                if (res.state && res.state == 200) {
                    this.colChartData = res.data;
                } else {
                    this.$message.error(res.msg || '获取柱状图数据失败');
                }
            })
        },
        getOrigin() {
            let data = {
                url: this.apiConf.getPie,
                params: {
                }
            }
            this.originData = {
                title: '',
                lenged: [],
                series: {
                    name: 'series0',
                    data: [
                        {value:335, name:'直接访问'},
                        {value:310, name:'邮件营销'},
                        {value:234, name:'联盟广告'},
                        {value:135, name:'视频广告'},
                        {value:1548, name:'搜索引擎'}
                    ]
                }
            }
            return;

            this.$http.commonGet(data).then(res => {
                if (res.state && res.state == 200) {
                    this.colChartData = res.data;
                } else {
                    this.$message.error(res.msg || '获取交易来源数据失败');
                }
            })
        },
        getSellTarget() {
            let data = {
                url: this.apiConf.getPie,
                params: {
                }
            }
            this.sellTargetData = {
                title: '',
                lenged: [],
                series: {
                    name: 'series0',
                    data: [
                        {value:67, name:'完成'},
                        {value:23, name:'未完成'},
                    ]
                }
            }
            return;

            this.$http.commonGet(data).then(res => {
                if (res.state && res.state == 200) {
                    this.colChartData = res.data;
                } else {
                    this.$message.error(res.msg || '获取销售目标达成率数据失败');
                }
            })
        },
        getVipChart() {
            let data = {
                url: this.apiConf.getPie,
                params: {
                }
            }
            this.vipChartData = {
                title: '',
                lenged: [],
                series: {
                    name: 'series0',
                    data: [
                        {value: 335, name: 'v1'},
                        {value: 310, name: 'v2'},
                        {value: 234, name: 'v3'},
                    ]
                }
            }
            return;

            this.$http.commonGet(data).then(res => {
                if (res.state && res.state == 200) {
                    this.colChartData = res.data;
                } else {
                    this.$message.error(res.msg || '获取会员等级占比数据失败');
                }
            })
        },
        getTopStore() {
            let data = {
                url: this.apiConf.getTopStore,
                params: {
                }
            }
            this.topStore = [
                '凑味咖啡鼓浪屿纯手工人气',
                '农味美食店',
                '爱生气起泡米酒',
                '黎平县原生态官方企业'
            ]
            return;

            this.$http.commonGet(data).then(res => {
                if (res.state && res.state == 200) {
                    this.topStore = res.data;
                } else {
                    this.$message.error(res.msg || '获取成交额top店铺数据失败');
                }
            })
        },
        getTopGoods() {
            let data = {
                url: this.apiConf.getTopGoods,
                params: {
                }
            }
            this.topGoods = [
                '起泡酒大礼包 爱格尼蓝海之鲸天使之手气泡酒',
                '一杯精选气泡酒 ltaly原瓶进口天使之手气泡酒',
                '精选红酒炒鸡好喝的德国巧克力红酒250ml浓香丝滑',
                '【爱上红枣】爱生气红枣米酒冬酿鲜米酒低度女士甜酒果酒稠酒6瓶'
            ]
            return;

            this.$http.commonGet(data).then(res => {
                if (res.state && res.state == 200) {
                    this.topStore = res.data;
                } else {
                    this.$message.error(res.msg || '获取成交额top商品数据失败');
                }
            })
        }
    }
}
</script>

<style lang='scss' scoped>
.container {
    width: 100%;
    height: 100%;
    .map{
        width: 100%;
        height: 100%;
        background-color: #000;
    }
    .layer {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        padding: 20px;
        box-sizing: border-box;
        .left,.right {
            width: 300px;
            min-width: 300px;
            height: 100%;
            display: flex;
            flex-direction: column;
            // background-color: red;
            .sub-main {
                // background-color: #253ff3;
                height: 100%;
                position: relative;
            }
        }
        .center {
            flex: 1;
            min-width: 540px;
            height: 175px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            h1 {
                width: 100%;
                height: 36px;
                text-align: center;
                font-size: 36px;
                color: #fff;
                margin-bottom: 20px;
            }
            .center-main {
                flex: 1;
            }
        }
        
    }
}
</style>


