package edu.tamu.cap;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.test.context.junit4.SpringRunner;

import edu.tamu.sage.SageApplication;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = { SageApplication.class }, webEnvironment = WebEnvironment.DEFINED_PORT)
public class CapApplicationTests {

	@Test
	public void contextLoads() {
	}

}
