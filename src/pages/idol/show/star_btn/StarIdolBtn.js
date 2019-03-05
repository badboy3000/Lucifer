import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { AtFloatLayout } from "taro-ui"
import toast from '~/utils/toast'
import cache from '~/utils/cache'
import './index.scss'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      guest: !cache.get('USER')
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleClose() {
    this.setState({
      open: false
    })
  }

  openDialog() {
    if (this.props.idol.is_locked) {
      return toast.info('已经卖完了')
    }
    if (this.state.guest) {
      return toast.info('请先登录')
    }
    this.setState({
      open: true
    })
  }

  render () {
    const { idol } = this.props
    return (
      <View className='star-idol-btn-wrap'>
        <Button
          className={idol.is_locked ? 'star-btn locked' : 'star-btn'}
          onClick={this.openDialog}
        >{ idol.is_locked ? '停牌' : '入股' }</Button>
        <AtFloatLayout
          isOpened={this.state.open}
          title={`入股：${idol.name}`}
          onClose={this.handleClose}
        >
          这是内容区 随你怎么写这是内容区 随你怎么写这是内容区 随你怎么写这是内容区
          随你怎么写这是内容区 随你怎么写这是内容区 随你怎么写
        </AtFloatLayout>
      </View>
    )
  }
}

