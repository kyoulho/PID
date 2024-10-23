package com.kyoulho.mid.account.dto

import java.time.LocalDateTime
import java.util.*


data class CreateAccountDTO(
        val accountTypeId: UUID,
        val name: String,
        val description: String?,
        val issuer: String,
        val number: String,
        val interestRate: String,
        val withdrawalLimit: String
)

data class UpdateAccountDTO(
        val accountTypeId: UUID? = null,
        val name: String? = null,
        val description: String? = null,
        val issuer: String? = null,
        val number: String? = null,
        val interestRate: String? = null,
        val withdrawalLimit: String? = null
)


data class GetAccountDTO(
        val id: UUID,
        val accountTypeName: String,
        val createdAt: LocalDateTime,
        val name: String,
        val description: String?,
        val issuer: String,
        val number: String,
        val interestRate: String,
        val withdrawalLimit: String
)
