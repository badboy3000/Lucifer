import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtList, AtListItem, AtTabs, AtTabsPane, AtButton } from "taro-ui"
import http from '~/utils/http'
import cache from '~/utils/cache'
import helper from '~/utils/helper'
import './index.scss'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      page_loading: true,
      deal: null,
      user: null,
      idol: null,
      is_mine: false,
      current: 0,
      page: 0,
      list: [],
      loading: false,
      noMore: false,
      nothing: false
    }
  }

  componentWillMount () { }

  componentDidMount () {
    this.getDealInfo()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onReachBottom () {
    if (this.state.current === 1) {
      this.getDealExchanges()
    }
  }

  getDealInfo() {
    http.get(`cartoon_role/${this.$router.params.id}/deal_show`)
      .then(data => {
        const user = cache.get('USER', {})
        this.setState({
          ...data,
          is_mine: user.id === data.user.id,
          nothing: data.deal.product_count === data.deal.last_count,
          page_loading: false
        })
      })
  }

  switchTab(index) {
    this.setState({
      current: index
    })
    if (index === 1 && !this.state.nothing && !this.state.list.length) {
      this.getDealExchanges()
    }
  }

  getDealExchanges() {
    const { state } = this
    if (state.loading || state.noMore) {
      return
    }
    this.setState({
      loading: true
    })
    http.get('cartoon_role/deal_exchange_record', {
      deal_id: this.state.deal.id,
      page: state.page
    })
      .then(data => {
        this.setState({
          list: state.list.concat(data),
          loading: false,
          page: state.page + 1
        })
      })
      .catch(() => {
        this.setState({
          loading: false
        })
      })
  }

  render () {
    if (this.state.page_loading) {
      return
    }
    const { deal, idol, user, current, list, noMore, loading } = this.state
    const tabList = [{ title: '交易详情' }, { title: '成交记录' }]
    const records = list.map(deal => {
      return (
        <navigator
          url={`/pages/user/public/index?zone=${deal.user.zone}`}
          hover-class='none'
          key={String(deal.id)}
          taroKey={String(deal.id)}
        >
          <AtListItem
            thumb={helper.resize(deal.user.avatar, { width: 120 })}
            note={`￥${deal.exchange_amount}购买了${deal.exchange_count}股`}
            title={deal.user.nickname}
            extraText={helper.ago(deal.created_at)}
          />
        </navigator>
      )
    })
    return (
      <View className='deal-show'>
        <View className='idol-panel'>
          <image
            src={helper.resize(idol.avatar, { width: 200 })}
            mode='aspectFill'
            class='bg'
          />
          <View className="shim"/>
          <View className="content">
            <navigator
              url={`/pages/idol/show/index?id=${idol.id}`}
              hover-class='none'
            >
              <image
                src={helper.resize(idol.avatar, { width: 200 })}
                mode='aspectFill'
                class='avatar'
              />
            </navigator>
            <View className="intro">
              <View className="metas">
                <View className="meta">
                  <View className="count">
                    ￥{idol.market_price}
                  </View>
                  <View className="name">
                    市值
                  </View>
                </View>
                <View className="meta">
                  <View className="count">
                    ￥{idol.stock_price}/股
                  </View>
                  <View className="name">
                    股价
                  </View>
                </View>
                <View className="meta">
                  <View className="count">
                    {idol.star_count}股
                  </View>
                  <View className="name">
                    认购
                  </View>
                </View>
              </View>
              <AtButton
                circle
                className='buy-btn'
                type='primary'
                size='small'
              >立即交易</AtButton>
            </View>
          </View>
        </View>
        <navigator
          url={`/pages/user/public/index?zone=${user.zone}`}
          hover-class='none'
        >
          <AtListItem
            title={user.nickname}
            hasBorder={false}
            arrow='right'
            thumb={helper.resize(user.avatar, { width: 120 })}
          />
        </navigator>
        <View className="hr"/>
        <AtTabs
          current={current}
          tabList={tabList}
          onClick={this.switchTab}
        >
          <AtTabsPane current={current} index={0} >
            <AtList hasBorder={false}>
              <AtListItem
                title='出售份额'
                extraText={`${deal.product_count}股`}
                note={`占比：${parseFloat(deal.product_count / idol.market_price * 100).toFixed(2)}%`}
              />
              <AtListItem
                title='出售价格'
                extraText={`￥${deal.product_price}/股`}
                note={deal.product_price === idol.stock_price ? '等于市场价' : deal.product_price > idol.stock_price ? '高于市场价' : '低于市场价'}
              />
              <AtListItem
                title='股市状态'
                extraText={idol.is_locked ? '已停牌' : '挂牌中'}
                note={idol.is_locked ? '停牌之后高于市场价也值得买' : '挂牌中的交易低于市场价才卖得出去'}
              />
              <AtListItem
                title='交易状态'
                extraText={deal.product_count - deal.last_count === 0 ? '还未成交' : '有成交额'}
                note={`成交量：￥${parseFloat(deal.product_count - deal.last_count).toFixed(2)}`}
              />
            </AtList>
          </AtTabsPane>
          <AtTabsPane current={current} index={1}>
            <AtList hasBorder={false}>{records}</AtList>
            <AtLoadMore status={loading ? 'loading' : noMore ? 'noMore' : 'more'}/>
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}

