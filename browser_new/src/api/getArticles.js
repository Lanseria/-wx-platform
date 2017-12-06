import api from './index'

export async function getArticles () {
  const res = await api.get('/article')
  return res
}
