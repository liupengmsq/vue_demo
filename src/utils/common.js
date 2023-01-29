// 此方法通过使用vue cli基于的webpackage提供的require方法，
// 它在代码编译时，将图片的相对路径转为npm服务端的网络地址
export const getImgUrl = (img) => {
    return require('@/assets/images/' + img)
};
