/*
    支持路由懒加载
  使用注意点: 
    1. 页面中的 `name`属性必填,这将会成为router路由对象的name和path的组成部分
    2. 在routeMeta.js中,维护meta时,key必须为路由对象的name属性的值
    3. 扩展到了三级路由 
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
let threeLevelRoute = {}
let twoLevelRoute = {}
let oneLevelRoute = {}
for (let key in pages) {
  let nameArr = key.split('/')
  if (nameArr.length == 2) {
    let obj = {
      name: pages[key].name,
      path: `/${pages[key].name}`,
      component: () => import(`@/views/${pages[key].filePath}`),
    }
    if (metaData[pages[key].name]) {
      obj.meta = metaData[pages[key].name]
    }
    oneLevelRoute[nameArr[0]] = obj
  } else if (nameArr.length == 3) {
    let obj = {
      name: pages[key].name,
      path: pages[key].name,
      component: () => import(`@/views/${pages[key].filePath}`),
      father: nameArr[0],
    }
    if (metaData[pages[key].name]) {
      obj.meta = metaData[pages[key].name]
    }
    if (!twoLevelRoute[nameArr[1]]) {
      twoLevelRoute[nameArr[1]] = []
    }
    twoLevelRoute[nameArr[1]] = obj
  } else if (nameArr.length == 4) {
    let obj = {
      name: pages[key].name,
      path: pages[key].name,
      component: () => import(`@/views/${pages[key].filePath}`),
      father: nameArr[1],
    }
    if (metaData[pages[key].name]) {
      obj.meta = metaData[pages[key].name]
    }
    if (!threeLevelRoute[nameArr[2]]) {
      threeLevelRoute[nameArr[2]] = []
    }
    threeLevelRoute[nameArr[2]] = obj
  }
}

for (let key in threeLevelRoute) {
  let fatherName = threeLevelRoute[key].father
  if (!twoLevelRoute[fatherName].children) {
    twoLevelRoute[fatherName].children = []
  }
  twoLevelRoute[fatherName].children.push(threeLevelRoute[key])
}

for (let key in twoLevelRoute) {
  let fatherName = twoLevelRoute[key].father
  if (!oneLevelRoute[fatherName].children) {
    oneLevelRoute[fatherName].children = []
  }
  oneLevelRoute[fatherName].children.push(twoLevelRoute[key])
}

for (let key in oneLevelRoute) {
  routeArr.push(oneLevelRoute[key])
}
console.log(routeArr)

export default routeArr
