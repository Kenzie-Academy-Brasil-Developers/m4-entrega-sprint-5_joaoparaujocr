import { Entity, PrimaryColumn, Column } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("addresses")
export default class Address {
  @PrimaryColumn("uuid")
  readonly id: string

  @Column()
  district: string

  @Column()
  zipCode: string

  @Column({ nullable: true })
  number: string

  @Column()
  city: string

  @Column()
  state: string

  constructor() {
    if(!this.id) this.id = uuid()
  }

}