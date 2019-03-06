import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtAvatar, AtButton } from 'taro-ui'
import helper from '~/utils/helper'
import './index.scss'
import StarIdolBtn from '../star_btn/StarIdolBtn'
import SaleIdolBtn from '../sale_btn/SaleIdolBtn'

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
          <View className="shim"/>
          <View className='background-content'>
            <AtAvatar
              circle
              image={helper.resize(idol.avatar, { width: 200 })}
              size='large'
            />
            <View className='name'>{idol.name}</View>
            <View className="controls">
              <StarIdolBtn idol={idol} onUpdateStar={onUpdateStar}/>
              <SaleIdolBtn idol={idol}/>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

