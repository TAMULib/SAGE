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
    },
    testLocation: {
      'endpoint': '/private/queue',
      'controller': 'core/solr',
      'httpMethod': 'POST',
      'method': 'test/location'
    },
    testAuthorization: {
      'endpoint': '/private/queue',
      'controller': 'core/solr',
      'httpMethod': 'POST',
      'method': 'test/authorization'
    },
  },
  SolrReader: {
    channel: '/channel/reader/solr',
    validations: true,
    all: {
        'endpoint': '/private/queue',
        'controller': 'reader/solr',
        'httpMethod': 'GET',
        'method': ''
    },
    create: {
      'endpoint': '/private/queue',
      'controller': 'reader/solr',
      'httpMethod': 'POST',
      'method': ''
    },
    update: {
        'endpoint': '/private/queue',
        'controller': 'reader/solr',
        'httpMethod': 'PUT',
        'method': ''
    },
    remove: {
        'endpoint': '/private/queue',
        'controller': 'reader/solr',
        'httpMethod': 'DELETE',
        'method': ''
    },
    getMetadataFields: {
        'endpoint': '/private/queue',
        'controller': 'reader/solr',
        'httpMethod': 'GET',
        'method': 'metadata-fields'
    }
  },
  SolrWriter: {
    channel: '/channel/writer/solr',
    validations: true,
    all: {
        'endpoint': '/private/queue',
        'controller': 'writer/solr',
        'httpMethod': 'GET',
        'method': ''
    },
    create: {
      'endpoint': '/private/queue',
      'controller': 'writer/solr',
      'httpMethod': 'POST',
      'method': ''
    },
    update: {
        'endpoint': '/private/queue',
        'controller': 'writer/solr',
        'httpMethod': 'PUT',
        'method': ''
    },
    remove: {
        'endpoint': '/private/queue',
        'controller': 'writer/solr',
        'httpMethod': 'DELETE',
        'method': ''
    }
  }
};