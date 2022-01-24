//所有api统一管理模块
import requests from './request';

//三级联动接口
///api/product/getBaseCategoryList  get  无参数
//发请求:axios发请求返回的结果是Promise对象
export const reqCategoryList = ()=> requests({url:'/product/getBaseCategoryList',method:'get'});
