The DEPLOYING documentation is currently a work in progress.

# AUTHORIZATION

By default, SAGE is configured to support email based registration and authorization with password ('emailRegistration'). There is generally no need to change this.

SAGE can also be configured to use Weaver Authentication ('weaverAuth'), an external authorization abstraction which brings additional identity provider support into the Weaver platform.

# ADVANCED AUTHORIZATION CONFIGURATION

There are a few points of configuration for SAGE Authorization

- The SAGE backend service is provided a list of active Authorization strategies in its application.properties file.

https://github.com/TAMULib/SAGE/blob/master/src/main/resources/application.properties#L100

- The SAGE UI's appConfig object has an 'authStrategies' property that accepts a list of strings representing the active auth strategies:

https://github.com/TAMULib/SAGE/blob/master/src/main/webapp/app/config/appConfig.js#L8

- The SAGE UI displays different login prompts and exhibits certain behaviors based on the authStrategies property:

https://github.com/TAMULib/SAGE/blob/master/src/main/webapp/app/controllers/appLoginController.js

https://github.com/TAMULib/SAGE/blob/master/src/main/webapp/app/views/modals/loginModal.html

- When emailRegistration is active, the 'appLoginController', an extension of Weaver's LoginController is used. When 'weaverAuth' is active, a controller provided by Weaver UI Core is used.

If you are using an auth service other than SAGE's built in service, you will need to provide its url using the 'authService' property, also part of the appConfig object:

https://github.com/TAMULib/SAGE/blob/master/src/main/webapp/app/config/appConfig.js#L10


- It's most common to choose one authentication strategy, but it is technically possible to support two or more strategies simultaneously by listing each entry separated by commas.


# DEVELOPMENT ONLY

The SAGE service can also be run with a development only profile that provides mock auth credentials.

This is activated by choosing 'mock-token-provider' as the active profile in application.properties:

https://github.com/TAMULib/SAGE/blob/master/src/main/resources/application.properties

And pointing the SAGE UI to the mock auth API by setting the appConfig object's 'authService' property to:

window.location.protocol + '//' + window.location.host + window.location.base + '/mock/auth'

https://github.com/TAMULib/SAGE/blob/master/src/main/webapp/app/config/appConfig.js

The authorization level of the mock user is determined by the 'mockRole' property, also on the appConfig object:

https://github.com/TAMULib/SAGE/blob/master/src/main/webapp/app/config/appConfig.js