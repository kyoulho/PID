package com.kyoulho.mid.account.entity

import jakarta.persistence.*
import org.hibernate.annotations.CreationTimestamp
import java.time.LocalDateTime
import java.util.*

@Entity
data class AccountType(
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    val id: UUID? = null,

    @Column(length = 200, nullable = false)
    val name: String,

    @Column(length = 200)
    val description: String? = null,

    // 세금 해택
    @Column(nullable = false)
    val taxAdvantage: Boolean,

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    val createdAt: LocalDateTime = LocalDateTime.now()
)
