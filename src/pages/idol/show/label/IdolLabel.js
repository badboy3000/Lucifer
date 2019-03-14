import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtGrid, AtIcon } from 'taro-ui'
import './index.scss'

export default class IdolLabel extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { id } = this.props.idol

    return (
      <View className='idol-label'>
        <navigator
          class='link'
          hover-class='none'
          url={`/pages/idol/link/index?type=comment&id=${id}`}
        >
          <AtIcon
            value='message'
            size='16'
            color='#ff6881'
          />
          <Text className='text'>留言板</Text>
        </navigator>
        <navigator
          class='link'
          hover-class='none'
          url={`/pages/idol/link/index?type=chart&id=${id}`}
        >
          <AtIcon
            value='analytics'
            size='16'
            color='#ff6881'
          />
          <Text className='text'>股市图</Text>
        </navigator>
        <navigator
          class='link'
          hover-class='none'
          url={`/pages/idol/link/index?type=buy&id=${id}`}
        >
          <AtIcon
            value='shopping-cart'
            size='16'
            color='#ff6881'
          />
          <Text className='text'>采购表</Text>
        </navigator>
        <navigator
          class='link'
          hover-class='none'
          url={`/pages/idol/link/index?type=timeline&id=${id}`}
        >
          <AtIcon
            value='streaming'
            size='16'
            color='#ff6881'
          />
          <Text className='text'>大事记</Text>
        </navigator>
        <navigator
          class='link'
          hover-class='none'
          url={`/pages/idol/link/index?type=setting&id=${id}`}
        >
          <AtIcon
            value='settings'
            size='16'
            color='#ff6881'
          />
          <Text className='text'>变更处</Text>
        </navigator>
      </View>
    )
  }
}

IdolLabel.defaultProps = {
  idol: {}
}
