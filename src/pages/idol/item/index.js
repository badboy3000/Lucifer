import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtCard } from "taro-ui"
import helper from '~/utils/helper'
import './index.scss'

export default class extends Component {
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
    let note, extra
    if (sort === 'new') {
      note = `注册时间：${idol.created_at.split(' ')[0]}`
      extra = `${idol.fans_count} 人`
    } else if (sort === 'active') {
      note = `上市时间：${idol.ipo_at.split(' ')[0]}`
      extra = `${idol.star_count} 股`
    } else {
      note = `上市时间：${idol.ipo_at.split(' ')[0]}`
      extra = `￥${idol.market_price}`
    }
    return (
      <navigator
        url={`/pages/idol/show/index?id=${this.props.idol.id}`}
        hover-class='none'
        class='idol-item'
      >
        <AtCard
          note={note}
          extra={extra}
          title={idol.name}
          thumb={helper.resize(idol.avatar, { width: 100 })}
          isFull={true}
        >
          这也是内容区 可以随意定义功能
        </AtCard>
        <View className='shim'/>
      </navigator>
    )
  }
}
