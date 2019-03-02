import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtForm, AtInput, AtButton } from 'taro-ui'
import { wechatLogin, accessLogin } from '~/utils/login'
import toast from '~/utils/toast'
import './index.scss'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      access: '',
      secret: ''
    }
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  callWechatSign() {
    wechatLogin()
  }

  changeAccess (value) {
    this.setState({
      access: value
    })
  }

  changeSecret (value) {
    this.setState({
      secret: value
    })
  }

  onSubmit () {
    const { access, secret } = this.state
    if (
      !access ||
      !access.length === 11 ||
      !/^(0|86|17951)?(1)[0-9]{10}$/.test(access)
    ) {
      return toast.info('请输入正确的手机号')
    }
    if (
      !secret ||
      secret.length < 6 ||
      secret.length > 16
    ) {
      return toast.info('密码错误')
    }
    accessLogin({ access, secret })
      .then(user => {
        console.log(user)
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <View className='user-sign'>
        <AtForm onSubmit={this.onSubmit.bind(this)}>
          <AtInput
            name='access'
            border={true}
            title='手机'
            type='phone'
            placeholder='手机号码'
            value={this.state.access}
            onChange={this.changeAccess.bind(this)}
          />
          <AtInput
            name='secret'
            title='密码'
            type='password'
            placeholder='密码不能少于6位数'
            clear={true}
            border={true}
            value={this.state.secret}
            onChange={this.changeSecret.bind(this)}
          />
          <AtButton
            type='primary'
            formType='submit'
          >账号登录</AtButton>
        </AtForm>
        <AtButton
          type='primary'
          openType='getUserInfo'
          onClick={this.callWechatSign}
        >
          微信登录
        </AtButton>
      </View>
    )
  }
}
