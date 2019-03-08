import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtAvatar, AtButton, AtNavBar } from 'taro-ui'
import helper from '~/utils/helper'
import './index.scss'
import StarIdolBtn from '../star_btn/StarIdolBtn'
import SaleIdolBtn from '../sale_btn/SaleIdolBtn'

export default class IdolPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const { idol, onUpdateStar } = this.props
    return (
      <View className='idol-panel'>
        <View className='background'>
          <image
            src={helper.resize(idol.avatar, {
              height: 200,
              mode: 2
            })}
            mode='aspectFill'
            class='blur-bg'
          />
          <View className='shim' />
          <AtNavBar
            color='#fff'
            leftIconType='chevron-left'
            leftText={idol.name}
            border={false}
            onClickLeftIcon={() => {
              wx.navigateBack()
            }}
          />
          <View className='background-content'>
            <image
              src={helper.resize(idol.avatar, { width: 200 })}
              mode='aspectFill'
              class='avatar'
            />
            <View className='controls'>
              <StarIdolBtn idol={idol} onUpdateStar={onUpdateStar} />
              <SaleIdolBtn idol={idol} />
            </View>
          </View>
        </View>
      </View>
    )
  }
}

IdolPanel.defaultProps = {
  idol: {}
}
