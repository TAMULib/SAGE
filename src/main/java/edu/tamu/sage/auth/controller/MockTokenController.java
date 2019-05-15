package edu.tamu.sage.auth.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.tamu.weaver.token.provider.controller.WeaverMockTokenController;

@RestController
@RequestMapping("/mock/auth")
public class MockTokenController extends WeaverMockTokenController {

}
