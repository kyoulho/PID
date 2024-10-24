package com.kyoulho.mid.account.entity

import com.kyoulho.mid.user.entity.MidUser
import jakarta.persistence.*
import org.hibernate.annotations.CreationTimestamp
import java.time.LocalDateTime

@Entity
data class Account(
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    val id: String? = null,

    @Column(length = 200, nullable = false)
    var name: String,

    @Column(length = 200, nullable = false)
    var description: String?,

    @Column(length = 200, nullable = false)
    var issuer: String,

    @Column(length = 200, nullable = false)
    var number: String,

    @Column(nullable = false)
    var interestRate: String,

    @Column(nullable = false)
    var withdrawalLimit: String,

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    val createdAt: LocalDateTime = LocalDateTime.now(),

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "account_type_id")
    var accountType: AccountType,

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "user_id")
    val user: MidUser
)
