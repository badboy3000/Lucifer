import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'
import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/deal/hall/index',
      'pages/deal/create/index',
      'pages/deal/show/index',
      'pages/idol/create/index',
      'pages/idol/edit/index',
      'pages/idol/show/index',
      'pages/user/mine/index',
      'pages/user/handbook/index',
      'pages/user/public/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '二次元股市',
      navigationBarTextStyle: 'black',
      enablePullDownRefresh: true,
    },
    tabBar: {
      color: '#888888',
      selectedColor: '#ffb7c5',
      backgroundColor: '#ffffff',
      borderStyle: 'white',
      position: 'bottom',
      list: [
        {
          pagePath: 'pages/index/index',
          text: '首页'
        },
        {
          pagePath: 'pages/deal/hall/index',
          text: '交易所'
        },
        {
          pagePath: 'pages/user/mine/index',
          text: '我的'
        }
      ]
    },
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
