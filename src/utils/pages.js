/*
    支持路由懒加载
  使用注意点: 
    1. 页面中的 `name`属性必填,这将会成为router路由对象的name和path的组成部分
    2. 在routeMeta.js中,维护meta时,key必须为路由对象的name属性的值
*/

import metaData from '@/utils/routeMeta'
let files = require.context('../views', true, /\.vue$/)
const pages = {}
files.keys().forEach((key) => {
  pages[key.replace(/(\.\/|\.vue)/g, '')] = files(key).default
  pages[key.replace(/(\.\/|\.vue)/g, '')].filePath = key
    .split('/')
    .slice(1)
    .join('/')
})

let routeArr = []
let routeHasChildren = {}
let routeNoChildren = []
for (let key in pages) {
  let nameArr = key.split('/')
  if (nameArr.length > 2) {
    let obj = {
      name: pages[key].name,
      path: pages[key].name,
      component: () => import(`@/views/${pages[key].filePath}`),
    }
    if (metaData[pages[key].name]) {
      obj.meta = metaData[pages[key].name]
    }
    if (!routeHasChildren[nameArr[0]]) {
      routeHasChildren[nameArr[0]] = []
    }
    routeHasChildren[nameArr[0]].push(obj)
  } else {
    let obj = {
      name: pages[key].name,
      path: `/${pages[key].name}`,
      component: () => import(`@/views/${pages[key].filePath}`),
    }
    if (metaData[pages[key].name]) {
      obj.meta = metaData[pages[key].name]
    }
    routeNoChildren.push(obj)
  }
}
for (let key in routeNoChildren) {
  let name = routeNoChildren[key].name
  if (routeHasChildren[name]) {
    routeNoChildren[key].children = routeHasChildren[name]
  }
}
routeArr = [...routeNoChildren]
console.log(routeArr)

export default routeArr
