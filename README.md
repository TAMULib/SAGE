<a name="readme-top"></a>
[![Build Status][build-badge]][build-status]
[![Coverage Status][coverage-badge]][coverage-status]


# Search Aggregation Engine

*Search Aggregation Engine (SAGE)*, consisting of a service back-end and a client front-end, is developed and maintained by [Texas A&M University Libraries][tamu-library].

*SAGE's* feature set includes both the ability aggregate disparate searchable sources into a common [Solr][solr-url] index, as well as the ability expose [Solr][solr-url] indexes through a dynamic user interface.

<div align="right">(<a href="#readme-top">back to top</a>)</div>


## User Documentation

By default, *SAGE* is configured to support e-mail based registration and authorization using passwords using the `emailRegistration` setting.
There is generally no need to change this.

*SAGE* can also be configured to use *Weaver Authentication* using the `weaverAuth` setting.
The *Weaver Authentication* is an external authorization abstraction which brings additional identity provider support into the platform.

More advanced authorization configurations are described in the [Deployment Guide][deployment-guide].

<div align="right">(<a href="#readme-top">back to top</a>)</div>


## Deployment

A quick and easy deployment method using `docker-compose` is described in the [Deployment Guide][deployment-guide].

For _advanced use cases_, or when `docker-compose` is unavailable, the use of `docker` or `npm`/`mvn` is also described in the [Deployment Guide][deployment-guide].

Deployment, in general, may look something like this:

```shell
cd solr
docker build -t sage/solr .
docker run -p 8983:8983 -it sage/solr
```

```shell
cp example.env .env
cp example.env.client .env.client
cp example.env.service .env.service

# Make any changes to the .env, .env.client, and .env.service files before here.
docker-compose up
```

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

[tamu-library]: http://library.tamu.edu
[api-docs]: https://tamulib.github.io/SAGE
[solr-url]: https://solr.apache.org/

[deployment-guide]: DEPLOYING.md
[contribute-guide]: CONTRIBUTING.md
[license]: LICENSE
