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
      loading: false,
      submitting: false,
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
    if (this.state.loading || this.state.submitting) {
      return
    }
    this.setState({
      submitting: true
    })
    wechatLogin()
      .then(() => {})
      .catch(err => {
        toast.info(err.message)
        this.setState({
          submitting: false
        })
      })
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
    if (this.state.loading || this.state.submitting) {
      return
    }
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
    this.setState({
      loading: true
    })
    accessLogin({ access, secret })
      .then(() => {})
      .catch(() => {
        this.setState({
          loading: false
        })
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
            loading={this.state.loading}
            type='primary'
            formType='submit'
          >账号登录</AtButton>
        </AtForm>
        <AtButton
          loading={this.state.submitting}
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
