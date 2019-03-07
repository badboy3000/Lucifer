import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import http from '~/utils/http'
import cache from '~/utils/cache'
import './index.scss'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      deal: null,
      user: null,
      idol: null,
      is_mine: false
    }
  }

  componentWillMount () { }

  componentDidMount () {
    this.getDealInfo()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  getDealInfo() {
    http.get(`cartoon_role/${this.$router.params.id}/deal_show`)
      .then(data => {
        const user = cache.get('USER', {})
        this.setState({
          ...data,
          is_mine: user.id === data.user.id
        })
      })
  }

  render () {
    return (
      <View>
        <Text>text</Text>
      </View>
    )
  }
}

