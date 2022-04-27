package edu.tamu.sage.config;

import java.util.List;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.mail.javamail.ConfigurableMimeFileTypeMap;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.ResourceUrlEncodingFilter;

import edu.tamu.sage.model.User;
import edu.tamu.sage.model.repo.UserRepo;
import edu.tamu.weaver.auth.resolver.WeaverCredentialsArgumentResolver;
import edu.tamu.weaver.auth.resolver.WeaverUserArgumentResolver;
import edu.tamu.weaver.validation.resolver.WeaverValidatedModelMethodProcessor;

@EnableWebMvc
@Configuration
@EntityScan(basePackages = { "edu.tamu.sage.model" })
@EnableJpaRepositories(basePackages = { "edu.tamu.sage.model.repo" })
@EnableScheduling
public class AppWebMvcConfig implements WebMvcConfigurer {

    @Value("${app.ui.path}")
    private String path;

    @Value("#{new Boolean('${info.build.production:false}')}")
    private boolean production;

    @Autowired
    private List<HttpMessageConverter<?>> converters;

    @Autowired
    private UserRepo userRepo;

    @Bean
    public ResourceUrlEncodingFilter resourceUrlEncodingFilter() {
        return new ResourceUrlEncodingFilter();
    }

    @Bean
    public ConfigurableMimeFileTypeMap configurableMimeFileTypeMap() {
        return new ConfigurableMimeFileTypeMap();
    }

    /**
     * Executor Service configuration.
     *
     * @return ExecutorSevice
     *
     */
    @Bean(name = "executorService")
    private static ExecutorService configureExecutorService() {
        ExecutorService executorService = new ThreadPoolExecutor(10, 25, 0L, TimeUnit.MILLISECONDS, new ArrayBlockingQueue<Runnable>(25));
        return executorService;
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        if (!production) {
            registry.addResourceHandler("/node_modules/**").addResourceLocations("file:node_modules/");
        }
        registry.addResourceHandler("/**").addResourceLocations(path + "/");
        registry.addResourceHandler("/public/**").addResourceLocations("file:public/");
        registry.setOrder(Integer.MAX_VALUE - 2);
    }

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {
        argumentResolvers.add(new WeaverValidatedModelMethodProcessor(converters));
        argumentResolvers.add(new WeaverCredentialsArgumentResolver());
        argumentResolvers.add(new WeaverUserArgumentResolver<User, UserRepo>(userRepo));
    }

}
