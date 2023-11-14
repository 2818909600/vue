import { ref, reactive  } from 'vue'

interface User{
    name: string;
    password: string;
}

// 登录表单
export const loginUser = reactive<User>({
    name: '',
    password: ''
})

interface Rules{
    name: {
        required: boolean;
        message: string;
        trigger: string;
    }[];
    password: ({
        required: boolean;
        message: string;
        trigger: string;
        min?: undefined;
        max?: undefined;
    } | {
        min: number;
        max: number;
        message: string;
        trigger: string;
        required?: undefined;
    })[];
}

// 校验规则
export const loginRules = reactive<Rules>({
    name: [
        {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
        }
    ],
    password: [
        { required: true, message: '密码不得为空', trigger: 'blur' },
        { min: 6, max: 30, message: '密码长度必须在6到30之间', trigger: 'blur' }
    ]
})
