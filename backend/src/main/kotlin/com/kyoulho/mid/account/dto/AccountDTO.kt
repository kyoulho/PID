package com.kyoulho.mid.account.dto

import com.kyoulho.mid.account.entity.Account
import java.time.LocalDateTime


data class CreateAccountDTO(
    val accountTypeId: String,
    val name: String,
    val description: String?,
    val issuer: String,
    val number: String,
    val interestRate: String,
    val withdrawalLimit: String
)

typealias UpdateAccountDTO = CreateAccountDTO


data class GetAccountDTO(
    val id: String,
    val type: String,
    val name: String,
    val description: String?,
    val issuer: String,
    val number: String,
    val interestRate: String,
    val withdrawalLimit: String,
    val createdAt: LocalDateTime,
)

fun Account.toGetAccountDTO(): GetAccountDTO {
    return GetAccountDTO(
        id = this.id!!,
        type = this.accountType.name,
        name = this.name,
        description = this.description,
        issuer = this.issuer,
        number = this.number,
        interestRate = this.interestRate,
        withdrawalLimit = this.withdrawalLimit,
        createdAt = this.createdAt
    )
}