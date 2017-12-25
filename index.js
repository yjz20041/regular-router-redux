export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';
export const LOCATION_CHANGED = '@@router/LOCATION_CHANGED';
export const LOCATION_GO = '@@router/LOCATION_GO';
let innerRouter;
export const syncRouterWithStore = (store, router) => {
    const {dispatch} = store;
    innerRouter = router;
    router.on('begin', option => {
      dispatch({
          type: LOCATION_CHANGE,
          option
      })
    })
    .on('end', option => {
      dispatch({
          type: LOCATION_CHANGED,
          option
      })
  })
}

export const routerMiddleware = () => {
  return next => action => {
    if (action.type !== LOCATION_GO) {
      return next(action)
    }

    innerRouter.go(action.state, {
      param: action.param
    })
  }
}