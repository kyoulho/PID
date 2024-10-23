package com.kyoulho.mid.account.entity

import com.kyoulho.mid.user.User
import jakarta.persistence.*
import org.hibernate.annotations.CreationTimestamp
import java.math.BigDecimal
import java.time.LocalDateTime
import java.util.*

@Entity
data class Account(
        @Id
        @GeneratedValue(strategy = GenerationType.UUID)
        val id: UUID? = null,

        @Column(length = 200, nullable = false)
        val name: String,

        @Column(length = 200, nullable = false)
        val description: String?,

        @Column(length = 200, nullable = false)
        val issuer: String,

        @Column(length = 200, nullable = false)
        val number: String,

        @Column(precision = 5, scale = 2, nullable = false)
        val interestRate: BigDecimal,

        @Column(precision = 15, scale = 2, nullable = false)
        val withdrawalLimit: BigDecimal,

        @CreationTimestamp
        @Column(name = "created_at", nullable = false, updatable = false)
        val createdAt: LocalDateTime = LocalDateTime.now(),

        @ManyToOne(fetch = FetchType.EAGER, optional = false)
        @JoinColumn(name = "account_type_id")
        val accountType: AccountType,

        @ManyToOne(fetch = FetchType.EAGER, optional = false)
        @JoinColumn(name = "user_id")
        val user: User
)
