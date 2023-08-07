<a name="readme-top"></a>
[![Build Status][build-badge]][build-status]
[![Coverage Status][coverage-badge]][coverage-status]
[![Performance][performance-badge]][performance-status]
[![Accessibility][accessibility-badge]][accessibility-status]
[![Best Practices][best_practices-badge]][best_practices-status]
[![SEO][seo-badge]][seo-status]
[![Progressive Web App][pwa-badge]][pwa-status]


# Search Aggregation Engine

*Search Aggregation Engine (SAGE)*, consisting of a service back-end and a client front-end, is developed and maintained by [Texas A&M University Libraries][tamu-library].

*SAGE's* feature set includes both the ability aggregate disparate searchable sources into a common [Solr][solr-url] index, as well as the ability expose [Solr][solr-url] indexes through a dynamic user interface.

<div align="right">(<a href="#readme-top">back to top</a>)</div>


## User Documentation

*SAGE* user documentation can be found in [the wiki][user-docs].

For more technical users, deployment related configurations are described in the [Deployment Guide][deployment-guide].

<div align="right">(<a href="#readme-top">back to top</a>)</div>


## Deployment

A quick and easy deployment method using `docker-compose` is described in the [Deployment Guide][deployment-guide].

For _advanced use cases_, or when `docker-compose` is unavailable, the use of `docker` or `npm`/`mvn` is also described in the [Deployment Guide][deployment-guide].

Deployment, in general, may look something like this:

### Starting Solr
```shell
# Switch into solr directory.
cd solr/

# Create and use a local volume.
mkdir -vp volume/solr-data_var/data/sage-1_0
docker volume create solr-data_var
cp -vR configsets volume/solr-data_var/data/
cp -v core.properties volume/solr-data_var/data/sage-1_0/

# Run the Docker, using the desired pre-built image, such as solr:9.3.0-slim.
docker run --name local_solr --mount source=solr-data_var,target=/var/solr/ -p 8983:8983 -it solr:9.3.0-slim
```

### Starting Sage
```shell
cp example.env .env
cp example.env.client .env.client
cp example.env.service .env.service

# Make any changes to the .env, .env.client, and .env.service files before here.
docker-compose up
```

<sub>_* Note: It may be necessary to disable caching during build by passing `--no-cache` to the `docker-compose up` command._</sub>

<div align="right">(<a href="#readme-top">back to top</a>)</div>

## Notes on Dependencies

SAGE utilizes the angular-openseadragon library when displaying some media types.  This dependency was removed from npm, so the original JavaScript is now packaged in the SAGE code base at src/main/webapp/app/resources/scripts/ng-openseadragon/build/angular-openseadragon.js.

<div align="right">(<a href="#readme-top">back to top</a>)</div>

## Additional Resources

- [Contributors Documentation][contribute-guide]
- [Deployment Documentation][deployment-guide]
- [API Documentation][api-docs]

Please feel free to file any issues concerning *SAGE* to the issues section of the repository.

Any questions concerning *SAGE* can be directed to helpdesk@library.tamu.edu.

Copyright © 2022 Texas A&M University Libraries under the [MIT License][license].

<div align="right">(<a href="#readme-top">back to top</a>)</div>


<!-- LINKS -->
[build-status]: https://github.com/TAMULib/SAGE/actions?query=workflow%3ABuild
[build-badge]: https://github.com/TAMULib/SAGE/workflows/Build/badge.svg
[coverage-status]: https://coveralls.io/github/TAMULib/SAGE
[coverage-badge]: https://coveralls.io/repos/github/TAMULib/SAGE/badge.svg
[performance-status]: https://tamulib.github.io/SAGE/audit/#performance
[performance-badge]: https://tamulib.github.io/SAGE/audit/assets/performance.svg
[accessibility-status]: https://tamulib.github.io/SAGE/audit/#accessibility
[accessibility-badge]: https://tamulib.github.io/SAGE/audit/assets/accessibility.svg
[best_practices-status]: https://tamulib.github.io/SAGE/audit/#best-practices
[best_practices-badge]: https://tamulib.github.io/SAGE/audit/assets/best-practices.svg
[seo-status]: https://tamulib.github.io/SAGE/audit/#seo
[seo-badge]: https://tamulib.github.io/SAGE/audit/assets/seo.svg
[pwa-status]: https://tamulib.github.io/SAGE/audit/#pwa
[pwa-badge]: https://tamulib.github.io/SAGE/audit/assets/pwa.svgb/SAGE/badge.svg

[tamu-library]: http://library.tamu.edu
[api-docs]: https://tamulib.github.io/SAGE
[user-docs]: https://github.com/TAMULib/SAGE/wiki
[solr-url]: https://solr.apache.org/

[deployment-guide]: DEPLOYING.md
[contribute-guide]: CONTRIBUTING.md
[license]: LICENSE
