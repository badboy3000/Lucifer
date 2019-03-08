import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import helper from '~/utils/helper'
import './index.scss'

export default class IdolItem extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const { idol, sort } = this.props
    return (
      <navigator
        url={`/pages/idol/show/index?id=${idol.id}`}
        hover-class='none'
        class='idol-item'
      >
        <View className='header'>
          <image
            src={helper.resize(idol.avatar, { width: 120 })}
            mode='aspectFill'
            class='avatar'
          />
          <View className='info'>
            <View className="name">{idol.name}</View>
            <View className='meta'>
              ￥{ idol.stock_price }/股，{ idol.fans_count }人持股，已认购{idol.star_count}股
            </View>
          </View>
        </View>
        <View className="main">
          <View className='item'>
            <Text className='key'>总市值：</Text>
            <Text className='val'>{idol.company_state ? `￥${idol.market_price}` : `差${20 - idol.fans_count}人上市`}</Text>
          </View>
          {
            idol.boss &&
            <View className='item'>
              <Text className='key'>大股东：</Text>
              <image
                src={helper.resize(idol.boss.avatar, { width: 100 })}
                mode='aspectFill'
                class='val img'
              />
            </View>
          }
          {
            idol.manager &&
            <View className='item'>
              <Text className='key'>经纪人：</Text>
              <image
                src={helper.resize(idol.manager.avatar, { width: 100 })}
                mode='aspectFill'
                class='val img'
              />
            </View>
          }
        </View>
        <View className='footer'>
          <Text className='meta'>
            {sort === 'user'
              ? `持有：${idol.has_star}股，占比 ${`${parseFloat(
                (idol.has_star / idol.star_count) * 100
              ).toFixed(2)}%`}`
              : idol.ipo_at
                ? `上市时间：${idol.ipo_at.split(' ')[0]}`
                : `注册时间：${idol.created_at.split(' ')[0]}`
            }
          </Text>
          <Text className='btn'>
            {sort === 'user' ? '查看数据' : '马上入股'}
          </Text>
        </View>
      </navigator>
    )
  }
}

IdolItem.defaultProps = {
  idol: {
    ipo_at: '',
    created_at: ''
  },
  sort: ''
}
