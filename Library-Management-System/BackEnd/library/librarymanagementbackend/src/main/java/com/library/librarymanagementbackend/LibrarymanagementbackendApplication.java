package com.library.librarymanagementbackend;

import com.library.librarymanagementbackend.filter.JwtFilter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableFeignClients
public class LibrarymanagementbackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(LibrarymanagementbackendApplication.class, args);
	}

	@Bean
	public FilterRegistrationBean registerUrl()
	{
       FilterRegistrationBean filterRegistrationBean=new FilterRegistrationBean();
	   filterRegistrationBean.setFilter(new JwtFilter());
	   filterRegistrationBean.addUrlPatterns("/api/auth/*");
	   return filterRegistrationBean;
	}

}
