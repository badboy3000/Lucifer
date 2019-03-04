import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
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
    return (
      <View className='idol-item'>
        <navigator
          url={`/pages/idol/show/index?id=${this.props.idol.id}`}
          hover-class='none'
        >
          <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;' >{this.props.idol.name}</View>
        </navigator>
      </View>
    )
  }
}
