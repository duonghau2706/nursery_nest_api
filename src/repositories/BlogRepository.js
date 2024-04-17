import BaseRepository from './BaseRepository'
import { BlogModel } from '@/models'

class BlogRepository extends BaseRepository {
  constructor(props) {
    super(props)
    this.model = BlogModel
  }
}

export default new BlogRepository()
