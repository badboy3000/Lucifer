import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtAccordion, AtList, AtListItem } from 'taro-ui'
import './index.scss'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false
    }
  }

  handleClick (value) {
    this.setState({
      open: value
    })
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View>
        <AtAccordion
          open={this.state.open}
          onClick={this.handleClick}
          title='股市'
        >
          <View className='at-article'>
            <View className='at-article__content'>
              <View className='at-article__section'>
                <View className='at-article__h3'>什么是股市</View>
                <View className='at-article__p'>
                  股市是 calibur 一个新的偶像应援系统，它将取代之前的「偶像排行榜」，并且在功能设计上尽可能的简化模拟现实世界中的股市
                </View>
                <View className='at-article__h3'>股市的特点</View>
                <View className='at-article__p'>
                  你可以在股市的「交易所」里通过低价买入高价卖出来，以赚差价的思路来赚取团子（前提是有人买）
                </View>
                <View className='at-article__p'>
                  即使你一直持有某一偶像的股份不去出售，你也可以在「产品区」赚到团子，只要这个偶像"经营"的好（产品区是由偶像"经纪人"运作的）
                </View>
              </View>
            </View>
          </View>
        </AtAccordion>
      </View>
    )
  }
}
