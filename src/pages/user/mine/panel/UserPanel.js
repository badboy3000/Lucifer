import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import helper from '~/utils/helper'
import { AtAvatar, AtIcon, AtButton } from 'taro-ui'
import http from '~/utils/http'
import state from '~/utils/state'
import './index.scss'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      signing: false
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  daySignAction() {
    if (this.props.user.daySign || this.state.signing) {
      return
    }
    this.setState({
      signing: true
    })
    http.post('user/daySign')
      .then(res => {
        this.setState({
          signing: false
        })
        state.updateUserExp(res, {
          daySign: true
        })
      })
      .catch(() => {
        this.setState({
          signing: false
        })
      })
  }

  render () {
    const { user } = this.props
    if (!user) {
      return
    }

    return (
      <View className='user-panel'>
        <View className='intro'>
          <View className='avatar'>
            <AtAvatar
              circle
              size='large'
              image={helper.resize(user.avatar, { width: 200 })}
            />
          </View>
          <View className='text'>
            <View className='nickname'>{user.nickname}</View>
            <Text className='invite'>邀请码：{user.id}</Text>
          </View>
          <View className='arrow'>
            <AtIcon value='chevron-right' size='20' color='#657786' />
          </View>
        </View>
        <View className='control'>
          <View className='metas'>
            <View className='meta'>
              <View className='count'>{user.power}</View>
              <View className='name'>战斗力</View>
            </View>
            <View className='meta'>
              <View className='count'>{user.banlance.coin_count}</View>
              <View className='name'>团子</View>
            </View>
            <View className='meta'>
              <View className='count'>{user.exp.level}</View>
              <View className='name'>等级</View>
            </View>
          </View>
          <View className="day-sign">
            <AtButton
              loading={this.state.signing}
              circle
              type={this.props.user.daySign ? 'secondary' : 'primary'}
              onClick={this.daySignAction}
            >{this.props.user.daySign ? '已签到' : '签到'}</AtButton>
          </View>
        </View>
      </View>
    )
  }
}

