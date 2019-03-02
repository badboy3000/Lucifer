import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import cache from '~/utils/cache'
import './index.scss'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: cache.get('USER', null)
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View>
        <Text>user table</Text>
      </View>
    )
  }
}

