package com.kyoulho.mid.account.repo

import com.kyoulho.mid.account.entity.Account
import org.springframework.data.jpa.repository.JpaRepository
import java.util.*

interface AccountRepository : JpaRepository<Account, String> {
    fun findByUserId(user_id: String): List<Account>
    fun findByIdAndUserId(accountId: String, userId: String): Optional<Account>
}