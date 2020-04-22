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
    testPing: {
      'endpoint': '/private/queue',
      'controller': 'source/solr',
      'httpMethod': 'POST',
      'method': 'test/ping'
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
    getAvailableFields: {
      'endpoint': '/private/queue',
      'controller': 'source/solr',
      'httpMethod': 'GET',
      'method': 'fields/available'
    },
    getIndexedFields: {
      'endpoint': '/private/queue',
      'controller': 'source/solr',
      'httpMethod': 'GET',
      'method': 'fields/indexed'
    },
    getApplicationTypes: {
      'endpoint': '/private/queue',
      'controller': 'source/solr',
      'httpMethod': 'GET',
      'method': 'application-types'
    },
    readable: {
      'endpoint': '/private/queue',
      'controller': 'source/solr',
      'method': 'readable'
    },
    writeable: {
      'endpoint': '/private/queue',
      'controller': 'source/solr',
      'method': 'writeable'
    }
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
    },
    runAll: {
      'endpoint': '/private/queue',
      'controller': 'job/solr',
      'httpMethod': 'GET',
      'method': 'run-all'
    },
    run: {
      'endpoint': '/private/queue',
      'controller': 'job/solr',
      'httpMethod': 'GET',
      'method': 'run/:id'
    }
  },
  InternalMetadata: {
    channel: '/channel/internal/metadata',
    validations: true,
    all: {
      'endpoint': '/private/queue',
      'controller': 'internal/metadata',
      'httpMethod': 'GET',
      'method': ''
    },
    create: {
      'endpoint': '/private/queue',
      'controller': 'internal/metadata',
      'httpMethod': 'POST',
      'method': ''
    },
    update: {
      'endpoint': '/private/queue',
      'controller': 'internal/metadata',
      'httpMethod': 'PUT',
      'method': ''
    },
    remove: {
      'endpoint': '/private/queue',
      'controller': 'internal/metadata',
      'httpMethod': 'DELETE',
      'method': ''
    }
  },
  Operator: {
    channel: '/channel/operators',
    validations: false,
    all: {
      'endpoint': '/private/queue',
      'controller': 'operators',
      'httpMethod': 'GET',
      'method': ''
    },
    types: {
      'endpoint': '/private/queue',
      'controller': 'operators',
      'httpMethod': 'GET',
      'method': 'types'
    },
    create: {
      'endpoint': '/private/queue',
      'controller': 'operators',
      'httpMethod': 'POST',
      'method': ''
    },
    update: {
      'endpoint': '/private/queue',
      'controller': 'operators',
      'httpMethod': 'PUT',
      'method': ''
    },
    remove: {
      'endpoint': '/private/queue',
      'controller': 'operators',
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
  },
  DiscoveryView: {
    channel: '/channel/discovery-view',
    validations: true,
    all: {
      'endpoint': '/private/queue',
      'controller': 'discovery-view',
      'httpMethod': 'GET',
      'method': ''
    },
    create: {
      'endpoint': '/private/queue',
      'controller': 'discovery-view',
      'httpMethod': 'POST',
      'method': ''
    },
    update: {
      'endpoint': '/private/queue',
      'controller': 'discovery-view',
      'httpMethod': 'PUT',
      'method': ''
    },
    remove: {
      'endpoint': '/private/queue',
      'controller': 'discovery-view',
      'httpMethod': 'DELETE',
      'method': ''
    }
  },
  DiscoveryContext: {
    channel: '/channel/discovery-view/context',
    validations: false,
    method: "",
    lazy: false,
    load: {
      'endpoint': '/private/queue',
      'httpMethod': 'GET',
      'controller': 'discovery-view/context',
      'method': ':slug'
    },
    instantiate: {
      'endpoint': '/private/queue',
      'httpMethod': 'GET',
      'controller': 'discovery-view/context',
      'method': ':slug'
    }
  },
  SingleResultContext: {
    channel: '/channel/discovery-view/context',
    validations: false,
    method: "",
    lazy: false,
    load: {
      'endpoint': '/private/queue',
      'httpMethod': 'GET',
      'controller': 'discovery-view/context',
      'method': ':slug/:resultId'
    },
    instantiate: {
      'endpoint': '/private/queue',
      'httpMethod': 'GET',
      'controller': 'discovery-view/context',
      'method': ':slug/:resultId'
    }
  },
  Result: {
    validations: false,
    lazy: true
  },
  Field: {
    validations: false,
    lazy: true
  },
  Search: {
    validations: false,
    lazy: true
  },
  SearchField: {
    validations: false,
    lazy: true
  },
  MetadataField: {
    validations: false,
    lazy: true
  },
  FacetField: {
    validations: false,
    lazy: true
  }

};
