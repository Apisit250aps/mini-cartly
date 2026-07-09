import { Elysia } from 'elysia'
import { response } from '@/lib/plugins/response'

const api = new Elysia({ prefix: '/api' })
api.use(response)
api.onError((e) => console.error(e))
export default api
