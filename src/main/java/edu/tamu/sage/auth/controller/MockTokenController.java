package edu.tamu.sage.auth.controller;

import org.springframework.context.annotation.Profile;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.tamu.weaver.token.provider.controller.WeaverMockTokenController;

@RestController
@RequestMapping("/mock/auth")
@Profile("mock-token-provider")
public class MockTokenController extends WeaverMockTokenController {

}