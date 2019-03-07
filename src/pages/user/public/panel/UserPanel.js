import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtTag, AtNavBar } from 'taro-ui'
import helper from '~/utils/helper'
import './index.scss'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { user } = this.props
    if (!user) {
      return
    }
    const badges = user.badge.map(badge => {
      const key = Math.random().toString(36).slice(2, -1)
      return (
        <AtTag
          key={key}
          taroKey={key}
          size='small'
          circle
        >{badge.name}</AtTag>
      )
    })
    return (
      <View class='public-user-panel'>
        <View className='background'>
          <View className='shim'/>
          <image
            src={helper.resize(user.banner, {
              height: 300,
              mode: 2
            })}
            mode='aspectFill'
          />
          <AtNavBar
            color='#fff'
            leftIconType='chevron-left'
            border={false}
            onClickLeftIcon={() => {
              wx.navigateBack()
            }}
          />
        </View>
        <View className='profile'>
          <View className='user'>
            <image
              src={helper.resize(user.avatar, {
                height: 160,
                mode: 2
              })}
              mode='aspectFill'
              class='avatar'
            />
            <View className='nickname-wrap'>
              <Text className='nickname'>
                {user.nickname}
              </Text>
              <Text className="level">
                LV{user.level}
              </Text>
            </View>
          </View>
          <View className='badges'>
            {badges}
          </View>
          <View className="intro">
            {user.signature}
          </View>
          <View className='metas'>
            <View className='meta'>
              <View className='count'>{user.power}</View>
              <View className='name'>战斗力</View>
            </View>
            <View className='meta'>
              <View className='count'>{parseFloat(user.banlance.coin_count).toFixed(2)}</View>
              <View className='name'>团子</View>
            </View>
            <View className='meta'>
              <View className='count'>{parseFloat(user.banlance.light_count).toFixed(2)}</View>
              <View className='name'>光玉</View>
            </View>
          </View>
        </View>
        <View className='hr' />
      </View>
    )
  }
}

