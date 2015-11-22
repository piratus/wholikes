import Client from '../data/Client'


export const API_CALL = Symbol('API call')


export default function apiMiddleware({getState}) {
  const {auth} = getState()
  const client = new Client(auth.accessToken)

  return (next)=> (action)=> {
    if (!action[API_CALL]) {
      return next(action)
    }

    const {url, types, params = {}, all = false} = action[API_CALL]
    const [startAction, successAction, failAction] = types

    next({type: startAction})

    function onResult(response) {
      const result = next({type: successAction, response})
      if (all && response.pagination && response.pagination.nextCursor) {
        const cursor = response.pagination.nextCursor
        return client.fetch(url, {...params, cursor}).then(onResult)
      }
      return result
    }

    function onError(error) {
      return next({type: failAction, error})
    }

    return client.fetch(url, params)
      .then(onResult)
      .catch(onError)
  }
}
