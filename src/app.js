import Layout from './components/layouts/layout.js'
import './styles/style.css'

const App = function () {
  var dom = document.getElementById('app')
  addLoadEvent(function () {
    let layout = new Layout()
    dom.innerHTML = layout.template({
      title: 'TEST',
      arr: [2, 4, 5, 6.2, 5]
    })
  })
}


function addLoadEvent(func) {
  var oldOnload = window.onload
  if (typeof window.onload != 'function')
    window.onload = func
  else {
    window.onload = function () {
      oldOnload()
      func()
    }
  }
}

new App()