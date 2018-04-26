import './layout.less'
// 这里引入一个function,不再是一个html字符串
import template from './layout.ejs'

function Layout () {
  return {
    // 返回一个Object
    template: template
  }
}


export default Layout