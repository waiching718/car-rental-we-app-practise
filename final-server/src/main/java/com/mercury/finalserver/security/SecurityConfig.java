package com.mercury.finalserver.security;

import com.mercury.finalserver.security.handler.*;
import com.mercury.finalserver.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    UserService userDetailService;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    public void setup(AuthenticationManagerBuilder builder) throws Exception{
        builder.userDetailsService(userDetailService).passwordEncoder(passwordEncoder);
    }

    @Autowired
    AuthenticationSuccessHandlerImpl authenticationSuccessHandler;
    @Autowired
    AuthenticationFailureHandlerImpl authenticationFailureHandler;
    @Autowired
    AuthenticationEntryPointImpl authenticationEntryPoint;
    @Autowired
    AccessDeniedHandlerImpl accessDeniedHandler;
    @Autowired
    LogoutSuccessHandlerImpl logoutSuccessHandler;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // turn off CSRF protection
        http.csrf().disable();
        //http.csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
        // ask Spring Security to implement POST/Login for us
        // only accept form format data
        // username=admin&password=adminpass
        // can't parse json data
        http.formLogin()
                .loginProcessingUrl("/login")
                .usernameParameter("username")
                .passwordParameter("password")
                .successHandler(authenticationSuccessHandler)
                .failureHandler(authenticationFailureHandler);

        // authorization
        // GET /products -> anyone
        // GET /samples -> logged in user
        // GET /orders -> admin

        // 1. declaration approach
//        http.authorizeRequests()
//                .antMatchers(HttpMethod.GET, "/products").permitAll()
//                .antMatchers(HttpMethod.GET,"/samples").authenticated()
//                .antMatchers(HttpMethod.GET,"/orders").hasAnyAuthority("ROLE_ADMIN");

        // 2. annotation driven


        // exception handling
        // 1. handle when someone who didn't log in, but try to access authenticated/protected resources
        http.exceptionHandling().authenticationEntryPoint(authenticationEntryPoint);

        // 2. handle when someone doesn't have enough permission to access resources
        //        eg. user wants to access admin only resource
        http.exceptionHandling().accessDeniedHandler(accessDeniedHandler);

        //logout
        http.logout()
                .logoutUrl("/logout")
                .logoutSuccessHandler(logoutSuccessHandler);

        // remember me
        // JSESSIONID cookie expires in 1m
        // if user doesn't enable 'remember me'  -> nothing will happen.
        //       user will has to login after 1m
        //if user requests to remember me
        //      Spring security will send back another cookie with specified timeout(eg. 2 weeks)
        //      The new cookie is called remember-me cookie.
        //      Thus, later even JSESSIONID cookie will expire.
        //      Spring security can still use the long-lived remember-me cookie
        //      to generate JSESSIONID cookie.
        http.rememberMe()
                .rememberMeParameter("remember-me")
                .tokenValiditySeconds(14 * 24 * 60 * 60);

        // enable CORS (Cross-Origin Resources share)
        http.cors();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("*");
//        configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200","http://localhost:4300","http://localhost:3000"));
        //       configuration.addAllowedOrigin("http://localhost:4200"); // You should only set trusted site here. e.g. http://localhost:8081 means only this site can access.
        configuration.setAllowedMethods(Arrays.asList("GET","POST","PUT","DELETE","HEAD","OPTIONS"));
        configuration.addAllowedHeader("*");
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
