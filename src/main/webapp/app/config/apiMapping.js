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
  SolrCore: {
    channel: '/channel/core/solr',
    validations: true,
    all: {
        'endpoint': '/private/queue',
        'controller': 'core/solr',
        'httpMethod': 'GET',
        'method': ''
    },
    create: {
      'endpoint': '/private/queue',
      'controller': 'core/solr',
      'httpMethod': 'POST',
      'method': ''
    },
    update: {
        'endpoint': '/private/queue',
        'controller': 'core/solr',
        'httpMethod': 'PUT',
        'method': ''
    },
    remove: {
        'endpoint': '/private/queue',
        'controller': 'core/solr',
        'httpMethod': 'DELETE',
        'method': ''
    }
  }
};