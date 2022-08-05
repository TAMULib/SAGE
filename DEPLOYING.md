The DEPLOYING documentation is currently a work in progress.

### Development with Weaver

* Clone [Weaver-UI-Core](git@github.com:TAMULib/Weaver-UI-Core.git)
* Start docker compose within Weaver-UI-Core directory.

```sh
docker-compose up
```

* Copy the `example.env` file and call it `.env`. These are build args and container environment variables used in docker-compose.yml.
* Change variables as needed.
* Run `docker-compose` commands.

```sh
docker-compose build --no-cache
docker-compose up
```

### AUTHORIZATION

By default, SAGE is configured to support email based registration and authorization with password ('emailRegistration'). There is generally no need to change this.

SAGE can also be configured to use Weaver Authentication ('weaverAuth'), an external authorization abstraction which brings additional identity provider support into the Weaver platform.

### ADVANCED AUTHORIZATION CONFIGURATION

The SAGE UI's appConfig object has an 'authStrategies' property that accepts a list of strings representing the active auth strategies:

https://github.com/TAMULib/SAGE/blob/master/build/appConfig.js.template#L8

The SAGE UI displays different login prompts and exhibits certain behaviors based on the authStrategies property:

https://github.com/TAMULib/SAGE/blob/master/src/main/webapp/app/controllers/appLoginController.js

https://github.com/TAMULib/SAGE/blob/master/src/main/webapp/app/views/modals/loginModal.html

When emailRegistration is active, the 'appLoginController', an extension of Weaver's LoginController is used. When 'weaverAuth' is active, a controller provided by Weaver UI Core is used.

If you are using an auth service other than SAGE's built in service, you will need to provide its url using the 'authService' property, also part of the appConfig object:

https://github.com/TAMULib/SAGE/blob/master/build/appConfig.js.template#L10

It's most common to choose one authentication strategy, but it is technically possible to support two or more strategies simultaneously by listing each entry separated by commas.


### DEVELOPMENT ONLY

The SAGE service can also be run with a development only profile that provides mock auth credentials.

This is activated by choosing 'mock-token-provider' as the active profile in application.yml:

https://github.com/TAMULib/SAGE/blob/master/src/main/resources/application.yml

And pointing the SAGE UI to the mock auth API by setting the appConfig object's 'authService' property to:

window.location.protocol + '//' + window.location.host + window.location.base + '/mock/auth'

https://github.com/TAMULib/SAGE/blob/master/build/appConfig.js.template

The authorization level of the mock user is determined by the 'mockRole' property, also on the appConfig object:

https://github.com/TAMULib/SAGE/blob/master/build/appConfig.js.template


### CUSTOMIZING AUTH STRATEGIES

The emailRegistration strategy can be customized by altering the AuthController java class:
https://github.com/TAMULib/SAGE/blob/master/src/main/java/edu/tamu/sage/auth/controller/AuthController.java

It is also possible to substitute this class for a different class by having that class extend edu.tamu.weaver.auth.controller.WeaverAuthController.

You will also need to remove the @RestController and @RequestMapping("/auth") annotations from AuthController and add them to your new class. Under the hood, the Weaver Framework uses the "/auth" api endpoint to pass auth tokens to client applications.