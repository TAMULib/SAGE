package edu.tamu.sage.ui.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

// TODO: this most likely can move into the framework
@Controller
public class ViewController {

    @Value("${app.googleTag}")
    private String googleAnalytics;

    @RequestMapping("/")
    public ModelAndView view(HttpServletRequest request) {
        return index(request);
    }

    public ModelAndView index(HttpServletRequest request) {
        ModelAndView index = new ModelAndView("index");
        index.addObject("base", request.getServletContext().getContextPath());
        index.addObject("googleAnalytics", googleAnalytics);
        return index;
    }

}
