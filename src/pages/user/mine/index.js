import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import cache from '~/utils/cache'
import './index.scss'
import UserSign from './sign/UserSign'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: cache.get('USER', null)
    }
  }

  componentWillMount () {
    console.log('componentWillMount')
  }

  componentDidMount () {
    console.log('user', this.state.user)
    console.log('componentDidMount')
  }

  componentWillUnmount () {
    console.log('componentWillUnmount')
  }

  componentDidShow () {
    console.log('componentDidShow')
  }

  componentDidHide () {
    console.log('componentDidHide')
  }

  render () {
    if (this.state.user === null) {
      return (
        <UserSign />
      )
    }

    return (
      <View>
        <Text>text</Text>
      </View>
    )
  }
}

