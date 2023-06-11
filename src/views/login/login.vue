<template>
    <div class="login-container">
        <span class="login-img"></span>
        <div class="login-card">
            <div class="login-title">管理员登录</div>
            <el-form ref="formRef" :model="formData" status-icon :rules="rules" class="login-form demo-ruleForm">
                <el-form-item prop="loginName">
                    <el-input :prefix-icon="UserFilled" placeholder="账号" v-model="formData.loginName" autocomplete="off" />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input :prefix-icon="Lock" placeholder="密码" v-model="formData.password" type="password"
                        autocomplete="off" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm(formRef)">
                        登录
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup>
import { UserFilled, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { login } from '@/api/user.js';
import { userStore } from '@/store/userStore.js';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const $router = useRouter()
const store = userStore()
const {user} = storeToRefs(store)

const formRef = ref()

// 表单数据
const formData = reactive({
    loginName: '',
    password: '',
    agreement: true
})
// 校验规则
const rules = reactive({
    loginName: [
        { required: true, message: '请输入账号', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ],
})
// 登录
const submitForm = () => {
    formRef.value.validate((valid) => {
        if (valid) {
            // 模拟登录
            store.setToken('admin')
            $router.push('/')
            // login(formData).then((data) => {
            //     if (data.data.code === 1000) {
            //         user.value = { ...data.data.data }
            //         store.setToken(data.data.data.token)
            //         $router.push('/')
            //     }
            // })
        } else {
            console.log(222)
        }
    })
}

</script>

<style lang="scss" scoped>
.login-container {
    display: flex;
    justify-content: space-between;
    height: 100%;

    .login-img {
        background: url() center center / cover no-repeat;
        flex: 1;
    }

    .login-card {
        background: #fff;
        padding: 170px 60px 180px;
        width: 300px;
    }
}

.login-title {
    color: #303133;
    font-weight: bold;
    font-size: 1rem;
}

.login-form {
    margin-top: 1.2rem;
}

.login-card button {
    margin-top: 1rem;
    width: 100%;
}
</style>