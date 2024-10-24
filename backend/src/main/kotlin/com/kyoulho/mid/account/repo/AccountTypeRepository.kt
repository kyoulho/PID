package com.kyoulho.mid.account.repo

import com.kyoulho.mid.account.entity.AccountType
import org.springframework.data.jpa.repository.JpaRepository

interface AccountTypeRepository : JpaRepository<AccountType, String> {
}