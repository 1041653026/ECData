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
                color: ['rgb(94,131,251)', 'rgb(247,218,71)', 'rgb(88,202,154)','rgb(238,112,109)',  'rgb(102,102,102)'],
                title: {
                    text: this.data.title,
                    textStyle: {
                        fontSize: 16
                    }
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    show: false
                },
                grid: {
                    left: 'center',
                    containLabel: true
                },
                series : [
                    {
                        name: this.data.series.name,
                        type: 'pie',
                        radius : ['40%', '50%'],
                        center: ['50%', '50%'],
                        data: this.data.series.data,
                        label: {
                            formatter: "{b}\n{d}%"
                        },
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                            }
                        }
                    }
                ]
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
