/* eslint-disable global-require */

// The top-level (parent) route
export default {

  path: '/',

  // Keep in mind, routes are evaluated in order
  children: [
    require('./about').default,
    require('./home').default,
    require('./person').default,
    require('./people').default,
    require('./item').default,
    require('./group').default,
    require('./subject').default,
    require('./subjects').default,
    require('./search').default,
    require('./format').default,
    require('./formats').default,
    require('./type').default,
    require('./works').default,
    // Wildcard routes, e.g. { path: '*', ... } (must go last)
    require('./notFound').default,
  ],

  async action({next}) {
    // Execute each child route until one of them return the result
    const route = await next()

    // Provide default values for title, description etc.
    route.title = `${route.title || 'Untitled Page'}`
    route.description = route.description || ''

    return route
  },

}
