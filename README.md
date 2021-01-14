[![Java CI with Maven](https://github.com/TAMULib/SAGE/workflows/Java%20CI%20with%20Maven/badge.svg)](https://github.com/TAMULib/SAGE/actions?query=workflow%3A%22Java+CI+with+Maven%22)
[![Coverage Status](https://coveralls.io/repos/github/TAMULib/SAGE/badge.svg)](https://coveralls.io/github/TAMULib/SAGE)

# SAGE

SAGE is the Search Aggregation Engine developed and maintained by [Texas A&M University Libraries](http://library.tamu.edu). 

SAGE’s feature set includes both the ability aggregate disparate searchable sources into a common Solr index, as well as the ability expose Solr indexes through a dynamic user interface.

### User Documentation

SAGE boasts an intuitive user interface, but some much needed user documentation is currently a work in progress.

### SAGE Default Solr

```bash
   cd SAGE/solr
   docker build --tag=sage/solr .
   docker run -p 8983:8983 sage/solr
```

### Developer Documentation

- [Contributors Documentation](https://github.com/TAMULib/SAGE/blob/master/CONTRIBUTING.md)
- [Deployment Documentation](https://github.com/TAMULib/SAGE/blob/master/DEPLOYING.md)
- [API Documentation](https://tamulib.github.io/SAGE)

Please feel free to file any issues concerning SAGE to the issues section of the repository. Any questions concerning cap can be directed to [helpdesk@library.tamu.edu]()
