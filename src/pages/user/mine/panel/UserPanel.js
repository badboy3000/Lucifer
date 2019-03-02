import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import cache from '~/utils/cache'
import helper from '~/utils/helper'
import { AtAvatar, AtIcon, AtButton } from 'taro-ui'
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
        <View className='intro'>
          <View className='avatar'>
            <AtAvatar
              circle
              size='large'
              image={helper.resize(this.state.user.avatar, { width: 200 })}
            />
          </View>
          <View className='text'>
            <View className='nickname'>{this.state.user.nickname}</View>
            <Text className='invite'>邀请码：{this.state.user.id}</Text>
          </View>
          <View className='arrow'>
            <AtIcon value='chevron-right' size='20' color='#657786' />
          </View>
        </View>
        <View className='control'>
          <View className='metas'>
            <View className='meta'>
              <View className='count'>{this.state.user.power}</View>
              <View className='name'>战斗力</View>
            </View>
            <View className='meta'>
              <View className='count'>{this.state.user.banlance.coin_count}</View>
              <View className='name'>团子</View>
            </View>
            <View className='meta'>
              <View className='count'>{this.state.user.exp.level}</View>
              <View className='name'>等级</View>
            </View>
          </View>
          <AtButton
            circle
            type='primary'
          >签到</AtButton>
        </View>
      </View>
    )
  }
}

