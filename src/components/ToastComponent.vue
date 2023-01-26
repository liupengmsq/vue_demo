<template>
    <div class="toast">{{ message }}</div>
</template>

<script>
export default {
    props: ['message']
}
</script>

<style lang="scss" scoped>
.toast {
    // 水平与垂直居中
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    padding: .1rem;
    background: rgba(0,0,0,.35); // rgba中的a是透明度的设置
    border-radius: .05rem;
    color: #FFF;
}
</style>
