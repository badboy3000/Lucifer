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
    if (this.state.guest) {
      return toast.info('请先登录')
    }
    if (this.props.idol.has_star === '0.00') {
      return toast.info('请先入股')
    }
    this.setState({
      open: true
    })
  }

  render () {
    const { idol } = this.props
    return (
      <View className='sale-idol-btn-wrap'>
        <Button
          className='sale-btn'
          onClick={this.openDialog}
        >出售</Button>
        <AtFloatLayout
          isOpened={this.state.open}
          title={`出售「${idol.name}」的股份`}
          onClose={this.handleClose}
        >
          这是内容区 随你怎么写这是内容区 随你怎么写这是内容区 随你怎么写这是内容区
          随你怎么写这是内容区 随你怎么写这是内容区 随你怎么写
        </AtFloatLayout>
      </View>
    )
  }
}

