import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class PostsService {

  async getAll(query = {}) {
    const res = await api.get('api/posts/', { params: query })
    logger.log(res.data)
    AppState.posts = res.data.posts
    AppState.newPage = res.data.newer
    AppState.oldPage = res.data.older
  }
  async like(data) {
    const res = await api.post('api/posts/' + data.id + '/like')
    // AppState.likes = res.data.likes
    // const like = res.data.posts
    // let post = res.data.posts.findIndex(p => p.id == data.id)
    // logger.log(res.data.posts[post].likes)
    // AppState.likes.push(res.data.posts[post].likes)
    logger.log(res.data)
    AppState.likes = res.data.likes
    let like = AppState.posts.findIndex(l => l.id === data.id)
    AppState.posts.splice(like, 1, res.data)

  }

  async changePage(page) {
    const res = await api.get(page)
    logger.log(page)
    AppState.posts = res.data.posts
    AppState.newPage = res.data.newer
    AppState.oldPage = res.data.older
  }

  async createPost(body) {
    const res = await api.post('api/posts/', body)
    logger.log(res.data)
    AppState.posts.unshift(res.data)
  }

  async deletePost(post) {
    const res = await api.delete('api/posts/' + post.id)
    logger.log("this is deleted post", res.data)
    const deleteIndex = AppState.posts.findIndex(p => p.id == post.id)
    AppState.posts.splice(deleteIndex, 1)

  }
}

export const postsService = new PostsService()