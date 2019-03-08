import Taro, { Component } from '@tarojs/taro'

export default class extends Component {
  config = {
    navigationBarTitleText: '帮助手册'
  }

  render() {
    return (<web-view src='https://m.calibur.tv/app/handbook/'/>)
  }
}
