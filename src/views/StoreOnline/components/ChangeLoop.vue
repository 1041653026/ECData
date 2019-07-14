<template>
    <div class="container">
        <p class="time">
            <span class='el-icon-time' style='margin-right: 5px;'></span>
            <span>{{ _parseTime(nowTime) }}</span>
        </p>
        <p class="title">今日交易额</p>
        <div class="price">
            <span>{{ samePart }}</span>
            <ul class="loop">
                <li class='step1'>{{ diffPart }}</li>
                <li class='step2'>{{ diffPart }}</li>
            </ul>
            元
        </div>
    </div>
</template>

<script>
import { parseTime, formatMoney } from '@/utils';

export default {
    name: 'changeLoop',
    data() {
        return {
            nowTime: new Date(),
            timer: null,
            price: 16821242.69,
            diffPart: '',
            samePart: 16821242.69
        }
    },
    mounted() {
        // this.diff('12345', '66645');
        this.timer = setInterval(() => {
            this.nowTime = new Date();
            let old = this.price;
            let num = this.price = this.parseNum(this.price + Math.random() * 5000);
            this.diff(num, old);
        }, 1000)
    },
    methods: {
        diff(newn, oldn) {
            newn += '';
            oldn += '';
            let idx;
            for ( let i = 0, len = oldn.length; i < len; i++ ) {
                if (newn[i] != oldn[i]) {
                    idx = i;
                    break;
                }
            }
            this.samePart = +newn.slice(0, idx);
            this.diffPart = +newn.slice(idx);
        },
        _parseTime(time) {
            return parseTime(time)
        },
        parseNum(num) {
            return +formatMoney(num, 2, '');
        }
    },
    beforeDestroy() {
        clearInterval(this.timer);
        this.timer = null;
    }
}
</script>

<style lang='scss' scoped>
.container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .time {
        color: #fff;
    }
    .title {
        color: #f7d947;
        width: 336px;
        height: 20px;
        line-height: 20px;
        padding: 4px 2px;
        text-align: center;
        margin-top: 15px;
        margin-bottom: 25px;
        background-color: rgba(26, 72, 78, .6);
    }
    .price {
        height: 44px;
        font-size: 62px;
        line-height: 44px;
        color: #f7d947;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        .loop {
            height: 44px;
            position: relative;
            li {
                &.step2 {
                    transform: translateY(0);
                    opacity: 1;
                    animation: listLoopUp 1s linear 0s infinite;
                }
                &.step1 {
                    position: absolute;
                    left: 0;
                    top: 0;
                    transform: translateY(44px);
                    opacity: 0;
                    animation: listLoopDown 1s linear 0s infinite;
                }
            }
        }
    }
}
@keyframes listLoopUp {
    0% {
        transform: translateY(0);
        opacity: 1;
    }
    9% {
        transform: translateY(-60px);
        opacity: 0;
    }
    9.3% {
        transform: translateY(60px);
        opacity: 0;
    }
    99.99% {
        transform: translateY(60px);
        opacity: 0;
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
}
@keyframes listLoopDown {
    0% {
        transform: translateY(60px);
        opacity: 0;
    }
    9% {
        transform: translateY(0px);
        opacity: 1;
    }
    99.99% {
        transform: translateY(0px);
        opacity: 1;
    }
    100% {
        transform: translateY(60px);
        opacity: 0;
    }
}
</style>


