import { Router } from 'express'

import { SearchController } from './controllers/SearchController'

const routes = Router()

const searchController = new SearchController()

// Routes

routes.get('/search', searchController.listSearch)

export { routes }
