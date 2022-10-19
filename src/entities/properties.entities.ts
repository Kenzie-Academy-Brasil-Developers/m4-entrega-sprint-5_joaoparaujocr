import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import Address from "./addresses.entities";
import Category from "./categories.entities";
import SchedulesUserProperties from "./schedules_user_properties.entities";
import { Users } from "./users.entities";

@Entity("properties")
export default class Property {
  @PrimaryColumn("uuid")
  readonly id: string

  @Column({ default: false })
  sold: boolean

  @Column()
  value: number

  @Column()
  size: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToOne(() => Address, { eager: true }) @JoinColumn()
  address: Address
  
  @ManyToOne(() => Category)
  category: Category
  
  @OneToMany(() => SchedulesUserProperties, sch => sch.property)
  schedules: SchedulesUserProperties[]
  
  constructor() {
    if(!this.id) this.id = uuid()
  }
}