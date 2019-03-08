import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtList, AtListItem, AtLoadMore, AtButton } from 'taro-ui'
import http from '~/utils/http'
import helper from '~/utils/helper'
import toast from '~/utils/toast'
import PageState from '~/components/PageState'
import './index.scss'

export default class extends Component {
  config = {
    navigationBarTitleText: '我的邀请码'
  }

  constructor(props) {
    super(props)
    this.state = {
      id: this.$router.params.id,
      total: 0,
      page: 0,
      loading: false,
      noMore: false,
      nothing: false,
      list: []
    }
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
    http
      .get('user/invite/users', {
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
          nothing: data.total === 0,
          loading: false
        })
      })
      .catch(() => {
        this.setState({
          loading: false
        })
      })
  }

  copyInviteLink() {
    wx.setClipboardData({
      data: `https://m.calibur.tv/about/invite/${this.$router.params.id}`,
      success () {
        toast.info('复制成功')
      },
      fail () {
        toast.info('复制失败了~')
      }
    })
  }

  render() {
    const { list, loading, noMore, nothing } = this.state
    const records = list.map(user => {
      return (
        <navigator
          url={`/pages/user/public/index?zone=${user.zone}`}
          hover-class='none'
          key={String(user.id)}
          taroKey={String(user.id)}
        >
          <AtListItem
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
        <View className="copy-btn">
          <AtButton
            type='primary'
            circle
            onClick={this.copyInviteLink}
          >
            点击生成邀请链接
          </AtButton>
        </View>
        {nothing ? (
          <PageState />
        ) : (
          <View>
            <AtList>{records}</AtList>
            <AtLoadMore
              status={loading ? 'loading' : noMore ? 'noMore' : 'more'}
            />
          </View>
        )}
      </View>
    )
  }
}
