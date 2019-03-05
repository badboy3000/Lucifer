import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtTag } from 'taro-ui'
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
            <Text className='nickname'>
              {user.nickname}
            </Text>
          </View>
          <View className='badges'>
            {badges}
          </View>
          <View className="intro">
            {user.signature}
          </View>
          <View className='metas'>
            <Text className='meta'>
              <Text className='count'>{user.power}</Text>
              <Text className='name'>战斗力</Text>
            </Text>
            <Text className='meta'>
              <Text className='count'>{user.banlance.coin_count}</Text>
              <Text className='name'>团子</Text>
            </Text>
            <Text className='meta'>
              <Text className='count'>{user.banlance.light_count}</Text>
              <Text className='name'>光玉</Text>
            </Text>
          </View>
        </View>
      </View>
    )
  }
}

