// CONVENTION: must match model name, case sensitive
var apiMapping = {
  User: {
    channel: '/channel/user',
    instantiate: {
        'endpoint': '/private/queue',
        'controller': 'user',
        'method': 'credentials'
    },
    all: {
        'endpoint': '/private/queue',
        'controller': 'user',
        'method': 'all'
    },
    update: {
        'endpoint': '/private/queue',
        'controller': 'user',
        'method': 'update'
    },
    remove: {
        'endpoint': '/private/queue',
        'controller': 'user',
        'method': 'delete'
    }
  },
  Index: {
    channel: '/channel/index',
    validations: true,
    all: {
        'endpoint': '/private/queue',
        'controller': 'index',
        'method': 'all'
    },
    create: {
      'endpoint': '/private/queue',
      'controller': 'index',
      'method': 'create'
    },
    update: {
        'endpoint': '/private/queue',
        'controller': 'index',
        'method': 'update'
    },
    remove: {
        'endpoint': '/private/queue',
        'controller': 'index',
        'method': 'delete'
    }
  }
};