package com.bigbasti.poker.api.configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
    private Logger logger = LoggerFactory.getLogger(SecurityConfiguration.class);

    @Autowired
    AuthenticationProvider authProvider;
    @Autowired
    Environment env;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .headers().cacheControl().disable()
                .and()               // when under HTTPS IE wont use downloaded fonts if caching is enabled
                .authorizeRequests()
                .antMatchers("/api/user/me", "/api/user/roles", "/api/user", "/api/authenticate").permitAll()
                .anyRequest().authenticated()
                .and()
                .formLogin()
                .loginProcessingUrl("/api/user/login")
                .permitAll()
                .successHandler((httpServletRequest, httpServletResponse, authentication) -> {
                    logger.debug("successful login for {} from {}", authentication.getName(), httpServletRequest.getRemoteAddr());
                    HttpSession session = httpServletRequest.getSession(false);
                    if (session != null) {
                        session.removeAttribute("SPRING_SECURITY_LAST_EXCEPTION");
                    }
                    //write the logged in user into the response of the current request
                    httpServletResponse.setStatus(200);
                    httpServletResponse.getWriter().write(new ObjectMapper().writeValueAsString(authentication.getPrincipal()));
                })
                .failureHandler((httpServletRequest, httpServletResponse, e) -> {
                    Map<String, String> messages = new HashMap<>();
                    logger.debug("failed login attempt '{}' from address {}", e.getMessage(), httpServletRequest.getRemoteAddr());
                    messages.put("error", e.getMessage());
                    httpServletResponse.setStatus(401);
                    httpServletResponse.getWriter().write(new ObjectMapper().writeValueAsString(messages));
                })
                .and()
                .logout()
                .logoutUrl("/api/user/logout")  //note: in dev mode this request must be a POST
                .permitAll()
                .logoutSuccessHandler((httpServletRequest, httpServletResponse, authentication) -> {
                    logger.debug("logging out user {}", authentication.getName());
                    httpServletResponse.setStatus(HttpServletResponse.SC_OK);
                })
                .and()
                .csrf().disable()
                .cors()
                .and()
                .exceptionHandling().authenticationEntryPoint((httpServletRequest, httpServletResponse, ex) -> {
            if(ex != null){
                logger.warn("Unauthorized access to {} from {}", httpServletRequest.getRequestURL(), httpServletRequest.getRemoteAddr());
                httpServletResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            }
        }).and()
                .sessionManagement()
                .maximumSessions(6)
                .sessionRegistry(sessionRegistry());
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authProvider);
    }

    @Bean
    public SessionRegistry sessionRegistry() {
        return new SessionRegistryImpl();
    }

    /**
     * To be able to run front end in its own server CORS must be enabled
     *
     * @return
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        final CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of(env.getProperty("poker.security.cors.origins", "https://poker.bigbasti.com").split(",")));
        configuration.setAllowedMethods(List.of("HEAD", "GET", "PUT", "POST", "DELETE", "PATCH"));
        // setAllowCredentials(true) is important, otherwise:
        // The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.
        configuration.setAllowCredentials(true);
        // setAllowedHeaders is important! Without it, OPTIONS preflight request
        // will fail with 403 Invalid CORS request
        configuration.addAllowedHeader("*");
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}

