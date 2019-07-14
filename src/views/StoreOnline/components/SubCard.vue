<template>
    <div class="container">
        <div class="title">{{ title }}</div>
        <div class="main">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'subCard',
    props: ['title']
}
</script>

<style lang='scss' scoped>
.container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .title {
        width: 100%;
        height: 30px;
        font-size: 16px;
        color: rgb(247,218,71);
        text-align: center;
        line-height: 30px;
        background-color: rgba(26,72,78,.6);
    }
    .main {
        flex: 1;
    }
}
</style>


