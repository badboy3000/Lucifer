import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import cache from '~/utils/cache'
import { AtList, AtListItem } from 'taro-ui'
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
      <View className='user-panel'>
        <AtList hasBorder={false}>
          <AtListItem title='我的主页' arrow='right' hasBorder={false} />
          <AtListItem title='交易记录' arrow='right' hasBorder={false} />
          <AtListItem title='我的邀请码' arrow='right' hasBorder={false} extraText='邀请送团子' />
          <AtListItem title='帮助手册' arrow='right' hasBorder={false} />
          <AtListItem title='意见反馈' arrow='right' hasBorder={false} />
        </AtList>
      </View>
    )
  }
}

