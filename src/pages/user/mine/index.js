import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import cache from '~/utils/cache'
import event from '~/utils/event'
import { AtButton } from 'taro-ui'
import UserSign from './sign/UserSign'
import UserPanel from './panel/UserPanel'
import UserTable from './table/UserTable'
import './index.scss'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: cache.get('USER', null)
    }
  }

  componentWillMount() {}

  componentDidMount() {
    event.on('user-signed', () => this.refreshUser())
  }

  componentWillUnmount() {
    event.off('user-signed')
  }

  componentDidShow() {
    this.refreshUser()
  }

  componentDidHide() {}

  refreshUser() {
    this.setState({
      user: cache.get('USER', null)
    })
  }

  userLogout() {
    cache.remove('JWT_TOKEN')
    cache.remove('USER')
    this.refreshUser()
  }

  render() {
    if (this.state.user === null) {
      return <UserSign />
    }

    return (
      <View className='user-home'>
        <UserPanel />
        <View className='hr' />
        <UserTable />
        <AtButton type='primary' onClick={this.userLogout}>
          退出登录
        </AtButton>
      </View>
    )
  }
}
