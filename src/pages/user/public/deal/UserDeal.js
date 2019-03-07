import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import http from '~/utils/http'
import event from '~/utils/event'
import DealItem from '~/components/DealItem'
import { AtLoadMore } from 'taro-ui'
import './index.scss'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [],
      loading: false,
      noMore: false,
      total: 0,
      page: 0
    }
  }

  componentWillMount () { }

  componentDidMount () {
    event.on('user-tab-1-switch', force => {
      if ((this.state.list.length || this.state.noMore) && !force) {
        return
      }
      this.getUserDeals()
    })
  }

  componentWillUnmount () {
    event.off('user-tab-1-switch')
  }

  componentDidShow () { }

  componentDidHide () { }

  getUserDeals() {
    const { loading, noMore, list, page } = this.state
    if (loading || noMore) {
      return
    }
    this.setState({
      loading: true
    })
    http.get('cartoon_role/get_user_deal_list', {
      page,
      take: 10,
      user_id: this.props.user.id,
    })
      .then(data => {
        this.setState({
          loading: false,
          total: data.total,
          noMore: data.noMore,
          list: list.concat(data.list)
        })
      })
      .catch(() => {
        this.setState({
          loading: false
        })
      })
  }

  render () {
    const { list, loading, noMore } = this.state
    const DealList = list.map(deal => <DealItem key={String(deal.id)} taroKey={String(deal.id)} deal={deal}/>)
    return (
      <View>
        <View>
          {DealList}
        </View>
        <AtLoadMore status={loading ? 'loading' : noMore ? 'noMore' : 'more'}/>
      </View>
    )
  }
}

