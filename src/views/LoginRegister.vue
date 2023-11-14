<template>
  <div class="container" :class="{ 'sign-up-mode': signUpMode }">
    <!-- form表单容器 -->
    <div class="form-container">
      <div class="signin-signup">
        <!-- 登录 -->
        <el-form
            :model="loginUser"
            :rules="loginRules"
            ref="loginForm"
            label-width="100px"
            class="login-form sign-in-form"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="loginUser.name" placeholder="用户名" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
                v-model="loginUser.password"
                type="password"
                placeholder="密码"
            />
          </el-form-item>
          <el-form-item>
            <el-button
                @click="handleLogin('loginForm')"
                type="primary"
                class="submit-btn"
            >提交</el-button
            >
          </el-form-item>
          <!-- 找回密码 -->
          <el-form-item>
            <p class="tiparea">忘记密码<a>立即找回</a></p>
          </el-form-item>
        </el-form>
        <!-- 注册 -->
        <el-form
            :model="registerUser"
            :rules="registerRules"
            ref="registerForm"
            label-width="100px"
            class="register-form sign-up-form"
        >
          <el-form-item label="用户名" prop="name">
            <el-input v-model="registerUser.name"  placeholder="用户名" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
                v-model="registerUser.password"
                type="password"
                placeholder="输入密码"
            />
          </el-form-item>
          <el-form-item label="确认密码" prop="password2">
            <el-input
                v-model="registerUser.password2"
                type="password"
                placeholder="确认密码"
            />
          </el-form-item>
          <el-form-item label="角色" prop="role">
            <el-select v-model="registerUser.role">
              <el-option label="教师" value="教师"></el-option>
              <el-option label="学生" value="学生"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
                @click="handleRegister('registerForm')"
                type="primary"
                class="submit-btn"
            >提交</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 左右切换动画 -->
    <div class="panels-container">
      <div class="panel left-panel">
        <div class="content">
          <h3>Row,row,row your boat</h3>
          <p>Gentlely down the stream</p>
          <button @click="signUpMode = !signUpMode" class="btn transparent">
            注册
          </button>
        </div>
        <!-- <img src="@/assets" alt=""> -->
      </div>
      <div class="panel right-panel">
        <div class="content">
          <h3>Merrily,merrily,merrily,merrily,</h3>
          <p>Life is but a dream</p>
          <button @click="signUpMode = !signUpMode" class="btn transparent">
            登录
          </button>
        </div>
        <!-- <img src="@/assets" alt=""> -->
      </div>
    </div>
  </div>
</template>

<script>
import {getCurrentInstance, ref} from 'vue'
import axios from "axios";
import {useRouter} from 'vue-router'
import {loginUser,loginRules} from "@/utils/loginValidators";
import {registerUser,registerRules} from "@/utils/registerValidators";
export default {
  name: 'LoginRegister',
  setup() {
    // 登录/注册模式
    const signUpMode = ref(false)
    const router=useRouter()
    const {ctx}=getCurrentInstance()
    const handleLogin = (formName) => {
      ctx.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post(
              "http://127.0.0.1:5001/login",
              loginUser,
              {headers:{"Content-Type":"application/json;charset=UTF-8"}}
          ).then(function (response){
            let res=response.data.result
            if(response.data.code==200){
              localStorage.setItem("userinfo",JSON.stringify(res))
              if(res.role=="教师"){
                router.push("/teacherIndex")
              }else {
                router.push("/studentIndex")
              }

            }else {
              alert("用户名或密码错误")
            }

          })
        } else {
          console.log('error submit!')
          return false
        }
      })
    }
    const handleRegister = (formName) => {
      ctx.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post(
              "http://127.0.0.1:5001/register",
              registerUser,
              {headers:{"Content-Type":"application/json;charset=UTF-8"}}
          ).then(function (response){
            if(response.data=="注册成功"){
              alert("注册成功")
              router.push('/login')
            }else {
              alert("用户名已存在")
            }

          })
        } else {
          return false
        }
      })
    }
    return { signUpMode, loginUser, loginRules,handleLogin,registerUser,registerRules,handleRegister}
  }
}
</script>

<style scoped>
.container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
  overflow: hidden;
}
.form-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.signin-signup {
  position: relative;
  top: 50%;
  left: 75%;
  transform: translate(-50%, -50%);
  width: 44%;
  transition: 1s 0.7s ease-in-out;
  display: grid;
  grid-template-columns: 1fr;
  z-index: 5;
}

/* 左右切换动画 */
.social-text {
  padding: 0.7rem 0;
  font-size: 1rem;
}

.social-media {
  display: flex;
  justify-content: center;
}

.social-icon {
  height: 46px;
  width: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0.45rem;
  color: #333;
  border-radius: 50%;
  border: 1px solid #333;
  text-decoration: none;
  font-size: 1.1rem;
  transition: 0.3s;
}

.social-icon:hover {
  color: #4481eb;
  border-color: #4481eb;
}

.btn {
  width: 150px;
  background-color: #5995fd;
  border: none;
  outline: none;
  height: 49px;
  border-radius: 49px;
  color: #fff;
  text-transform: uppercase;
  font-weight: 600;
  margin: 10px 0;
  cursor: pointer;
  transition: 0.5s;
}

