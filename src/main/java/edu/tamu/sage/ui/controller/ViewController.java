package edu.tamu.sage.ui.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import edu.tamu.sage.service.SimpleProcessorService;

// TODO: this most likely can move into the framework
@Controller
public class ViewController {

    // private final SimpleProcessorService simpleprocessorService;
    private static SimpleProcessorService simpleProcessorService;


    public ViewController(SimpleProcessorService simpleProcessorService) {
        ViewController.simpleProcessorService = simpleProcessorService;
    }

    @RequestMapping("/")
    public ModelAndView view(HttpServletRequest request) {
        return index(request);
    }

    public static ModelAndView index(HttpServletRequest request) {
        ModelAndView index = new ModelAndView("index");
        index.addObject("base", request.getServletContext().getContextPath());
        index.addObject("googleAnalytics", simpleProcessorService.getGoogleAnalytics());
        return index;
    }

}
