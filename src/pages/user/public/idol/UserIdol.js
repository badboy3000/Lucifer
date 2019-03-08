import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtLoadMore } from 'taro-ui'
import http from '~/utils/http'
import event from '~/utils/event'
import IdolItem from '~/components/IdolItem'
import PageState from '~/components/PageState'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      loading: false,
      noMore: false,
      nothing: false,
      total: 0
    }
  }

  componentWillMount() {}

  componentDidMount() {
    event.on('user-tab-0-switch', force => {
      if ((this.state.list.length || this.state.noMore) && !force) {
        return
      }
      this.getUserIdols()
    })
  }

  componentWillUnmount() {
    event.off('user-tab-0-switch')
  }

  componentDidShow() {}

  componentDidHide() {}

  getUserIdols() {
    const { loading, noMore, list } = this.state
    if (loading || noMore) {
      return
    }
    this.setState({
      loading: true
    })
    http
      .post('cartoon_role/list/idols', {
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
          nothing: data.total === 0,
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

  render() {
    const { list, loading, noMore, nothing } = this.state
    if (nothing) {
      return <PageState />
    }
    return (
      <View>
        <View>
          {list.map(idol => (
            <IdolItem
              key={String(idol.id)}
              sort='user'
              taroKey={String(idol.id)}
              idol={idol}
            />
          ))}
        </View>
        <AtLoadMore status={loading ? 'loading' : noMore ? 'noMore' : 'more'} />
      </View>
    )
  }
}
