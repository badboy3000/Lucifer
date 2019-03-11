import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import {
  AtList,
  AtListItem,
  AtTabs,
  AtTabsPane,
  AtButton,
  AtModal,
  AtFloatLayout,
  AtInputNumber,
  AtNavBar
} from 'taro-ui'
import http from '~/utils/http'
import cache from '~/utils/cache'
import toast from '~/utils/toast'
import state from '~/utils/state'
import helper from '~/utils/helper'
import PageState from '~/components/PageState'
import './index.scss'

export default class extends Component {
  config = {
    navigationStyle: 'custom'
  }

  constructor(props) {
    super(props)
    this.state = {
      page_loading: true,
      page_error: false,
      deal: null,
      user: null,
      idol: null,
      is_mine: false,
      current: 0,
      page: 0,
      list: [],
      loading: false,
      noMore: false,
      nothing: false,
      submitting: false,
      openDeleteModal: false,
      openBuyDrawer: false,
      current_user: cache.get('USER', null),
      buy_count: 0
    }
  }

  componentWillMount() {}

  componentDidMount() {
    this.getDealInfo()
  }

  onShareAppMessage() {
    return helper.share()
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  onReachBottom() {
    if (this.state.current === 1) {
      this.getDealExchanges()
    }
  }

  getDealInfo() {
    http
      .fetch(`cartoon_role/${this.$router.params.id}/deal_show`)
      .then(data => {
        const user = cache.get('USER', {})
        this.setState(
          {
            ...data,
            is_mine: user.id === data.user.id,
            nothing: data.deal.product_count === data.deal.last_count,
            page_loading: false
          },
          () => {
            this.setState({
              buy_count: this.computedMinCanBuy()
            })
          }
        )
      })
      .catch(() => {
        this.setState({
          page_loading: false,
          page_error: true
        })
      })
  }

  computedMaxCanBuy() {
    const { current_user, deal } = this.state
    const pocket = current_user ? +current_user.pocket : 0
    return Math.min(
      deal.product_price,
      pocket ? parseFloat(pocket / deal.product_price).toFixed(2) : 0
    )
  }

  computedMinCanBuy() {
    return Math.min(
      parseFloat(0.01 / this.state.deal.product_price).toFixed(2),
      this.computedMaxCanBuy()
    )
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
    http
      .get('cartoon_role/deal_exchange_record', {
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

  handleDealClick() {
    if (!this.state.current_user) {
      return toast.info('请先登录')
    }
    if (this.state.is_mine) {
      this.setState({
        openDeleteModal: true
      })
    } else {
      this.setState({
        openBuyDrawer: true
      })
    }
  }

  submitDeleteDeal() {
    if (this.state.submitting) {
      return
    }
    this.setState({
      submitting: true
    })
    http
      .post('cartoon_role/delete_deal', {
        id: this.state.deal.id
      })
      .then(() => {
        toast.info('删除成功')
        setTimeout(() => {
          wx.navigateBack()
        }, 1500)
      })
      .catch(() => {
        this.setState({
          submitting: false
        })
      })
  }

  submitCreateDeal() {
    if (this.state.submitting) {
      return
    }
    this.setState({
      submitting: true
    })
    const { deal, buy_count } = this.state
    const price = parseFloat(this.state.buy_count * deal.product_price).toFixed(
      2
    )
    http
      .post('cartoon_role/make_deal', {
        deal_id: deal.id,
        buy_count: buy_count,
        pay_price: price
      })
      .then(() => {
        toast.info('交易成功')
        this.setState({
          submitting: false,
          openBuyDrawer: false,
          deal: Object.assign(deal, {
            last_count: parseFloat(deal.last_count - buy_count).toFixed(2)
          })
        })
        state.updateUserPocket(-price)
      })
      .catch(() => {
        this.setState({
          submitting: false
        })
      })
  }

  handleChangeBuyCount(value) {
    this.setState({
      buy_count: value
    })
  }

  render() {
    if (this.state.page_loading) {
      return <PageState type='loading' />
    }
    if (this.state.page_error) {
      return <PageState type='error' />
    }
    const {
      deal,
      idol,
      user,
      current,
      list,
      noMore,
      loading,
      nothing,
      is_mine,
      openDeleteModal,
      openBuyDrawer,
      current_user,
      buy_count
    } = this.state
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
    const pocket = current_user ? +current_user.pocket : 0
    return (
      <View className='deal-show'>
        <View className='idol-panel'>
          <image
            src={helper.resize(idol.avatar, { width: 200 })}
            mode='aspectFill'
            class='bg'
          />
          <View className='shim' />
          <AtNavBar
            color='#fff'
            leftIconType='chevron-left'
            leftText={idol.name}
            border={false}
            onClickLeftIcon={() => {
              wx.navigateBack()
            }}
          />
          <View className='content'>
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
            <View className='intro'>
              <View className='metas'>
                <View className='meta'>
                  <View className='count'>￥{idol.market_price}</View>
                  <View className='name'>市值</View>
                </View>
                <View className='meta'>
                  <View className='count'>
                    ￥{idol.stock_price}
                    /股
                  </View>
                  <View className='name'>股价</View>
                </View>
                <View className='meta'>
                  <View className='count'>{idol.star_count}股</View>
                  <View className='name'>认购</View>
                </View>
              </View>
              <AtButton
                loading={submitting}
                circle
                className='buy-btn'
                type={is_mine ? 'secondary' : 'primary'}
                size='small'
                onClick={this.handleDealClick}
              >
                {is_mine ? '终止交易' : '马上交易'}
              </AtButton>
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
        <AtModal
          isOpened={openDeleteModal}
          title='终止交易'
          cancelText='取消'
          confirmText='确认'
          onCancel={() => {
            this.setState({
              openDeleteModal: false
            })
          }}
          onConfirm={this.submitDeleteDeal}
          content='确认要终止交易吗？如果需要调整价格和销量，可前往偶像页面设置即可更新该交易。'
        />
        <AtFloatLayout
          isOpened={openBuyDrawer}
          title={`购买「${idol.name}」的股份`}
          onClose={() => {
            this.setState({
              openBuyDrawer: false
            })
          }}
        >
          <AtList hasBorder={false}>
            <AtListItem
              title='钱包余额'
              extraText={`￥${parseFloat(pocket).toFixed(2)}`}
              note={`￥${deal.product_price}/股，购买后余额:￥${parseFloat(
                pocket - buy_count * deal.product_price
              ).toFixed(2)}`}
            />
            <AtListItem
              title='最多购买'
              extraText={`${parseFloat(this.computedMaxCanBuy()).toFixed(2)}股`}
              note='与钱包余额以及出售份额有关'
            />
            <AtListItem
              title='最少购买'
              extraText={`${parseFloat(this.computedMinCanBuy()).toFixed(2)}股`}
              note='单次交易的金额不能低于￥0.01'
            />
            <View className='buy-counter'>
              <AtInputNumber
                type='digit'
                min={this.computedMinCanBuy()}
                max={this.computedMaxCanBuy()}
                value={buy_count}
                step={0.01}
                onChange={this.handleChangeBuyCount}
              />
            </View>
            <AtButton
              loading={submitting}
              type='primary'
              circle
              onClick={this.submitCreateDeal}
            >
              达成交易
            </AtButton>
          </AtList>
        </AtFloatLayout>
        <View className='hr' />
        <AtTabs
          current={current}
          tabList={tabList}
          onClick={this.switchTab}
          swipeable={false}
          scroll
        >
          <AtTabsPane current={current} index={0}>
            <AtList hasBorder={false}>
              <AtListItem
                title='出售份额'
                extraText={`${deal.product_count}股`}
                note={`占比：${parseFloat(
                  (deal.product_count / idol.market_price) * 100
                ).toFixed(2)}%`}
              />
              <AtListItem
                title='出售价格'
                extraText={`￥${deal.product_price}/股`}
                note={
                  deal.product_price === idol.stock_price
                    ? '等于市场价'
                    : deal.product_price > idol.stock_price
                      ? '高于市场价'
                      : '低于市场价'
                }
              />
              <AtListItem
                title='股市状态'
                extraText={idol.is_locked ? '已停牌' : '挂牌中'}
                note={
                  idol.is_locked
                    ? '停牌之后高于市场价也值得买'
                    : '挂牌中的交易低于市场价才卖得出去'
                }
              />
              <AtListItem
                title='交易状态'
                extraText={
                  parseFloat(deal.product_count - deal.last_count).toFixed(
                    2
                  ) === '0.00'
                    ? '还未成交'
                    : '有成交额'
                }
                note={`成交量：￥${parseFloat(
                  deal.product_count - deal.last_count
                ).toFixed(2)}`}
              />
            </AtList>
          </AtTabsPane>
          <AtTabsPane current={current} index={1}>
            {nothing ? (
              <PageState />
            ) : (
              <View>
                <AtList hasBorder={false}>{records}</AtList>
                <AtLoadMore
                  status={loading ? 'loading' : noMore ? 'noMore' : 'more'}
                />
              </View>
            )}
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}
