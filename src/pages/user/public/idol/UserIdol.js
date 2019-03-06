import Taro, { Component } from '@tarojs/taro'
import { View, Text, AtLoadMore } from '@tarojs/components'
import http from '~/utils/http'
import event from '~/utils/event'
import IdolItem from '~/pages/idol/item/index'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      list: [],
      loading: false,
      noMore: false,
      total: 0
    }
  }

  componentWillMount () { }

  componentDidMount () {
    event.on('user-tab-0-switch', () => {
      if (this.state.list.length || this.state.noMore) {
        return
      }
      this.getUserIdols()
    })
    event.on('on-reach-bottom', () => {
      this.getUserIdols()
    })
  }

  componentWillUnmount () {
    event.off('user-tab-0-switch')
    event.off('on-reach-bottom')
  }

  componentDidShow () { }

  componentDidHide () { }

  getUserIdols() {
    const { loading, list } = this.state
    if (loading) {
      return
    }
    this.setState({
      loading: true
    })
    http.post('cartoon_role/list/idols', {
      type: 'user',
      sort: 'activity',
      state: 1,
      take: 10,
      id: this.props.user.id,
      seenIds: list.map(_ => _.id).join(',')
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
    return (
      <View>
        {this.state.list.map(idol => <IdolItem key={String(idol.id)} sort='user' taroKey={String(idol.id)} idol={idol}/>)}
        <AtLoadMore status={this.state.loading ? 'loading' : this.state.noMore ? 'noMore' : 'more'}/>
      </View>
    )
  }
}

