import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { AtFloatLayout, AtList, AtListItem, AtInputNumber, AtButton } from "taro-ui"
import toast from '~/utils/toast'
import cache from '~/utils/cache'
import state from '~/utils/state'
import http from '~/utils/http'
import './index.scss'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      user: cache.get('USER', null),
      count: 0,
      submitting: false
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleClose() {
    this.setState({
      open: false
    })
  }

  openDialog() {
    if (this.props.idol.is_locked) {
      return toast.info('已经卖完了')
    }
    if (!this.state.user) {
      return toast.info('请先登录')
    }
    this.setState({
      open: true
    })
  }

  handleChangeBuyCount(value) {
    this.setState({
      count: value
    })
  }

  submitForm() {
    const { count, submitting } = this.state
    if (!count) {
      return toast.info('请选择入股份额')
    }
    if (submitting) {
      return
    }
    this.setState({
      submitting: true
    })
    http.post(`cartoon_role/${this.props.idol.id}/buy_stock`, {
      amount: count
    })
      .then(() => {
        toast.info('入股成功')
        this.setState({
          submitting: false,
          open: false
        })
        state.updateUserPocket(-this.props.idol.stock_price * count)
      })
      .catch(() => {
        this.setState({
          submitting: false
        })
      })
  }

  render () {
    const { idol } = this.props
    const { user, count, submitting } = this.state
    const pocket = user ? +user.pocket : 0
    const price = idol.stock_price
    const maxCanBuy = (!idol.max_stock_count || idol.max_stock_count === '0.00')
      ? -1
      : idol.max_stock_count - idol.star_count
    const pocketCanBuy = pocket ? pocket / price : '0.00'
    const maxCount = maxCanBuy === -1 ? pocketCanBuy : Math.min(pocketCanBuy, maxCanBuy)
    const minCount = Math.min(idol.company_state ? 0.01 : 1, maxCount)
    const needPay = count ? parseFloat(price * count).toFixed(2) : '0.00'
    return (
      <View className='star-idol-btn-wrap'>
        <Button
          className={idol.is_locked ? 'star-btn locked' : 'star-btn'}
          onClick={this.openDialog}
        >{ idol.is_locked ? '停牌' : '入股' }</Button>
        <AtFloatLayout
          isOpened={this.state.open}
          title={`入股：${idol.name}`}
          onClose={this.handleClose}
        >
          <AtList hasBorder={false}>
            <AtListItem
              title='当前股价'
              extraText={`￥${price}/股`}
              note='上市后大股东可变更股价'
            />
            <AtListItem
              title='最多可购买份额'
              extraText={`${parseFloat(maxCount).toFixed(2)}股`}
              note='与当前发行情况以及钱包余额有关'
            />
            <AtListItem
              title='最低可购买份额'
              extraText={`${parseFloat(minCount).toFixed(2)}股`}
              note={idol.company_state ? '上市公司一次可最低购买0.01股' : '未上市公司最低购买为1.00股'}
            />
            <AtListItem
              title='钱包余额'
              note={`待支付：￥${needPay}`}
              extraText={`￥${pocket}`}
            />
          </AtList>
          <View className='buy-counter'>
            <AtInputNumber
              type='digit'
              min={minCount}
              max={maxCount}
              step={0.01}
              value={count}
              onChange={this.handleChangeBuyCount}
            />
          </View>
          <AtButton
            loading={submitting}
            type='primary'
            circle
            onClick={this.submitForm}
          >确认下单</AtButton>
        </AtFloatLayout>
      </View>
    )
  }
}

