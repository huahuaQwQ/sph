// 存储token
export const setToken = (token) => {
    //持久化存储token 本地存储localStorage
    localStorage.setItem("TOKEN", token);
};
// 获取token
export const getToken = () => {
    return localStorage.getItem("TOKEN");
};
//清除token
export const removeToken = () => {
    localStorage.removeItem("TOKEN");
}