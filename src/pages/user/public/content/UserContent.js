import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import UserIdol from '../idol/UserIdol'
import UserDeal from '../deal/UserDeal'
import event from '~/utils/event'
import './index.scss'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      current: 0
    }
  }

  componentWillMount () { }

  componentDidMount () {
    event.emit('user-tab-0-switch')
    event.on('on-reach-bottom', () => {
      event.emit(`user-tab-${this.state.current}-switch`, true)
    })
  }

  componentWillUnmount () {
    event.off('on-reach-bottom')
  }

  componentDidShow () { }

  componentDidHide () { }

  handleClick (index) {
    this.setState({
      current: index
    })
    event.emit(`user-tab-${index}-switch`, false)
  }

  render () {
    const { user } = this.props
    const { current } = this.state
    const tabList = [{ title: '偶像' }, { title: '交易' }]
    return (
      <AtTabs
        current={current}
        tabList={tabList}
        onClick={this.handleClick}
      >
        <AtTabsPane current={current} index={0} >
          <UserIdol user={user}/>
        </AtTabsPane>
        <AtTabsPane current={current} index={1}>
          <UserDeal user={user}/>
        </AtTabsPane>
      </AtTabs>
    )
  }
}

