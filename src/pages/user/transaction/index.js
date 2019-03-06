import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtGrid, AtList, AtListItem, AtLoadMore } from "taro-ui"
import http from '~/utils/http'
import './index.scss'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      total: 0,
      list: [],
      noMore: false,
      loading: false,
      balance: {
        get: '',
        set: ''
      }
    }
  }

  componentWillMount() {}

  componentDidMount() {
    this.getData()
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  onReachBottom() {
    this.getData()
  }

  getData() {
    const { state } = this
    if (state.loading || state.noMore) {
      return
    }
    this.setState({
      loading: true
    })
    http.get('user/transactions', {
      page: state.page,
      take: 20
    })
      .then(data => {
        if (!state.page) {
          this.setState({
            balance: data.balance,
            total: data.total
          })
        }
        this.setState({
          list: state.list.concat(data.list),
          noMore: data.noMore,
          page: state.page + 1,
          loading: false
        })
      })
      .catch(() => {
        this.setState({
          loading: false
        })
      })
  }

  computedRecord(record) {
    const { type, user, model, amount, created_at } = record
    const day = created_at.split(' ')[0]
    switch (type) {
      case 0:
        return {
          title: '每日签到',
          desc: `签到获得团子奖励·${day}`
        }
      case 1:
        return {
          title: '邀请注册',
          desc: `邀请「${user.nickname}」注册，赠送团子`
        }
      case 2:
        return {
          title: '活跃奖励',
          desc: '每天在站内的活跃度达到一定值，就会得到团子奖励'
        }
      case 3:
        return {
          title: '活跃奖励',
          desc: '管理员每天在站内的活跃度达到一定值，就会得到额外的团子奖励'
        }
      case 4:
        return {
          title: '投食帖子',
          desc: amount > 0 ? `${user.nickname}投食了你的帖子《${model.title}》` : `你投食了${user.nickname}的帖子《${model.title}》`
        }
      case 5:
        return {
          title: '投食相册',
          desc: amount > 0 ? `${user.nickname}投食了你的相册《${model.title}》` : `你投食了${user.nickname}的相册《${model.title}》`
        }
      case 6:
        return {
          title: '投食漫评',
          desc: amount > 0 ? `${user.nickname}投食了你的漫评《${model.title}》` : `你投食了${user.nickname}的漫评《${model.title}》`
        }
      case 7:
        return {
          title: '投食回答',
          desc: amount > 0 ? `${user.nickname}投食了你的回答《${model.title}》` : `你投食了${user.nickname}的回答《${model.title}》`
        }
      case 8:
        return {
          title: '投食视频',
          desc: amount > 0 ? `${user.nickname}投食了你的视频《${model.title}》` : `你投食了${user.nickname}的视频《${model.title}》`
        }
      case 9:
        return {
          title: '偶像入股',
          desc: `入股:「${model.title}」`
        }
      case 10:
        return {
          title: '提现',
          desc: '提现扣除光玉'
        }
      case 11:
        return {
          title: '视频被删除',
          desc: `视频《${model.title}》被删除，扣除其获得的投食数`
        }
      case 12:
        return {
          title: '答案被删除',
          desc: `你在问题《${model.title}》下的回答被删除，扣除光玉`
        }
      case 13:
        return {
          title: '漫评被删除',
          desc: `漫评《${model.title}》被删除，扣除其获得的投食数`
        }
      case 14:
        return {
          title: '相册被删除',
          desc: `相册《${model.title}》被删除，扣除其获得的投食数`
        }
      case 15:
        return {
          title: '帖子被删除',
          desc: `帖子《${model.title}》被删除，扣除其获得的投食数`
        }
      case 16:
        return {
          title: '奖励团子',
          desc: '由于你触发了特殊剧情，获得系统为你奖励的团子'
        }
      case 17:
        return {
          title: '奖励光玉',
          desc: '由于你触发了特殊剧情，获得系统为你奖励的光玉'
        }
      case 18:
        return {
          title: '活跃奖励',
          desc: '每天在站内的活跃度达到一定值，就会得到光玉奖励'
        }
      case 19:
        return {
          title: '活跃奖励',
          desc: '管理员每天在站内的活跃度达到一定值，就会得到额外的光玉奖励'
        }
      case 20:
        return {
          title: '邀请注册',
          desc: `你是被「${user.nickname}」邀请而来，获得团子奖励`
        }
      case 21:
        return {
          title: '承包视频',
          desc: '你承包了一个季度的番剧'
        }
      case 22:
        return {
          title: '股市交易',
          desc: amount > 0 ? `${user.nickname}购买了你发布的「${model.title}」的股份交易` : `你购买了${user.nickname}发布的「${model.title}」的股份交易`
        }
      case 23:
        return {
          title: '视频被承包',
          desc: '你的视频被人承包了'
        }
      case 24:
        return {
          title: '股市采购',
          desc: `「${model.title}」的经纪人${user.nickname}在股市采购了你的帖子`
        }
      case 25:
        return {
          title: '偶像赞助',
          desc: `你通过向帖子《${model.title}》投食赞助了偶像${user.name}`
        }
    }
  }

  render() {
    const { balance, list, loading, noMore } = this.state
    const records = list.map(record => {
      const data = this.computedRecord(record)
      const key = Math.random().toString(36).slice(2, -1)
      return (
        <AtListItem
          key={key}
          taroKey={key}
          arrow=''
          note={data.desc}
          title={data.title}
          extraText={record.amount > 0 ? `+${record.amount}` : record.amount}
        />
      )
    })
    return (
      <View className='transaction'>
        <View className='balance'>
          <View className='get'>
            收入：￥{balance.get}
          </View>
          <View className='set'>
            收入：￥{balance.set}
          </View>
        </View>
        <AtList>{records}</AtList>
        <AtLoadMore status={loading ? 'loading' : noMore ? 'noMore' : 'more'}/>
      </View>
    )
  }
}
