import axios from "axios";
const axiosInstance = axios.create({
    // amazon backend deployed on WebGL2RenderingContext.com 
    baseURL:'https://amazon-api-deploy-hzrs.onrender.com/',
});
export {axiosInstance};