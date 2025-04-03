package com.taskfy.core.config;

import com.taskfy.core.infra.security.SecurityFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Value("${api.security.token.secret}")
    private String secret;
    @Autowired
    SecurityFilter securityFilter;
    private static final String[] DOCUMENTATION_OPENAPI = {
            "/docs-hotelBookingHub-api.html",
            "/docs-hotelBookingHub-api**",
            "/v3/api-docs/**",
            "/swagger-ui-custom.html",
            "/swagger-ui.html",
            "/swagger-ui/**",
            "/**.html",
            "/webjars/**",
            "/configuration/**",
            "/swagger-resources/**",
            "/queue/notifications"
    };

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults()) // Habilita CORS com as configurações padrão
                .csrf(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(
                        auth -> auth
                                .requestMatchers(HttpMethod.POST, "/auth/login").permitAll()
                                .requestMatchers(HttpMethod.POST, "/v1/users").permitAll()
                                .requestMatchers(HttpMethod.GET,"/v1/users").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.GET,"/v1/tasks").hasRole("ADMIN")
                                .requestMatchers(DOCUMENTATION_OPENAPI).permitAll()
                                .anyRequest().authenticated())
                .httpBasic(Customizer.withDefaults())
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    // Adicione este bean para configurar o CORS
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                    .allowedOrigins("http://localhost:3000", "http://localhost:3001") // Ou a porta do seu frontend
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
                    .allowedHeaders("*")
                    .allowCredentials(true)
                    .maxAge(3600);
            }
        };
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public  PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
