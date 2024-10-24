package com.kyoulho.mid.user.svc

import com.kyoulho.mid.auth.dto.UserPrincipal
import com.kyoulho.mid.user.repo.UserRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service

@Service
class CustomUserDetailsService(
    private val userRepository: UserRepository
) : UserDetailsService {

    override fun loadUserByUsername(id: String): UserDetails {
        val user = userRepository.findByIdOrNull(id)
            ?: throw UsernameNotFoundException("MidUser not found with username: $id")

        return UserPrincipal.create(user)
    }
}
