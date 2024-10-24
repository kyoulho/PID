package com.kyoulho.mid.strategy

import jakarta.persistence.*
import java.util.*

@Entity
data class Strategy(
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    val id: String? = null,

    @Column(length = 200, nullable = false)
    val name: String,

    @Column(length = 1000)
    val description: String,

    @Column(length = 200, nullable = false)
    val rebalanceFrequency: RebalanceFrequency,

    @Column(length = 200, nullable = false)
    @Enumerated(EnumType.STRING)
    val type: StrategyType,
)
