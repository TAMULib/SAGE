package edu.tamu.sage.ui.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.error.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

// TODO: this most likely can move into the framework
@Controller
public class Html5ModeErrorController implements ErrorController {

    private static final String PATH = "/error";

    @Autowired
    private ViewController viewController;

    public String getErrorPath() {
        return PATH;
    }

    @RequestMapping(value = PATH)
    public ModelAndView error(HttpServletRequest request, HttpServletResponse response) {
        if (request.getHeader("X-Requested-With") == null) {
            response.setStatus(HttpServletResponse.SC_OK);
        }
        return viewController.index(request);
    }

}
