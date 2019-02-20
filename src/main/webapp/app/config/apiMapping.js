// CONVENTION: must match model name, case sensitive
var apiMapping = {
  User: {
    channel: '/channel/user',
    lazy: true,
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
  Source: {
    channel: '/channel/source/solr',
    validations: true,
    all: {
        'endpoint': '/private/queue',
        'controller': 'source/solr',
        'httpMethod': 'GET',
        'method': ''
    },
    create: {
      'endpoint': '/private/queue',
      'controller': 'source/solr',
      'httpMethod': 'POST',
      'method': ''
    },
    update: {
        'endpoint': '/private/queue',
        'controller': 'source/solr',
        'httpMethod': 'PUT',
        'method': ''
    },
    remove: {
        'endpoint': '/private/queue',
        'controller': 'source/solr',
        'httpMethod': 'DELETE',
        'method': ''
    },
    testLocation: {
      'endpoint': '/private/queue',
      'controller': 'source/solr',
      'httpMethod': 'POST',
      'method': 'test/location'
    },
    testAuthorization: {
      'endpoint': '/private/queue',
      'controller': 'source/solr',
      'httpMethod': 'POST',
      'method': 'test/authorization'
    },
  },
  Job: {
    channel: '/channel/job/solr',
    validations: true,
    all: {
        'endpoint': '/private/queue',
        'controller': 'job/solr',
        'httpMethod': 'GET',
        'method': ''
    },
    create: {
      'endpoint': '/private/queue',
      'controller': 'job/solr',
      'httpMethod': 'POST',
      'method': ''
    },
    update: {
        'endpoint': '/private/queue',
        'controller': 'job/solr',
        'httpMethod': 'PUT',
        'method': ''
    },
    remove: {
        'endpoint': '/private/queue',
        'controller': 'job/solr',
        'httpMethod': 'DELETE',
        'method': ''
    }
  },
  Reader: {
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
  Writer: {
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
