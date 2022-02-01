//所有api统一管理模块
import requests from './request';
import mockRquests from './mockAjax';

//三级联动接口
//三级联动菜单请求地址：/api/product/getBaseCategoryList  请求方式：get  无参数
//发请求:axios发请求返回的结果是Promise对象 （axios发请求对象写法）
//对外暴露一个函数，只要外部使用这个函数，就会发起ajax请求，获取三级联动数据。这个函数只需要把服务器返回结果返回即可。
export const reqCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' });

//获取banner（home轮播图接口）
export const reqGetBannerList = () => mockRquests.get('/banner');

//获取floor组件数据
export const reqFloorList = () => mockRquests.get('/floor');

//获取search组件数据 地址：/api/list 请求方式：post  有参数(10个)
/**
 * 参数：category1Id，category2Id，category3Id，categoryName，keyword，props，trademark，order，pageNo，pageSize
 * 是否必选：N（none的意思）
 */
//搜索发请求需要带参数   （axios发请求函数写法）
//当前这个接口(获取搜索模块的数据)，给服务器传递一个默认参数params【至少是一个空对象】。
export const reqGetSearchInfo = (params) => requests({ url: '/list', method: 'post', data: params });
