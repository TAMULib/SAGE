package edu.tamu.sage;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;

import javax.annotation.PostConstruct;

import org.springframework.boot.system.ApplicationHome;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.ComponentScan.Filter;
import org.springframework.context.annotation.FilterType;

@SpringBootApplication
@ComponentScan(basePackages = "edu.tamu.*", excludeFilters = { @Filter(type = FilterType.REGEX, pattern = "edu.tamu.weaver.wro.model.*"), @Filter(type = FilterType.REGEX, pattern = "edu.tamu.weaver.wro.service.*") })
public class SageApplication extends SpringBootServletInitializer {

    // the root of the app, i.e. where node_modules is
    private static String rootPath;

    /**
     * Entry point to the application from within servlet.
     *
     * @param args String[]
     *
     */
    public static void main(String[] args) {
        SpringApplication.run(SageApplication.class, args);
    }

    /**
     * Entry point to the application if run using spring-boot:run.
     *
     * @param application SpringApplicationBuilder
     *
     * @return SpringApplicationBuilder
     *
     */
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(SageApplication.class);
    }

    @PostConstruct
    public void init() throws IOException, URISyntaxException {
        ApplicationHome HOME = new ApplicationHome(this.getClass());
        rootPath = HOME.getDir().getAbsolutePath() + File.separator + ".." + File.separator + ".." + File.separator;
    }

    public static String getRootPath() {
        return rootPath;
    }

}
