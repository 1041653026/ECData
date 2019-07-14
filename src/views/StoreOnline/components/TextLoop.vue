<template>
    <div class="container">
        <ul class='step1'>
            <li v-for='(item, i) in data' :key="i">
                <span>NO.{{ i + 1 }}&nbsp;&nbsp;</span>
                <span>{{ item }}</span>
            </li>
        </ul>
        <ul class='step2'>
            <li v-for='(item, i) in data' :key="i">
                <span>NO.{{ i + 1 }}&nbsp;&nbsp;</span>
                <span>{{ item }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'textLoop',
    props: ['data'],
    data() {
        return {
            
        }
    },
    mounted() {
        
    },
    methods: {
       
    }
}
</script>

<style lang='scss' scoped>
.container {
    width: 100%;
    height: 100%;
    position: relative;
    ul {
        position: absolute;
        left: 0;
        top: 20px;
        width: 100%;
        color: #fff;
        li {
            line-height: 40px;
            border-bottom: 1px solid rgb(88,202,154);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        &.step1 {
            transform: translateY(0);
            opacity: 1;
            animation: listLoopUp 3s linear 0s infinite;
        }
        &.step2 {
            transform: translateY(40px);
            opacity: 0;
            animation: listLoopDown 3s linear 0s infinite;
        }
        
    }
    
}
@keyframes listLoopUp {
    0% {
        transform: translateY(0);
        opacity: 1;
    }
    3% {
        transform: translateY(-40px);
        opacity: 0;
    }
    3.1% {
        transform: translateY(40px);
        opacity: 0;
    }
    99.99% {
        transform: translateY(40px);
        opacity: 0;
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
}
@keyframes listLoopDown {
    0% {
        transform: translateY(40px);
        opacity: 0;
    }
    3% {
        transform: translateY(0px);
        opacity: 1;
    }
    99.99% {
        transform: translateY(0px);
        opacity: 1;
    }
    100% {
        transform: translateY(40px);
        opacity: 0;
    }
}
</style>


