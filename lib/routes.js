module.exports = [
  {
    method: ['GET'],
    path: '/form/generalStats',
    handler: 'FormController.generalStats',
    config: {
      app: {
        proxyRouter: {
          ignore: true
        },
        proxyPermissions: {
          resource_name: 'apiGetFormGeneralStatsRoute',
          roles: ['admin']
        }
      }
    }
  },
]
