import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { AtFloatLayout, AtList, AtListItem, AtInputNumber, AtButton } from "taro-ui"
import toast from '~/utils/toast'
import cache from '~/utils/cache'
import state from '~/utils/state'
import http from '~/utils/http'
import './index.scss'

export default class StarIdolBtn extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      user: cache.get('USER', null),
      count: props.idol ? props.idol.company_state ? 0.01 : 1 : 0,
      submitting: false
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

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
    if (count === 0) {
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
        state.updateUserPocket(-this.computedNeedPay())
        this.props.onUpdateStar(count)
      })
      .catch(() => {
        this.setState({
          submitting: false
        })
      })
  }

  computedPocket() {
    const { user } = this.state
    return user ? +user.pocket : 0
  }

  computedMaxCount() {
    const { idol } = this.props
    const maxCanBuy = (!idol.max_stock_count || idol.max_stock_count === '0.00')
      ? -1
      : idol.max_stock_count - idol.star_count
    const pocketCanBuy = this.computedPocket() ? this.computedPocket() / idol.stock_price : '0.00'
    return maxCanBuy === -1 ? pocketCanBuy : Math.min(pocketCanBuy, maxCanBuy)
  }

  computedMinCount() {
    return Math.min(this.props.idol.company_state ? 0.01 : 1, this.computedMaxCount())
  }

  computedNeedPay() {
    return this.state.count ? parseFloat(this.props.idol.stock_price * this.state.count).toFixed(2) : '0.00'
  }

  render () {
    const { idol } = this.props
    const { count, submitting, open } = this.state
    return (
      <View className='star-idol-btn-wrap'>
        <Button
          className={idol.is_locked ? 'star-btn locked' : 'star-btn'}
          onClick={this.openDialog}
        >{ idol.is_locked ? '停牌' : '入股' }</Button>
        <AtFloatLayout
          isOpened={open}
          title={`入股：${idol.name}`}
          onClose={
            () => {this.setState({
              open: false
            })}
          }
        >
          <AtList hasBorder={false}>
            <AtListItem
              title='当前股价'
              extraText={`￥${idol.stock_price}/股`}
              note='上市后大股东可变更股价'
            />
            <AtListItem
              title='最多可购买份额'
              extraText={`${parseFloat(this.computedMaxCount()).toFixed(2)}股`}
              note='与当前发行情况以及钱包余额有关'
            />
            <AtListItem
              title='最低可购买份额'
              extraText={`${parseFloat(this.computedMinCount()).toFixed(2)}股`}
              note={idol.company_state ? '上市公司一次可最低购买0.01股' : '未上市公司最低购买为1.00股'}
            />
            <AtListItem
              title='钱包余额'
              note={`待支付：￥${this.computedNeedPay()}`}
              extraText={`￥${parseFloat(this.computedPocket()).toFixed(2)}`}
            />
          </AtList>
          <View className='buy-counter'>
            <AtInputNumber
              type='digit'
              min={this.computedMinCount()}
              max={this.computedMaxCount()}
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
          >确认入股</AtButton>
        </AtFloatLayout>
      </View>
    )
  }
}

StarIdolBtn.defaultProps = {
  idol: {}
}
