package com.kyoulho.mid.account.svc

import com.kyoulho.mid.account.dto.CreateAccountDTO
import com.kyoulho.mid.account.dto.GetAccountDTO
import com.kyoulho.mid.account.dto.UpdateAccountDTO
import com.kyoulho.mid.account.entity.Account
import com.kyoulho.mid.account.repo.AccountRepository
import com.kyoulho.mid.account.repo.AccountTypeRepository
import com.kyoulho.mid.user.User
import com.kyoulho.mid.user.repo.UserRepository
import jakarta.persistence.EntityNotFoundException
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.math.BigDecimal
import java.util.*

@Service
class AccountService(
        private val accountRepository: AccountRepository,
        private val accountTypeRepository: AccountTypeRepository,
        private val userRepository: UserRepository,
) {

    // 계좌 생성
    @Transactional
    fun createAccount(userId: UUID, createAccountDTO: CreateAccountDTO): GetAccountDTO {
        createAccountDTO

        val accountType = accountTypeRepository.findById(accountTypeId)
                .orElseThrow { EntityNotFoundException("AccountType not found") }
        val user = userRepository.findById(userId)
                .orElseThrow { EntityNotFoundException("User not found") }

        // Account 엔티티 생성 및 저장
        val account = Account(
                name = createAccountDTO.name,
                description = createAccountDTO.description,
                issuer = createAccountDTO.issuer,
                number = createAccountDTO.number,
                interestRate = BigDecimal(createAccountDTO.interestRate),
                withdrawalLimit = BigDecimal(createAccountDTO.withdrawalLimit),
                accountType,
                user
        )

        val savedAccount = accountRepository.save(account)
        return toGetAccountDTO(savedAccount)
    }

    fun getAccounts(userId: UUID): List<GetAccountDTO> {
        val accounts = accountRepository.findByUserId(userId)
        return accounts.map { toGetAccountDTO(it) }
    }

    fun getAccountById(userId: UUID, accountId: UUID): GetAccountDTO {
        val account = accountRepository.findByIdAndUserId(accountId, userId)
                .orElseThrow { EntityNotFoundException("Account not found") }
        return toGetAccountDTO(account)
    }

    @Transactional
    fun updateAccount(userId: UUID, accountId: UUID, updateAccountDTO: UpdateAccountDTO): GetAccountDTO {
        val account = accountRepository.findByIdAndUserId(accountId, userId)
                .orElseThrow { EntityNotFoundException("Account not found") }

        val updateData = updateAccountDTO.copy()

        // accountTypeId가 존재할 경우 accountType을 조회하여 추가
        if (updateAccountDTO.accountTypeId != null && account.accountType.id != updateAccountDTO.accountTypeId) {
            val newAccountType = accountTypeRepository.findById(updateAccountDTO.accountTypeId)
                    .orElseThrow { EntityNotFoundException("AccountType not found") }
            account.accountType = newAccountType
        }

        // 업데이트할 데이터 병합
        account.apply {
            name = updateData.name
            description = updateData.description
            issuer = updateData.issuer
            number = updateData.number
            interestRate = updateData.interestRate
            withdrawalLimit = updateData.withdrawalLimit
        }

        val updatedAccount = accountRepository.save(account)
        return toGetAccountDTO(updatedAccount)
    }

    @Transactional
    fun deleteAccount(userId: UUID, accountId: UUID) {
        val account = accountRepository.findByIdAndUserId(accountId, userId)
                .orElseThrow { EntityNotFoundException("Account not found") }
        accountRepository.delete(account)
    }

    // DTO 변환 메서드
    private fun toGetAccountDTO(account: Account): GetAccountDTO {
        return GetAccountDTO(
                id = account.id,
                name = account.name,
                description = account.description,
                issuer = account.issuer,
                number = account.number,
                interestRate = account.interestRate,
                withdrawalLimit = account.withdrawalLimit,
                accountTypeName = account.accountType.name,
                createdAt = account.createdAt
        )
    }
}
