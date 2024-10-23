package com.kyoulho.mid.portfolio

import com.kyoulho.mid.account.entity.Account
import jakarta.persistence.*
import java.util.*

@Entity
data class AssetDividendRecord(
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    val id: UUID? = null,

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "portfolio_asset_id", nullable = false)
    val portfolioAsset: PortfolioAsset,

    @Column(nullable = false)
    val amount: Long,

    @Column(nullable = false)
    val dividendDate: Date,

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "account_id", nullable = false)
    val account: Account
)
