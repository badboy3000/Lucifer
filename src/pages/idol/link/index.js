import Taro, { Component } from '@tarojs/taro'
import { View, WebView } from '@tarojs/components'
import helper from '~/utils/helper'

export default class extends Component {
  render () {
    const { type, id } = this.$router.params
    return <web-view src={helper.webview(`wx-app/idol/${id}/${type}`)}/>
  }
}
