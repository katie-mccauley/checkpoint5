import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class PostsService {

  async getAll() {
    const res = await api.get('api/posts')
    logger.log(res.data)
    AppState.posts = res.data.posts
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
}

export const postsService = new PostsService()