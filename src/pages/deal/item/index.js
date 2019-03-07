import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
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
    return (
      <navigator
        url={`/pages/deal/show/index?id=${deal.id}`}
        hover-class='none'
      >
        <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页二的内容</View>
        <Text>{deal.idol.name}</Text>
        <Text>售量：{deal.product_count}</Text>
        <Text>余量：{deal.last_count}</Text>
      </navigator>
    )
  }
}
