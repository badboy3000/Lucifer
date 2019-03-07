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
    return (
      <navigator
        url={`/pages/deal/show/index?id=${this.props.deal.id}`}
        hover-class='none'
      >
        <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页二的内容</View>
        <Text>text</Text>
      </navigator>
    )
  }
}
