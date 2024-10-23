package com.kyoulho.mid.account.repo

import com.kyoulho.mid.account.entity.Account
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface AccountRepository : JpaRepository<Account, UUID> {

}