import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtList, AtListItem } from 'taro-ui'
import http from '~/utils/http'
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
    const hasLimited = idol.max_stock_count !== '0.00'
    const hasBuyStock = idol.has_star !== '0.00'
    const computedPercent = idol.has_star ? `持股占比：${parseFloat(
      (idol.has_star / idol.star_count) * 100
    ).toFixed(2)}%` : ''
    const balance = idol.total_pay - idol.total_income
    const productBalance = `￥${parseFloat(balance).toFixed(2)}`
    const productPercent = balance ? `收益率：${parseFloat(
      (balance / idol.market_price) * 100
    ).toFixed(2)}%` : ''
    const trending = idol.trending ? `市值排行：${idol.trending}` : ''

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
            <AtList>
              <AtListItem title='当前市值' extraText={idol.company_state ? `￥${idol.market_price}` : '未上市'} note={trending} />
              <AtListItem title='每股价格' extraText={`￥${idol.stock_price}`} />
              <AtListItem title='持股人数' extraText={`${idol.fans_count}人`} />
              <AtListItem title='总发行股' extraText={hasLimited ? idol.max_stock_count : '无上限'} />
              <AtListItem title='已认购股' extraText={idol.star_count} />
              <AtListItem title='我持有股' extraText={hasBuyStock ? `${idol.has_star}` : '未入股'} note={computedPercent} />
              <AtListItem title='公司支出' extraText={idol.company_state ? idol.total_pay : '-'} />
              <AtListItem title='公司收入' extraText={idol.company_state ? idol.total_income : '-'} />
              <AtListItem title='公司盈利' extraText={idol.company_state ? productBalance : '-'} note={productPercent} />
            </AtList>
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
