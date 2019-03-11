import Taro, { Component } from '@tarojs/taro'
import helper from '~/utils/helper'

export default class extends Component {
  config = {
    navigationBarTitleText: '帮助手册'
  }

  render() {
    return <web-view src={helper.webview('app/handbook/')} />
  }
}
