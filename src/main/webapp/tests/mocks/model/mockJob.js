var dataJob1 = {
  id: 1,
  name: "Job 1",
  readers: [
    {
      id: 1,
      name: "Reader 1",
      source: {
        id: 1,
        name: "Source 1",
        uri: "http://localhost:8983/solr/collection1",
        username: null
      },
      fields: [],
      sortTitle: "title",
      sortId: "id"
    }
  ],
  writers: [
    {
      id: 1,
      name: "Writer 1",
      source: {
        id: 1,
        name: "Source 1",
        uri: "http://localhost:8983/solr/collection1",
        username: null
      },
      outputMappings: [
        {
          id: 1,
          inputField: "title",
          mappings: ["title"]
        },
        {
          id: 2,
          inputField: "creator",
          mappings: ["creator"]
        },
        {
          id: 3,
          inputField: "created",
          mappings: ["created"]
        },
        {
          id: 4,
          inputField: "subject",
          mappings: ["subject"]
        },
        {
          id: 5,
          inputField: "format",
          mappings: ["format"]
        },
        {
          id: 6,
          inputField: "language",
          mappings: ["language"]
        },
        {
          id: 7,
          inputField: "terms.identifier",
          mappings: ["id"]
        }
      ]
    }
  ],
  schedule: {
    active: false,
    scheduleData: {}
  }
};

var dataJob2 = {
  id: 2,
  name: "Job 2",
  readers: [
    {
      id: 1,
      name: "Reader 1",
      source: {
        id: 1,
        name: "Source 1",
        uri: "http://localhost:8983/solr/collection1",
        username: null
      },
      fields: [],
      sortTitle: "title",
      sortId: "id"
    }
  ],
  writers: [
    {
      id: 1,
      name: "Writer 1",
      source: {
        id: 1,
        name: "Source 1",
        uri: "http://localhost:8983/solr/collection1",
        username: null
      },
      outputMappings: dataJob1.writers.outputMappings
    }
  ],
  schedule:
    {
      active: false,
      scheduleData: {}
    }
};

var dataJob3 = {
  id: 3,
  name: "Job 3",
  readers: [
    {
      id: 1,
      name: "Reader 1",
      source: {
        id: 1,
        name: "Source 1",
        uri: "http://localhost:8983/solr/collection1",
        username: null
      },
      fields: [],
      sortTitle: "title",
      sortId: "id"
    },
    {
      id: 2,
      name: "Reader 2",
      source: {
        id: 2,
        name: "Source 2",
        uri: "http://localhost:8983/solr/collection2",
        username: null
      },
      fields: [],
      sortTitle: "title",
      sortId: "id"
    }
  ],
  writers: [
    {
      id: 1,
      name: "Writer 1",
      source: {
        id: 1,
        name: "Source 1",
        uri: "http://localhost:8983/solr/collection1",
        username: null
      },
      outputMappings: []
    },
    {
      id: 2,
      name: "Writer 2",
      source: {
        id: 2,
        name: "Source 2",
        uri: "http://localhost:8983/solr/collection2",
        username: null
      },
      outputMappings: []
    }
  ],
  schedule: {
    active: false,
    scheduleData: {}
  }
};

var mockJob = function($q) {
  var model = mockModel("Job", $q, dataJob1);

  return model;
};

angular.module("mock.job", []).service("Job", mockJob);
