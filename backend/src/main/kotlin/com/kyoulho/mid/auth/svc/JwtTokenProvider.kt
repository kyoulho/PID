package com.kyoulho.mid.auth.svc

import com.kyoulho.mid.auth.dto.UserPrincipal
import io.jsonwebtoken.*
import io.jsonwebtoken.security.Keys
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.core.Authentication
import org.springframework.stereotype.Component
import java.security.Key
import java.util.*
import java.util.stream.Collectors

@Component
class JwtTokenProvider(
    @Value("\${jwt.secret}") private val jwtSecret: String,
    @Value("\${jwt.expirationMs}") private val jwtExpirationMs: Long
) {

    private val key: Key = Keys.hmacShaKeyFor(jwtSecret.toByteArray())

    fun generateToken(authentication: Authentication): String {
        val userPrincipal = authentication.principal as UserPrincipal

        val roles = userPrincipal.authorities.stream()
            .map { it.authority }
            .collect(Collectors.joining(","))

        return Jwts.builder()
            .setSubject(userPrincipal.id)
            .claim("roles", roles)
            .setIssuedAt(Date())
            .setExpiration(Date(System.currentTimeMillis() + jwtExpirationMs))
            .signWith(key, SignatureAlgorithm.HS512)
            .compact()
    }

    fun getUserIdFromJWT(token: String): String {
        return Jwts.parserBuilder()
            .setSigningKey(key)
            .build()
            .parseClaimsJws(token)
            .body
            .subject
    }

    fun getRolesFromJWT(token: String): List<String> {
        val claims = Jwts.parserBuilder()
            .setSigningKey(key)
            .build()
            .parseClaimsJws(token)
            .body

        val roles = claims["roles"] as String
        return roles.split(",")
    }

    fun validateToken(authToken: String): Boolean {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(authToken)
            return true
        } catch (ex: SecurityException) {
            println("Invalid JWT signature")
        } catch (ex: MalformedJwtException) {
            println("Invalid JWT token")
        } catch (ex: ExpiredJwtException) {
            println("Expired JWT token")
        } catch (ex: UnsupportedJwtException) {
            println("Unsupported JWT token")
        } catch (ex: IllegalArgumentException) {
            println("JWT claims string is empty.")
        }
        return false
    }
}
