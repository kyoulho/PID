package com.kyoulho.mid.user.repo

import com.kyoulho.mid.user.User
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface UserRepository : JpaRepository<User, UUID> {

}
