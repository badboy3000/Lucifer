import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import event from '~/utils/event'
import { AtSegmentedControl } from 'taro-ui'
import './index.scss'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      current: 0
    }
  }

  componentWillMount () { }

  componentDidMount () {
    event.on(`idol-${this.props.idol.id}-tab-switch-4`, this.fetchData)
  }

  componentWillUnmount () {
    event.off(`idol-${this.props.idol.id}-tab-switch-4`)
  }

  componentDidShow () { }

  componentDidHide () { }

  fetchData() {
    console.log('fetchData')
  }

  handleClick (value) {
    this.setState({
      current: value
    })
  }

  render () {
    return (
      <View className='idol-owners'>
        <View className="header">
          <AtSegmentedControl
            values={['持股最多', '最新入股']}
            onClick={this.handleClick}
            selectedColor='#ff6881'
            current={this.state.current}
          />
        </View>
        {
          this.state.current === 0
            ? <View className='tab-content'>标签1的内容</View>
            : <View className='tab-content'>标签2的内容</View>
        }
      </View>
    )
  }
}

