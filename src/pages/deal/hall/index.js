import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import './index.scss'

export default class extends Component {
  config = {
    enablePullDownRefresh: true
  }

  constructor (props) {
    super(props)
    this.state = {
      current: 1
    }
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  tabSwitch (index) {
    this.setState({
      current: index
    })
  }

  render() {
    const tabList = [{ title: '成交面板' }, { title: '交易大厅' }, { title: '我的交易' }]
    return (
      <View>
        <AtTabs current={this.state.current} tabList={tabList} onClick={this.tabSwitch}>
          <AtTabsPane current={this.state.current} index={0} >
            成交面板
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            交易大厅
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={2}>
            我的交易
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}
