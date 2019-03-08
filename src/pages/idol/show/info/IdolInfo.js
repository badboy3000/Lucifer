import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtTabsPane, AtList, AtListItem } from 'taro-ui'
import './index.scss'

export default class IdolInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { idol } = this.props
    const { boss, manager } = idol
    const hasLimited = idol.max_stock_count !== '0.00'
    const hasBuyStock = idol.has_star !== '0.00'
    const computedPercent = hasBuyStock
      ? `持股占比：${parseFloat(
          (idol.has_star / idol.star_count) * 100
        ).toFixed(2)}%`
      : ''
    const balance = idol.total_pay - idol.total_income
    const productBalance = `￥${parseFloat(balance).toFixed(2)}`
    const productPercent = balance
      ? `收益率：${parseFloat((balance / idol.market_price) * 100).toFixed(2)}%`
      : ''
    const trending = idol.trending ? `市值排行：${idol.trending}` : ''

    return (
      <AtTabsPane current={this.state.current} index={0}>
        <AtList>
          <AtListItem
            title='当前市值'
            extraText={idol.company_state ? `￥${idol.market_price}` : '未上市'}
            note={trending}
          />
          <AtListItem
            title='每股价格'
            extraText={`￥${idol.stock_price} / 股`}
          />
          {boss ? (
            <navigator
              url={`/pages/user/public/index?zone=${boss.zone}`}
              hover-class='none'
            >
              <AtListItem
                title='大股东'
                extraText={boss.nickname}
                thumb={boss.avatar}
              />
            </navigator>
          ) : (
            <AtListItem title='大股东' extraText='暂无' />
          )}
          {manager ? (
            <navigator
              url={`/pages/user/public/index?zone=${manager.zone}`}
              hover-class='none'
            >
              <AtListItem
                title='经纪人'
                extraText={manager.nickname}
                thumb={manager.avatar}
              />
            </navigator>
          ) : (
            <AtListItem title='经纪人' extraText='暂无' />
          )}
          <AtListItem title='持股人数' extraText={`${idol.fans_count}人`} />
          <AtListItem
            title='总发行额'
            extraText={hasLimited ? `${idol.max_stock_count} 股` : '无上限'}
          />
          <AtListItem title='已认购额' extraText={`${idol.star_count} 股`} />
          <AtListItem
            title='我持有股'
            extraText={hasBuyStock ? `${idol.has_star} 股` : '未入股'}
            note={computedPercent}
          />
          <AtListItem
            title='QQ应援群'
            extraText={idol.qq_group || '106402736'}
            note='群号由大股东指定'
          />
          <AtListItem
            title='公司支出'
            extraText={idol.company_state ? `￥${idol.total_pay}` : '-'}
          />
          <AtListItem
            title='公司收入'
            extraText={idol.company_state ? `￥${idol.total_income}` : '-'}
          />
          <AtListItem
            title='公司盈利'
            extraText={idol.company_state ? productBalance : '-'}
            note={productPercent}
          />
        </AtList>
      </AtTabsPane>
    )
  }
}

IdolInfo.defaultProps = {
  idol: {}
}
