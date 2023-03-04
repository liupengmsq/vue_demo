<template>
    <div class="wrapper">
        <img class="wrapper__img" src="@/assets/images/user.svg" alt="">
        <div class="wrapper__input">
            <input type="text" placeholder="请输入手机号" class="wrapper__input__content" v-model="username" />
        </div>
        <div class="wrapper__input">
            <input type="password" placeholder="请输入密码" autocomplete="new-password" class="wrapper__input__content" v-model="password" />
        </div>
        <div class="wrapper__input">
            <input type="password" placeholder="确认密码" autocomplete="new-password" class="wrapper__input__content" v-model="confirmPassword"/>
        </div>
        <div class="wrapper__register-button" @click="handleRegister">注册</div>
        <div class="wrapper__register-link" @click="handleGoToLogin">已有账号去登录</div>
    </div>
    <Toast v-if="show" :message="toastMessage" />
</template>

<script>
import { reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { post } from '../../utils/request';
import ToastComponent, { useToastEffect } from '../../components/ToastComponent.vue'

// 注册的页面逻辑
const useRegisterEffect = (showToast) => {
    const router = useRouter();

    const data = reactive({
        username: '',
        password: '',
        confirmPassword: ''
    });

    const handleRegister = async () => {
        console.log(data.password, data.confirmPassword);
        if (data.username === '' || data.password === '' || data.confirmPassword === '') {
            showToast('用户名或密码不能为空');
            return;
        }

        if (data.password !== data.confirmPassword) {
            console.log("Password doesn't matched");
            showToast('密码不匹配');
            return;
        }
        try {
            const result = await post('/api/user/register', {
                userName: data.username,
                password: data.password
            });
            if (result?.errorno === 0) {
                router.push({ name: 'login' });
            } else {
                showToast('登录失败');
            }
        } catch (e) {
            showToast('请求失败');
        }
    };

    const { username, password, confirmPassword } = toRefs(data);

    return { handleRegister, username, password, confirmPassword };
}

// 跳转登录页面的逻辑
const useGoToLoginEffect = () => {
    const router = useRouter();

    const handleGoToLogin = () => {
        router.push({ name: 'login' });
    };

    return { handleGoToLogin };
};

export default {
  name: 'RegisterPage',
  components: {
    Toast: ToastComponent
  },
  setup () {
    const { show, toastMessage, showToast } = useToastEffect();
    const { handleRegister, username, password, confirmPassword } = useRegisterEffect(showToast);
    const { handleGoToLogin } = useGoToLoginEffect();

    return {
        handleRegister, username, password, confirmPassword, handleGoToLogin, show, toastMessage
    }
  }
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
        border: .01rem solid rgba(0,0,0,0.10);
        border-radius: .06rem;  // 圆角
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
    &__register-button {
        margin: .32rem .4rem .16rem .4rem;
        line-height: .48rem;
        background: $btn-bgColor;
        box-shadow: 0 .04rem .08rem 0 rgba(0,145,255,0.32);
        border-radius: .04rem;
        color: $search-bgColor;
        font-size: .16rem;
        text-align: center;
    }
    &__register-link {
        text-align: center;
        font-size: .14rem;
        color: $content-notice-fontcolor;
    }
}

</style>
