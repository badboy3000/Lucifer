import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import './index.scss'

export default class extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  toIdolPage(idolId) {
    Taro.navigateTo({
      url: `/pages/idol/show/index?id=${idolId}`
    })
  }

  render() {
    return (
      <View>
        <Text>首页</Text>
        <AtButton type='primary' onClick={() => this.toIdolPage(22)}>
          按钮文案
        </AtButton>
      </View>
    )
  }
}
