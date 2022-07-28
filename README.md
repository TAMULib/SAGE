[![Build Status](https://github.com/TAMULib/SAGE/workflows/Build/badge.svg)](https://github.com/TAMULib/SAGE/actions?query=workflow%3ABuild)
[![Coverage Status](https://coveralls.io/repos/github/TAMULib/SAGE/badge.svg)](https://coveralls.io/github/TAMULib/SAGE)
<!-- [![Performance](https://tamulib.github.io/SAGE/audit/assets/performance.svg)](https://tamulib.github.io/SAGE/audit/#performance)
[![Accessibility](https://tamulib.github.io/SAGE/audit/assets/accessibility.svg)](https://tamulib.github.io/SAGE/audit/#accessibility)
[![Best Practices](https://tamulib.github.io/SAGE/audit/assets/best-practices.svg)](https://tamulib.github.io/SAGE/audit/#best-practices)
[![SEO](https://tamulib.github.io/SAGE/audit/assets/seo.svg)](https://tamulib.github.io/SAGE/audit/#seo)
[![Progressive Web App](https://tamulib.github.io/SAGE/audit/assets/pwa.svg)](https://tamulib.github.io/SAGE/audit/#pwa) -->

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

### Deployment

* Copy the `example.env` file and call it `.env`. These are build args used in docker-compose.yml.
* Change variables as needed.
* Run `docker-compose` commands.

```sh
docker-compose up
```

### Developer Documentation

- [Contributors Documentation](https://github.com/TAMULib/SAGE/blob/master/CONTRIBUTING.md)
- [Deployment Documentation](https://github.com/TAMULib/SAGE/blob/master/DEPLOYING.md)
- [API Documentation](https://tamulib.github.io/SAGE)

Please feel free to file any issues concerning SAGE to the issues section of the repository. Any questions concerning SAGE can be directed to [helpdesk@library.tamu.edu]()
