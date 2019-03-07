import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import helper from '~/utils/helper'
import './index.scss'

export default class extends Component {
  constructor (props) {
    super(props)
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const { deal } = this.props
    const { user, idol } = deal
    return (
      <navigator
        url={`/pages/deal/show/index?id=${deal.id}`}
        hover-class='none'
        class='deal-item'
      >
        <View className='header'>
          <image
            src={helper.resize(idol.avatar, { width: 120 })}
            mode='aspectFill'
            class='avatar'
          />
          <View className='info'>
            <View className="name">{idol.name}</View>
            {
              user && <View className='meta'>
                交易人：{ user.nickname }
              </View>
            }
          </View>
        </View>
        <View className="main">
          <View className="title">股价详情：</View>
          <View className='item'>当前市值：￥{ idol.market_price }</View>
          <View className='item'>每股股价：￥{ idol.stock_price }</View>
          <View className='item'>发行股数：{ idol.star_count }股</View>
          <View className="title">交易详情：</View>
          <View className='item'>交易编号：# { deal.id }</View>
          <View className='item'>出售股价：￥{ deal.product_price }</View>
          <View className='item'>出售股数：{ deal.product_count }</View>
          <View className='item'>已成交额：{parseFloat(deal.product_count - deal.last_count).toFixed(2)}股</View>
        </View>
        <View className="footer">
          <Text className='meta'>发起时间：{ deal.created_at.split(' ')[0] }</Text>
          <Text className='btn'>{user ? '马上交易' : '查看交易'}</Text>
        </View>
      </navigator>
    )
  }
}
