import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtButton } from 'taro-ui'
import http from '~/utils/http'
import IdolItem from '~/pages/idol/item/index'
import './index.scss'

export default class extends Component {
  config = {
    enablePullDownRefresh: true
  }

  constructor (props) {
    super(props)
    this.state = {
      current: 1,
      market_price: {
        loading: false,
        nothing: false,
        noMore: false,
        total: 0,
        list: []
      },
      activity: {
        loading: false,
        nothing: false,
        noMore: false,
        total: 0,
        list: []
      },
      star_count: {
        loading: false,
        nothing: false,
        noMore: false,
        total: 0,
        list: []
      }
    }
  }

  componentWillMount() {}

  componentDidMount() {
    this.loadData(1)
  }

  onPullDownRefresh() {
    this.loadData(this.state.current, true)
  }

  onReachBottom() {
    this.loadData(this.state.current)
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  tabSwitch (index) {
    this.setState({
      current: index
    })
    let sort = ''
    if (index === 0) {
      sort = 'market_price'
    } else if (index === 1) {
      sort = 'activity'
    } else {
      sort = 'star_count'
    }
    if (this.state[sort].list.length) {
      return
    }
    this.loadData(index)
  }

  loadData(index, refresh = false) {
    let sort = ''
    if (index === 0) {
      sort = 'market_price'
    } else if (index === 1) {
      sort = 'activity'
    } else {
      sort = 'star_count'
    }
    const data = this.state[sort]
    if (
      (
        data.loading ||
        data.nothing ||
        data.noMore
      ) && !refresh
    ) {
      return
    }
    if (refresh) {
      this.setState({
        [sort]: {
          loading: true,
          nothing: false,
          noMore: false,
          total: data.total,
          data: []
        }
      })
    } else {
      this.setState({
        [sort]: Object.assign(data, {
          loading: true
        })
      })
    }
    http.post('cartoon_role/list/idols', {
      type: 'trending',
      sort,
      take: 10,
      state: sort === 'star_count' ? 0 : 1,
      seenIds: refresh ? '' : data.list.map(_ => _.id).join(',')
    })
      .then(res => {
        this.setState({
          [sort]: {
            loading: false,
            nothing: false,
            noMore: res.noMore,
            total: res.total,
            list: data.list.concat(res.list)
          }
        })
      })
      .catch(() => {
        this.setState({
          [sort]: Object.assign(data, {
            loading: false
          })
        })
      })
  }

  render () {
    const tabList = [{ title: '市值榜' }, { title: '活跃榜' }, { title: '新创榜' }]
    const data_1 = this.state.market_price
    const data_2 = this.state.activity
    const data_3 = this.state.star_count
    const idolList_1 = data_1.list.map(idol => <IdolItem key={String(idol.id)} taroKey={String(idol.id)} idol={idol}/>)
    const idolList_2 = data_2.list.map(idol => <IdolItem key={String(idol.id)} taroKey={String(idol.id)} idol={idol}/>)
    const idolList_3 = data_3.list.map(idol => <IdolItem key={String(idol.id)} taroKey={String(idol.id)} idol={idol}/>)
    return (
      <View>
        <AtTabs current={this.state.current} tabList={tabList} onClick={this.tabSwitch}>
          <AtTabsPane current={this.state.current} index={0} >
            {idolList_1}
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            {idolList_2}
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={2}>
            {idolList_3}
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}
