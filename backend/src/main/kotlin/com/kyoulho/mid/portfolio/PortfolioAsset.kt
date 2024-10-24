package com.kyoulho.mid.portfolio

import jakarta.persistence.*

@Entity
data class PortfolioAsset(
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    val id: String? = null,

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "portfolio_id", nullable = false)
    val portfolio: Portfolio,

    @Column(nullable = false)
    val intendedAsset: String,

    @Column(nullable = false)
    val targetRatio: Double,

    @OneToMany(mappedBy = "portfolioAsset", cascade = [CascadeType.ALL], orphanRemoval = true, fetch = FetchType.LAZY)
    val records: List<AssetTradingRecord> = mutableListOf(),

    @OneToMany(mappedBy = "portfolioAsset", cascade = [CascadeType.ALL], orphanRemoval = true, fetch = FetchType.LAZY)
    val dividends: List<AssetDividendRecord> = mutableListOf()
)
