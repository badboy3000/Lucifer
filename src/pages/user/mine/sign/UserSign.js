import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import wechatLogin from '~/utils/login'
import './index.scss'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  callWechatSign() {
    wechatLogin()
    /*
    wx.getUserInfo({
      withCredentials: true,
      success(data) {
        console.log('success')
        console.log(data)
      },
      fail(err) {
        console.log('fail')
        console.log(err)
      }
    })
    */
  }

  render () {
    return (
      <View>
        <Text>用户登录与注册</Text>
        <AtButton
          type='primary'
          openType='getUserInfo'
          onClick={this.callWechatSign}
        >微信登录</AtButton>
      </View>
    )
  }
}

