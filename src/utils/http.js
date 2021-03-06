import Fly from 'flyio/dist/npm/wx'
import cache from '~/utils/cache'
import toast from '~/utils/toast'
import md5 from 'blueimp-md5'
import env from '~/env'

const fly = new Fly()
const isProd = process.env.NODE_ENV === 'production'

fly.interceptors.request.use(request => {
  const time = parseInt(Date.now() / 1000)
  request.baseURL = isProd
    ? 'https://api.calibur.tv/'
    : 'http://localhost:3099/'
  request.headers['Accept'] = 'application/x.api.latest+json'
  request.headers['Authorization'] = `Bearer ${cache.get('JWT-TOKEN')}`
  request.headers['X-Auth-Time'] = time
  request.headers['X-Auth-Value'] = md5(`${time}${env.API_TOKEN}`)
  request.timeout = 10000
  return request
})

fly.interceptors.response.use(
  res => {
    if (res.request.url === 'door/refresh_token') {
      const token = res.headers.authorization[0].split(' ')[1]
      cache.set('JWT-TOKEN', token)
    }
    return res.data.data
  },
  err => {
    const code = err.status
    const resp = {
      code,
      message: ''
    }
    if (!err.response) {
      resp.message = '网路请求失败'
    } else if (code === 0) {
      resp.message = '网络不稳定！'
    } else if (code === 1) {
      resp.message = '网络太慢了！'
    } else {
      const { message } = err.response.data
      if (typeof message === 'string') {
        resp.message = message
      } else {
        resp.message = message[Object.keys(message)[0]][0]
      }
    }
    if (
      err.request.url !== 'door/current_user' &&
      err.request.url !== 'door/refresh_token'
    ) {
      toast.info(resp.message)
    }
    return Promise.reject(resp)
  }
)

fly.fetch = url => {
  const timeout = () => new Promise(resolve => setTimeout(resolve, 1000))
  return new Promise((resolve, reject) => {
    Promise.all([fly.get(url), timeout()])
      .then(data => {
        resolve(data[0])
      })
      .catch(reject)
  })
}

export default fly