.btn:hover {
  background-color: #4d84e2;
}
.panels-container {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.container:before {
  content: '';
  position: absolute;
  height: 2000px;
  width: 2000px;
  top: -10%;
  right: 48%;
  transform: translateY(-50%);
  background-image: linear-gradient(-45deg, #4481eb 0%, #04befe 100%);
  transition: 1.8s ease-in-out;
  border-radius: 50%;
  z-index: 6;
}

.image {
  width: 100%;
  transition: transform 1.1s ease-in-out;
  transition-delay: 0.4s;
}

.panel {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
  text-align: center;
  z-index: 6;
}

.left-panel {
  pointer-events: all;
  padding: 3rem 17% 2rem 12%;
}

.right-panel {
  pointer-events: none;
  padding: 3rem 12% 2rem 17%;
}

.panel .content {
  color: #fff;
  transition: transform 0.9s ease-in-out;
  transition-delay: 0.6s;
}

.panel h3 {
  font-weight: 600;
  line-height: 1;
  font-size: 1.5rem;
}

.panel p {
  font-size: 0.95rem;
  padding: 0.7rem 0;
}

.btn.transparent {
  margin: 0;
  background: none;
  border: 2px solid #fff;
  width: 130px;
  height: 41px;
  font-weight: 600;
  font-size: 0.8rem;
}

.right-panel .image,
.right-panel .content {
  transform: translateX(800px);
}

/* ANIMATION */

.container.sign-up-mode:before {
  transform: translate(100%, -50%);
  right: 52%;
}

.container.sign-up-mode .left-panel .image,
.container.sign-up-mode .left-panel .content {
  transform: translateX(-800px);
}

.container.sign-up-mode .signin-signup {
  left: 25%;
}

.container.sign-up-mode form.sign-up-form {
  opacity: 1;
  z-index: 2;
}

.container.sign-up-mode form.sign-in-form {
  opacity: 0;
  z-index: 1;
}

.container.sign-up-mode .right-panel .image,
.container.sign-up-mode .right-panel .content {
  transform: translateX(0%);
}

.container.sign-up-mode .left-panel {
  pointer-events: none;
}

.container.sign-up-mode .right-panel {
  pointer-events: all;
}

@media (max-width: 870px) {
  .container {
    min-height: 800px;
    height: 100vh;
  }
  .signin-signup {
    width: 100%;
    top: 95%;
    transform: translate(-50%, -100%);
    transition: 1s 0.8s ease-in-out;
  }

  .signin-signup,
  .container.sign-up-mode .signin-signup {
    left: 50%;
  }

  .panels-container {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 2fr 1fr;
  }

  .panel {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 2.5rem 8%;
    grid-column: 1 / 2;
  }

  .right-panel {
    grid-row: 3 / 4;
  }

  .left-panel {
    grid-row: 1 / 2;
  }

  .image {
    width: 200px;
    transition: transform 0.9s ease-in-out;
    transition-delay: 0.6s;
  }

  .panel .content {
    padding-right: 15%;
    transition: transform 0.9s ease-in-out;
    transition-delay: 0.8s;
  }

  .panel h3 {
    font-size: 1.2rem;
  }

  .panel p {
    font-size: 0.7rem;
    padding: 0.5rem 0;
  }

  .btn.transparent {
    width: 110px;
    height: 35px;
    font-size: 0.7rem;
  }

  .container:before {
    width: 1500px;
    height: 1500px;
    transform: translateX(-50%);
    left: 30%;
    bottom: 68%;
    right: initial;
    top: initial;
    transition: 2s ease-in-out;
  }

  .container.sign-up-mode:before {
    transform: translate(-50%, 100%);
    bottom: 32%;
    right: initial;
  }

  .container.sign-up-mode .left-panel .image,
  .container.sign-up-mode .left-panel .content {
    transform: translateY(-300px);
  }

  .container.sign-up-mode .right-panel .image,
  .container.sign-up-mode .right-panel .content {
    transform: translateY(0px);
  }

  .right-panel .image,
  .right-panel .content {
    transform: translateY(300px);
  }

  .container.sign-up-mode .signin-signup {
    top: 5%;
    transform: translate(-50%, 0);
  }
}

@media (max-width: 570px) {
  form {
    padding: 0 1.5rem;
  }

  .image {
    display: none;
  }
  .panel .content {
    padding: 0.5rem 1rem;
  }
  .container {
    padding: 1.5rem;
  }

  .container:before {
    bottom: 72%;
    left: 50%;
  }

  .container.sign-up-mode:before {
    bottom: 28%;
    left: 50%;
  }
}

/* 控制login & register显示 */
form {
  padding: 0rem 5rem;
  transition: all 0.2s 0.7s;
  overflow: hidden;
}

form.sign-in-form {
  z-index: 2;
}

form.sign-up-form {
  opacity: 0;
  z-index: 1;
}

/* register */
.loginForm,
.registerForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit-btn {
  width: 100%;
}
.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
  width: 100%;
}
.tiparea a {
  color: #409eff;
}
</style>

