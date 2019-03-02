import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import cache from '~/utils/cache'
import event from '~/utils/event'
import './index.scss'
import UserSign from './sign/UserSign'

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

  render() {
    if (this.state.user === null) {
      return <UserSign />
    }

    return (
      <View>
        <Text>text</Text>
      </View>
    )
  }
}
