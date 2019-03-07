import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
import Loading from '~/images/loading.gif'
import nothing from '~/images/page_nothing.png'
import error from '~/images/page_error.png'

export default class extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    const type = this.props.type || 'nothing'
    return (
      type === 'nothing'
        ? <View className='page-nothing'>
            <image
              src={nothing}
              mode='aspectFit'
            />
            <Text>这里什么都没有</Text>
          </View>
        : <View className='page-preload'>
            <image
              src={type === 'loading' ? Loading : error}
              mode='aspectFit'
            />
            <Text>{type === 'loading' ? '加载中…' : '页面错误，请稍后再试'}</Text>
          </View>
    )
  }
}

