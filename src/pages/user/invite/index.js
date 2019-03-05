import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtList, AtListItem, AtLoadMore } from "taro-ui"
import http from '~/utils/http'
import helper from '~/utils/helper'
import './index.scss'

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.$router.params.id,
      total: 0,
      page: 0,
      loading: false,
      noMore: false,
      list: []
    };
  }

  componentWillMount() {}

  componentDidMount() {
    this.getList()
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  onReachBottom() {
    this.getList()
  }

  getList() {
    const { id, loading, noMore, list, page } = this.state
    if (loading || noMore) {
      return
    }
    this.setState({
      loading: true
    })
    http.get('user/invite/users', {
      take: 20,
      page,
      id
    })
      .then(data => {
        this.setState({
          list: list.concat(data.list),
          noMore: data.noMore,
          total: data.total,
          page: page + 1,
          loading: false
        })
      })
      .catch(() => {
        this.setState({
          loading: false
        })
      })
  }

  render() {
    const { list, loading, noMore } = this.state
    const records = list.map(user => {
      return (
        <navigator
          url={`/pages/user/public/index?zone=${user.zone}`}
          hover-class='none'
        >
          <AtListItem
            key={String(user.id)}
            taroKey={String(user.id)}
            arrow='right'
            thumb={helper.resize(user.avatar, { width: 120 })}
            note={user.created_at}
            title={user.nickname}
          />
        </navigator>
      )
    })
    return (
      <View className='invite-user'>
        <Text>invite code</Text>
        <AtList>{records}</AtList>
        <AtLoadMore status={loading ? 'loading' : noMore ? 'noMore' : 'more'}/>
      </View>
    )
  }
}
