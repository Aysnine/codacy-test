import axios from 'axios'
import { get } from 'lodash'

// https://github.com/MZCretin/RollToolsApi

// !TRICKY
const APP_ID = 'otlhsrnremdf1zfc'
const APP_SECRET = 'VXJncFZCa0I1MXIvQm1QY25HS2hxdz09'

export const client = () => {
  const instance = axios.create({
    baseURL: 'https://www.mxnzp.com/api'
  })

  instance.interceptors.request.use(
    config => {
      const params = {
        ...(config.params || {}),
        app_id: APP_ID,
        app_secret: APP_SECRET
      }
      config.params = params
      return config
    },
    error => Promise.reject(error)
  )

  instance.interceptors.response.use(
    response => {
      const code = get(response, 'data.code')
      if (code !== 1) {
        return Promise.reject(new Error(get(response, 'data.msg')))
      }
      return response
    },
    error => Promise.reject(error)
  )

  const apis = {
    image: {
      girl: (page = 1) =>
        instance.get('/image/girl/list', { params: { page } }),
      girl_random: () => instance.get('/image/girl/list/random')
    },
    ip: {
      self: () => instance.get('/ip/self'),
      aim_ip: ip => instance.get('/ip/aim_ip', { params: { ip } })
    },
    address: {
      list: () => instance.get('/address/list')
    },
    qrcode: (
      content,
      { size = 500, type = 1, logo = null, logo_size = 100 } = {}
    ) => {
      const baseParams = { content, size, type }
      const logoParams = { logo, logo_size }
      if (logo) {
        const formData = new FormData()
        formData.append('logo_img', logo)
        return instance.post('/qrcode/create/logo', formData, {
          params: { ...baseParams, ...logoParams },
          headers: { 'Content-Type': 'multipart/form-data' }
        })
      } else {
        return instance.get('/qrcode/create/single', {
          params: baseParams
        })
      }
    }
  }

  instance.apis = apis

  return instance
}
