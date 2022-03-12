import { AppState } from "../AppState"
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
class AdsService {

  async getAllA() {
    const res = await api.get('api/ads')
    logger.log(res.data)
    AppState.all = res.data
  }
}

export const adsService = new AdsService()