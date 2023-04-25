package hu.kh.perfconfig;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {"hu.kh.perfconfig.entities","hu.kh.perfconfig"})
public class PerformanceTestConfigApplication {

	public static void main(String[] args) {
		SpringApplication.run(PerformanceTestConfigApplication.class, args);
	}

}
