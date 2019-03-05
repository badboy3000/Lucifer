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
        total: 0
      },
      activity: {
        loading: false,
        nothing: false,
        noMore: false,
        total: 0
      },
      star_count: {
        loading: false,
        nothing: false,
        noMore: false,
        total: 0
      },
      list_0: [],
      list_1: [],
      list_2: []
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
    if (this.state[`list_${index}`].length) {
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
    const field = `list_${index}`
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
          total: data.total
        }
      })
      this.setState({
        [field]: []
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
      seenIds: refresh ? '' : this.state[field].map(_ => _.id).join(',')
    })
      .then(res => {
        this.setState({
          [field]: this.state[field].concat(res.list)
        })
        this.setState({
          [sort]: {
            loading: false,
            nothing: false,
            noMore: res.noMore,
            total: res.total
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
    const { list_0, list_1, list_2 } = this.state
    const idolList_0 = list_0.map(idol => <IdolItem key={String(idol.id)} sort='hot' taroKey={String(idol.id)} idol={idol}/>)
    const idolList_1 = list_1.map(idol => <IdolItem key={String(idol.id)} sort='active' taroKey={String(idol.id)} idol={idol}/>)
    const idolList_2 = list_2.map(idol => <IdolItem key={String(idol.id)} sort='new' taroKey={String(idol.id)} idol={idol}/>)
    return (
      <View className='idol-list'>
        <AtTabs current={this.state.current} tabList={tabList} onClick={this.tabSwitch}>
          <AtTabsPane current={this.state.current} index={0} >
            {idolList_0}
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            {idolList_1}
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={2}>
            {idolList_2}
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}
