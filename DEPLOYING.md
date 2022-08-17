<a name="readme-top"></a>
# Search Aggregation Engine Deployment Guide


## Configuration

There are several files that allow for configuration:

* The `.env` file.
* The `src/main/resources/application.yml` file.
* The `build/appConfig.js.template` file.

Most settings can and should be configured using the `.env` file when using `docker-compose`.
In other cases, either passing environment variables to `docker`, manually exporting environment variables, or directly editing the configuration files may be necessary.

The `src/main/resources/application.yml` file can be configured through environment variables.
Consult the [Spring Documentation][spring-docs-binding] in regards to this.

The `build/appConfig.js.template` has limited support for environment variables but for those that are exposed may be altered using the `.env` file.


### Authorization

By default, *SAGE* is configured to support e-mail based registration and authorization using passwords using the `emailRegistration` setting.
There is generally no need to change this.

*SAGE* can also be configured to use *Weaver Authentication* using the `weaverAuth` setting.
The *Weaver Authentication* is an external authorization abstraction which brings additional identity provider support into the platform.


### Advanced Authorization

The *SAGE UI*'s appConfig object has an `authStrategies` property that accepts a list of strings representing the active auth strategies:

```
  'authStrategies': ['emailRegistration'],
```

The *SAGE UI* displays different login prompts and exhibits certain behaviors based on the `authStrategies` property.

When `emailRegistration` is active, the `appLoginController`, an extension of **Weaver's** `LoginController` is used.
When `weaverAuth` is active, a controller provided by **Weaver UI Core** is used.

If you are using an auth service other than *SAGE's* built in service, you will need to provide its url using the 'authService' property, also part of the appConfig object:

It's most common to choose a single authentication strategy, but it is technically possible to support multiple strategies simultaneously by listing each entry separated by commas.


### Mocked Authorization

The *SAGE* service can also be run with a development only profile that provides mock auth credentials.

This is activated by choosing `mock-token-provider` as the active profile in `application.yml` (or via an appropriate environment variable):

```
spring.profiles.active: mock-token-provider
```


### Customizing Authorization Strategies

The `emailRegistration` strategy can be customized by altering the `AuthController.java` class.

It is also possible to substitute this class for a different class by having that class extend `edu.tamu.weaver.auth.controller.WeaverAuthController`.

You will also need to remove the `@RestController` and `@RequestMapping("/auth")` annotations from `AuthController` and add them to your new class.
Under the hood, the **Weaver Framework** uses the `"/auth"` API endpoint to pass auth tokens to client applications.

<div align="right">(<a href="#readme-top">back to top</a>)</div>


## Production Deployments

For **production** deployments, deploy using `docker-compose`.
This is the recommended method of deployment for production systems.

Perform the following steps to deploy (with an existing [Solr][solr-url] index):

```shell
git clone https://github.com/TAMULib/SAGE.git SAGE

cd SAGE/

cp example.env .env

# Make any changes to the .env file before here (see the configuration sections).
docker-compose up
```

If an existing [Solr][solr-url] index is not available, then perform the following after copying the `.env` file.

```shell
cd SAGE/solr
docker build -t sage/solr .
docker run -p 8983:8983 -it sage/solr
```

<sub>_* Note: when using the same terminal to start both the [Solr][solr-url] index and *SAGE*, the `-d` parameter may be useful to detach when running (`docker run -p 8983:8983 -dit sage/solr`)._</sub>

The **development** deployment can also use `docker-compose` in the same way.

<div align="right">(<a href="#readme-top">back to top</a>)</div>


## Development Deployment using **Docker**

To manually use `docker` rather than `docker-compose`, run the following:

```shell
docker image build -t project .
docker run -it project
```

<sub>_* Note: `-t project` and `-it project` may be changed to another tag name as desired, such as `-t developing_on_this` and `-it developing_on_this`._</sub><br>
<sub>_** Note: An additional step may be required, such as deploying alongside a [Weaver UI Core][weaver-ui] instance using [Verdaccio][verdaccio]._</sub>

To deploy alongside a [Weaver UI Core][weaver-ui] instance using [Verdaccio][verdaccio], do the following *before* deploying:

```shell
cd Weaver-UI-Core
docker image build -t weaver-ui .
docker run -it weaver-ui
```

The host system affects the network being used and is different from **Windows** to **Mac** to **Linux**.
* The `--network=` argument may be needed to assist with this, such as `--network=weaver`.
* The `--build-arg` may be needed to use the appropriate **NPM** registry settings, such as `--build-arg=NPM_REGISTRY="docker-linux"`.
* More network related changes may be required, so please consult the appropriate **Docker** documentation.

<div align="right">(<a href="#readme-top">back to top</a>)</div>


## Development Deployment using **NPM**

Manual installation can be summed up by running:

```shell
npm install
npm run build
npm run start
```

Those steps are a great way to start but they also fail to explain the customization that is often needed.
There are multiple ways to further configure this for deployment to better meet the desired requirements.

It is highly recommended only to perform *manual installation* when developing.
For production deployment, please use `docker-compose` via the [MAGPIE App Repo][app-repo] or use the **Docker** method above.

<div align="right">(<a href="#readme-top">back to top</a>)</div>


### Directly Configuring the `dist/appConfig.js` File

This method of configuration works by altering the built distribution configuration file.
This file is deleted every time either `npm run build` or `npm run clean` are run.
But in the event that a quick and manual change is needed, this is the simplest way to do so.

With this in mind, the deployment steps now look like:

```shell
npm install
npm run build
dist/appConfig.js
npm run start
```

<sub>_* Remember, changes to `dist/appConfig.js` are lost every time `npm run build` is run._</sub>

<div align="right">(<a href="#readme-top">back to top</a>)</div>


### Directly Configuring the `.wvr/build-config.js` Build File

This method of configuration is only recommended for `advanced uses` but is otherwise not recommended.
The advantage of this method of configuration is that of preserving the changes between _build_ or _clean_ commands.
There is only a small section that should be changed.

The `.wvr/build-config.js` file has only a single section of interest and might look something like this:
```js
    {
      from: './build/appConfig.js.template',
      to: './appConfig.js',
      transform(content) {
        return content
          .toString()
          .replace('${STOMP_DEBUG}', 'false')
          .replace('${AUTH_SERVICE_URL}', 'https://labs.library.tamu.edu/authfix')
          .replace('${WEB_SERVICE_URL}', 'http://localhost:9001/products');
      },
    },
```
In the above example snippet, only the lines containing `'${STOMP_DEBUG}'`, `'${AUTH_SERVICE_URL}'`, and `'${WEB_SERVICE_URL}'` should be changed.
For example `'http://localhost:9001/products'` could be changed to `'http://localhost:8181/products'` (changing the port number from 9001 to 8181).

Once this is done all of the steps from *Development Deployment using NPM* above can be followed.

<div align="right">(<a href="#readme-top">back to top</a>)</div>


<!-- LINKS -->
[app-repo]: https://github.com/TAMULib/Magpie
[weaver-ui]: https://github.com/TAMULib/Weaver-UI-Core
[verdaccio]: https://verdaccio.org
[solr-url]: https://solr.apache.org/

[spring-docs-binding]: https://docs.spring.io/spring-boot/docs/2.0.x/reference/html/boot-features-external-config.html#boot-features-external-config-relaxed-binding
