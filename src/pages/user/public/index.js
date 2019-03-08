import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import http from '~/utils/http'
import event from '~/utils/event'
import PageState from '~/components/PageState'
import UserPanel from './panel/UserPanel'
import UserContent from './content/UserContent'
import './index.scss'

export default class extends Component {
  config = {
    navigationStyle: 'custom'
  }

  constructor(props) {
    super(props)
    this.state = {
      page_loading: true,
      page_error: false,
      user: null,
      share_data: null
    }
  }

  componentWillMount() {}

  componentDidMount() {
    this.getUser()
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  onReachBottom() {
    event.emit('on-reach-bottom')
  }

  getUser() {
    http
      .fetch(`user/${this.$router.params.zone}/show`)
      .then(user => {
        this.setState({
          user,
          share_data: user.share_data,
          page_loading: false
        })
      })
      .catch(() => {
        this.setState({
          page_loading: false,
          page_error: true
        })
      })
  }

  render() {
    if (this.state.page_loading) {
      return <PageState type='loading' />
    }
    if (this.state.page_error) {
      return <PageState type='error' />
    }
    const { user } = this.state
    return (
      <View className='public-user-home'>
        <UserPanel user={user} />
        <UserContent user={user} />
      </View>
    )
  }
}
