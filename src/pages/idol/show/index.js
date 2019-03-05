import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtList, AtListItem } from 'taro-ui'
import http from '~/utils/http'
import IdolInfo from './info/IdolInfo'
import IdolPanel from './panel/IdolPanel'
import IdolOwner from './owner/IdolOwner'
import event from '~/utils/event'
import './index.scss'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      idol: null,
      bangumi: null,
      share_data: null,
      current: 1
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
    event.emit(`idol-${this.$router.params.id}-tab-switch-${index}`)
  }

  render() {
    const { idol } = this.state
    if (!idol) {
      return
    }

    return (
      <View>
        <IdolPanel idol={idol}/>
        <AtTabs
          current={this.state.current}
          scroll
          tabList={[
            { title: '产品区' },
            { title: '数据表' },
            { title: '留言板' },
            { title: '股势图' },
            { title: '董事会' },
            { title: '大事记' },
            { title: '采购表' },
            { title: '变更处' }
          ]}
          swipeable={false}
          onClick={this.tabSwitch}
        >
          <AtTabsPane current={this.state.current} index={0}>
            <View style='font-size:18px;text-align:center;height:100px;'>标签页二的内容</View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <IdolInfo idol={idol} />
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={2}>
            <View style='font-size:18px;text-align:center;height:100px;'>标签页二的内容</View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={3}>
            <View style='font-size:18px;text-align:center;height:100px;'>标签页四的内容</View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={4}>
            <IdolOwner idol={idol}/>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={5}>
            <View style='font-size:18px;text-align:center;height:100px;'>标签页三的内容</View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={6}>
            <View style='font-size:18px;text-align:center;height:100px;'>标签页六的内容</View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={7}>
            <View style='font-size:18px;text-align:center;height:100px;'>标签页六的内容</View>
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}
