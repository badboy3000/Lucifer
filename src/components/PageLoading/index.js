import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
import Loading from '~/images/loading.gif'

export default class extends Component {
  render () {
    return (
      <View className='page-loading'>
        <image
          src={Loading}
          mode='aspectFit'
        />
        <Text>加载中…</Text>
      </View>
    )
  }
}

