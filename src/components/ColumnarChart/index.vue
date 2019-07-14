<template>
    <div class="container">
        <div ref='main' :style='`width: 100%; height: 100%;`'></div>
    </div>
</template>

<script>
import $e from 'echarts';

export default {
    name: 'columnarChart',
    data() {
        return {
            options: {},
        }
    },
    props: ['data'],
    created() {
    },
    mounted() {
        this.setChart();
    },
    methods: {
        setChart() {
            let myChart = $e.init(this.$refs.main);
            let option = {
                color: ['RGB(120,151,251)', 'RGB(247,218,71)', 'RGB(88,202,154)','RGB(238,112,109)',  'RGB(102,102,102)', 'RGB(94,131,251)'],
                title: {
                    text: this.data.title,
                    
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                },
                grid: {
                    left: '1%',
                    top: '20%',
                    right: '0%',
                    bottom: '0%',
                    containLabel: true
                },
                legend: {
                    data: this.data.lenged
                },
                xAxis: {
                    axisLabel: {
                        color: '#aaa'
                    },
                    data: this.data.xAxis,
                },
                yAxis: this.data.yAxis,
                series: this.data.series
            };
            myChart.setOption(option);
            window.addEventListener('resize', function() {
                myChart.setOption(option);
                myChart.resize();
            });
        }
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
}
</style>
