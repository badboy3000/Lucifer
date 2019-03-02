import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

export default class extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <View>
        <Text>text</Text>
      </View>
    )
  }
}

