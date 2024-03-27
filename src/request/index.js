import axios from 'axios'

let service = axios.create({
    baseURL:'https://service-1rj2vv8q-1323828269.gz.tencentapigw.com.cn/release',
    timeout:10000,
})
export default service 