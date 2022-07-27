var appConfig = {

  'version': '1.0.x',

  'allowAnonymous': true,
  'anonymousRole': 'ROLE_ANONYMOUS',

  'authStrategies': ['emailRegistration'],

  //'authService': window.location.protocol + '//' + window.location.host + window.location.base + '/authfix',
  'authService': 'https://labs.library.tamu.edu/authfix',
  'webService': window.location.protocol + '//' + window.location.host + window.location.base,

  'storageType': 'session',

  'logging': {
    'log': true,
    'info': true,
    'warn': true,
    'error': true,
    'debug': true
  },

  'stompDebug': false,

  /*
    Determines the type of connection stomp will attempt to make with the service.
    TYPES:  websocket, xhr-streaming, xdr-streaming, eventsource, iframe-eventsource,
      htmlfile, iframe-htmlfile, xhr-polling, xdr-polling, iframe-xhr-polling,
      jsonp-polling
  */
  'sockJsConnectionType': ['websocket', 'xhr-polling'],

  // Set this to 'admin' or 'user' if using mock AuthService
  // otherwise set to null or false
  'mockRole': null,

  'contentMap': {
    "image": [
      "image/jpeg",
      "image/png",
      "image/gif"
    ],
    "seadragon": [
      "image/jp2",
      "image/tiff",
      "application/json",
      "application/json;charset=UTF-8"
    ],
    "pdf": [
      "pdf",
      "application/pdf"
    ],
    "avalon": [
      "avalon"
    ]
  },

  'audioVideoMap': {
    "audio": "Sound Recording",
    "video": "Moving Image"
  },

  'defaultThumbnailURI': "resources/images/default-thumbnail.jpg",
  'defaultLoadingThumbnailURI': "resources/images/loading2.gif",
  'avalonUrl': ''

};
