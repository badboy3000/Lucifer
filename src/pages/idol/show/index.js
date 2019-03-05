import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtList, AtListItem } from 'taro-ui'
import http from '~/utils/http'
import IdolInfo from './info/index'
import './index.scss'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      idol: null,
      bangumi: null,
      share_data: null,
      current: 0
    }
  }

  componentWillMount() {
    console.log(this.$router.params)
  }

  componentDidMount() {
    this.getIdolInfo()
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  getIdolInfo() {
    http.get(`cartoon_role/${this.$router.params.id}/stock_show`).then(data => {
      this.setState({
        idol: data.role,
        bangumi: data.bangumi,
        share_data: data.share_data
      })
    })
  }

  tabSwitch(index) {
    this.setState({
      current: index
    })
  }

  render() {
    const { idol } = this.state
    if (!idol) {
      return
    }

    return (
      <View>
        <AtTabs
          current={this.state.current}
          scroll
          tabList={[
            { title: '股市信息' },
            { title: '标签页2' },
            { title: '标签页3' },
            { title: '标签页4' },
            { title: '标签页5' },
            { title: '标签页6' }
          ]}
          onClick={this.tabSwitch}>
          <AtTabsPane current={this.state.current} index={0}>
            <IdolInfo idol={idol} />
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <View style='font-size:18px;text-align:center;height:100px;'>标签页二的内容</View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={2}>
            <View style='font-size:18px;text-align:center;height:100px;'>标签页三的内容</View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={3}>
            <View style='font-size:18px;text-align:center;height:100px;'>标签页四的内容</View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={4}>
            <View style='font-size:18px;text-align:center;height:100px;'>标签页五的内容</View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={5}>
            <View style='font-size:18px;text-align:center;height:100px;'>标签页六的内容</View>
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}
