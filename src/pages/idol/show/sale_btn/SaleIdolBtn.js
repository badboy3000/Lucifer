import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { AtFloatLayout, AtList, AtListItem, AtInputNumber, AtButton } from "taro-ui"
import toast from '~/utils/toast'
import cache from '~/utils/cache'
import http from '~/utils/http'
import './index.scss'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      submitting: false,
      open: false,
      guest: !cache.get('USER'),
      deal: {
        id: 0,
        idol_id: props.idol ? props.idol.id : 0,
        product_count: 0,
        product_price: 0
      },
      has_star: 0
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  openDialog() {
    if (this.state.guest) {
      return toast.info('请先登录')
    }
    if (this.props.idol.has_star === '0.00') {
      return toast.info('请先入股')
    }
    if (this.props.idol.company_state === 0) {
      return toast.info('上市之前不能出售')
    }
    this.setState({
      open: true
    })
    this.getDealHistory()
  }

  handleChangePrice(value) {
    this.setState({
      deal: Object.assign(this.state.deal, {
        product_price: value
      })
    })
  }

  handleChangeCount(value) {
    this.setState({
      deal: Object.assign(this.state.deal, {
        product_count: value
      })
    })
  }

  submitForm() {
    const { deal, submitting } = this.state
    if (+parseFloat(deal.product_count * deal.product_price).toFixed(2) < 0.01) {
      return toast.info('收益不能低于0.01')
    }
    if (submitting) {
      return
    }
    this.setState({
      submitting: true
    })
    http.post('cartoon_role/create_deal', deal)
      .then(() => {
        this.setState({
          submitting: false,
          open: false
        })
        toast.info('发布成功，可前往交易所查看')
      })
      .catch(() => {
        this.setState({
          submitting: false
        })
      })
  }

  getDealHistory() {
    if (this.state.loading) {
      return
    }
    this.setState({
      loading: true
    })
    http.get(`cartoon_role/${this.props.idol.id}/get_idol_deal`)
      .then(({ deal, has_star }) => {
        if (deal) {
          deal['product_count'] = deal['last_count']
          this.setState({
            deal,
            has_star,
            loading: false
          })
        } else {
          this.setState({
            has_star,
            loading: false
          })
        }
      })
      .catch(() => {
        this.setState({
          loading: false
        })
      })
  }

  render () {
    const { idol } = this.props
    const { deal, open, has_star } = this.state
    return (
      <View className='sale-idol-btn-wrap'>
        <Button
          className='sale-btn'
          onClick={this.openDialog}
        >出售</Button>
        <AtFloatLayout
          isOpened={open}
          title={`出售「${idol.name}」的股份`}
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
              title='价格建议'
              extraText={idol.is_locked ? '可高于挂牌价' : '应低于挂牌价'}
              note={idol.is_locked ? '当前股票已停牌，可高价出售' : '当前股票挂牌中，建议低价出售'}
            />
            <AtListItem
              title='持有股份'
              extraText={`${idol.has_star}股`}
              note={`占比：${parseFloat(idol.has_star / idol.market_price * 100).toFixed(2)}%`}
            />
            <AtListItem
              title='预计收益'
              extraText='不能低于0.01'
              note={`￥${parseFloat(deal.product_price * deal.product_count).toFixed(2)}`}
            />
          </AtList>
          <View className='buy-counter'>
            <View className="title">出售价格：</View>
            <AtInputNumber
              type='digit'
              min={0.01}
              max={10.00}
              step={0.01}
              value={deal.product_price}
              onChange={this.handleChangePrice}
            />
            <View className="title">出售份额：</View>
            <AtInputNumber
              type='digit'
              min={0.01}
              max={has_star}
              step={0.01}
              value={deal.product_count}
              onChange={this.handleChangeCount}
            />
          </View>
          <AtButton
            loading={submitting}
            type='primary'
            circle
            onClick={this.submitForm}
          >确认出售</AtButton>
        </AtFloatLayout>
      </View>
    )
  }
}

