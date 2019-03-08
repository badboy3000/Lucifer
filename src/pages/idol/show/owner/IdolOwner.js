import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import event from '~/utils/event'
import http from '~/utils/http'
import helper from '~/utils/helper'
import { AtSegmentedControl, AtList, AtListItem, AtLoadMore } from 'taro-ui'
import './index.scss'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      current: 0,
      list_0_loading: false,
      list_1_loading: false,
      list_0_nothing: false,
      list_1_nothing: false,
      list_0_noMore: false,
      list_1_noMore: false,
      list_0_total: 0,
      list_1_total: 0,
      list_0_data: [],
      list_1_data: []
    }
  }

  componentWillMount () { }

  componentDidMount () {
    event.on(`idol-${this.props.idol.id}-tab-switch-4`, () => {
      if (this.state.list_0_data.length || this.state.list_0_noMore) {
        return
      }
      this.fetchData(0)
    })
  }

  componentWillUnmount () {
    event.off(`idol-${this.props.idol.id}-tab-switch-4`)
  }

  componentDidShow () { }

  componentDidHide () { }

  fetchData (current) {
    const { state } = this
    if (
      state[`list_${current}_loading`] ||
      state[`list_${current}_noMore`]
    ) {
      return
    }
    this.setState({
      [`list_${current}_loading`]: true
    })
    http.post(`cartoon_role/${this.props.idol.id}/owners`, {
      sort: current === 0 ? 'biggest' : 'newest',
      seenIds: current === 0 ? state.list_0_data.map(_ => _.id).join(',') : '',
      minId: current === 0 ? 0 : state.list_1_data.length ? state.list_1_data[state.list_1_data.length - 1].id : 0
    })
      .then(data => {
        this.setState({
          [`list_${current}_loading`]: false,
          [`list_${current}_noMore`]: data.noMore,
          [`list_${current}_total`]: data.total,
          [`list_${current}_data`]: state[`list_${current}_data`].concat(data.list)
        })
      })
      .catch(() => {
        this.setState({
          [`list_${current}_loading`]: false
        })
      })
  }

  loadMore () {
    this.fetchData(this.state.current)
  }

  handleClick (index) {
    this.setState({
      current: index
    })
    if (this.state[`list_${index}_data`].length || this.state[`list_${index}_noMore`]) {
      return
    }
    this.fetchData(index)
  }

  render () {
    const { list_0_data, list_1_data, current, list_0_loading, list_1_loading, list_0_noMore, list_1_noMore } = this.state
    const marketPrice = this.props.idol.market_price
    const percent = score => `占比：${parseFloat(score / marketPrice * 100).toFixed(2)}%`
    const list_0 = list_0_data.map(user => {
      return (
        <navigator
          key={String(user.id)}
          taroKey={String(user.id)}
          url={`/pages/user/public/index?zone=${user.zone}`}
          hover-class='none'
        >
          <AtListItem
            title={user.nickname}
            extraText={`${user.score}股`}
            note={percent(user.score)}
            thumb={helper.resize(user.avatar, { width: 120 })}
          />
        </navigator>
      )
    })
    const list_1 = list_1_data.map(user => {
      return (
        <navigator
          key={String(user.id)}
          taroKey={String(user.id)}
          url={`/pages/user/public/index?zone=${user.zone}`}
          hover-class='none'
        >
          <AtListItem
            title={user.nickname}
            note={helper.time(user.score)}
            thumb={helper.resize(user.avatar, { width: 120 })}
          />
        </navigator>
      )
    })
    return (
      <View className='idol-owners'>
        <View className="header">
          <AtSegmentedControl
            values={['持股最多', '最新入股']}
            onClick={this.handleClick}
            selectedColor='#ff6881'
            current={current}
          />
        </View>
        {
          current === 0
        ? <AtList hasBorder={false}>
            {list_0}
            <AtLoadMore
              status={list_0_loading ? 'loading' : list_0_noMore ? 'noMore' : 'more'}
              onClick={this.loadMore}
            />
          </AtList>
        : <AtList hasBorder={false}>
            {list_1}
            <AtLoadMore
              status={list_1_loading ? 'loading' : list_1_noMore ? 'noMore' : 'more'}
              onClick={this.loadMore}
            />
          </AtList>
        }
      </View>
    )
  }
}

