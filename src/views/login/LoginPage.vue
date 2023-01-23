<template>
    <div class="wrapper">
        <img class="wrapper__img" src="@/assets/images/user.svg" alt="">
        <div class="wrapper__input">
            <input type="text" placeholder="请输入手机号" class="wrapper__input__content" />
        </div>
        <div class="wrapper__input">
            <input type="password" placeholder="请输入密码" class="wrapper__input__content" />
        </div>
        <div class="wrapper__login-button">登录</div>
        <div class="wrapper__login-link">立即注册</div>
    </div>
</template>

<script>
export default {
  name: 'LoginPage'
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
.wrapper {
    // 垂直居中的样式设置
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    // 表示向上移动自身高度的一半，达到水平居中的效果
    transform: translateY(-50%);

    &__img {
        display: block;
        margin: 0 auto .4rem auto; // 图片的水平居中
        width: .66rem;
        height: .66rem;
    }
    &__input {
        height: .48rem;
        margin: 0 .4rem .16rem .4rem; // 设置外边距，将input div挤到中间居中
        padding: 0 .16rem; // 设置内边距，将里面的输入框content与外面的input div留出距离
        background: #F9F9F9;
        border: 1px solid rgba(0,0,0,0.10);
        border-radius: 6px;  // 圆角
        &__content {
            line-height: .48rem;
            border: none;
            outline: none;
            width: 100%;
            background: none;
            font-size: .16rem;
            color: $content-notice-fontcolor;
            &::placeholder { // 伪元素选择器，选择input中的placeholder的样式
                color: $content-notice-fontcolor;
            }
        }
    }
    &__login-button {
        margin: .32rem .4rem .16rem .4rem;
        line-height: .48rem;
        background: #0091FF;
        box-shadow: 0 .04rem .08rem 0 rgba(0,145,255,0.32);
        border-radius: .04rem;
        color: #fff;
        font-size: .16rem;
        text-align: center;
    }
    &__login-link {
        text-align: center;
        font-size: .14rem;
        color: $content-notice-fontcolor;
    }
}

</style>
