package edu.tamu.sage.config;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import edu.tamu.sage.auth.service.AppUserDetailsService;
import edu.tamu.sage.model.Role;
import edu.tamu.sage.model.User;
import edu.tamu.sage.model.repo.UserRepo;
import edu.tamu.weaver.auth.config.AuthWebSecurityConfig;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class AppWebSecurityConfig extends AuthWebSecurityConfig<User, UserRepo, AppUserDetailsService> {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // @formatter:off
        http
            .sessionManagement()
                .sessionCreationPolicy(STATELESS)
            .and()
                .authorizeRequests()
                    .expressionHandler(webExpressionHandler())
                    .antMatchers("/**/*")
                        .permitAll()
            .and()
                .headers()
                    .frameOptions()
                    .disable()
            .and()
                .csrf()
                    .disable()
            .addFilter(tokenAuthorizationFilter());
        // @formatter:on
    }

    @Override
    protected String buildRoleHierarchy() {
        StringBuilder roleHeirarchy = new StringBuilder();
        Role[] roles = Role.values();
        for (int i = 0; i <= roles.length - 2; i++) {
            roleHeirarchy.append(roles[i] + " > " + roles[i + 1]);
            if (i < roles.length - 2) {
                roleHeirarchy.append(" ");
            }
        }
        return roleHeirarchy.toString();
    }

}
