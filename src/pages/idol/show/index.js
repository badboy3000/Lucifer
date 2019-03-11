import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtList, AtListItem } from 'taro-ui'
import http from '~/utils/http'
import IdolInfo from './info/IdolInfo'
import IdolPanel from './panel/IdolPanel'
import IdolOwner from './owner/IdolOwner'
import IdolProduct from './product/IdolProduct'
import IdolComment from './comment/IdolComment'
import PageState from '~/components/PageState'
import event from '~/utils/event'
import helper from '~/utils/helper'
import './index.scss'

export default class extends Component {
  config = {
    navigationStyle: 'custom'
  }

  constructor(props) {
    super(props)
    this.state = {
      page_loading: true,
      page_error: false,
      idol: null,
      bangumi: null,
      share_data: null,
      current: 1
    }
  }

  componentWillMount() {}

  componentDidMount() {
    this.getIdolInfo()
  }

  onShareAppMessage() {
    return helper.share(this.state.share_data)
  }

  componentWillUnmount() {}

  componentDidShow() {}

  onReachBottom() {
    event.emit('on-reach-bottom')
  }

  componentDidHide() {}

  getIdolInfo() {
    http
      .fetch(`cartoon_role/${this.$router.params.id}/stock_show`)
      .then(data => {
        this.setState({
          idol: data.role,
          bangumi: data.bangumi,
          share_data: data.share_data,
          page_loading: false
        })
      })
      .catch(() => {
        this.setState({
          page_loading: false,
          page_error: true
        })
      })
  }

  tabSwitch(index) {
    this.setState({
      current: index
    })
    event.emit(`idol-${this.$router.params.id}-tab-switch-${index}`)
  }

  onUpdateUserHasStar(count) {
    this.setState({
      idol: Object.assign(this.state.idol, {
        has_star: parseFloat(+this.state.idol.has_star + +count).toFixed(2)
      })
    })
    event.emit('buy-idol-stock')
  }

  render() {
    if (this.state.page_loading) {
      return <PageState type='loading' />
    }
    if (this.state.page_error) {
      return <PageState type='error' />
    }
    const { idol } = this.state
    return (
      <View>
        <IdolPanel idol={idol} onUpdateStar={this.onUpdateUserHasStar} />
        <AtTabs
          current={this.state.current}
          scroll
          tabList={[
            { title: '产品区' },
            { title: '信息表' },
            { title: '留言板' },
            { title: '董事会' }
          ]}
          swipeable={false}
          onClick={this.tabSwitch}
        >
          <AtTabsPane current={this.state.current} index={0}>
            <IdolProduct />
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <IdolInfo idol={idol} />
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={2}>
            <IdolComment />
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={3}>
            <IdolOwner idol={idol} />
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}
