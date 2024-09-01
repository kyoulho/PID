import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Strategy {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'varchar', length: 1000 })
  description: string;

  @Column({ type: 'varchar', length: 200 })
  rebalanceFrequency: string;

  @Column({ type: 'text', nullable: true })
  algorithm: string;
}
