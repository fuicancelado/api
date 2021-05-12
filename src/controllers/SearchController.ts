import { Request, Response } from 'express';

import { T } from '../config/TwitConfiguration';

class SearchController {
  async listSearch(request: Request, res: Response) {
    const { searchItem, searchDate } = request.body;

    T.get(
      'search/tweets',
      { q: `${searchItem} since:${searchDate}`, count: 2 },
      (err, data, response) => {
        const tweets = data;

        return res.json(tweets);
      },
    );
  }
}

export { SearchController };
