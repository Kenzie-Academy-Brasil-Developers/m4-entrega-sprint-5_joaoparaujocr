import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import Property from "./properties.entities";
import SchedulesUserProperties from "./schedules_user_properties.entities";
import { v4 as uuid } from "uuid";

@Entity("users")
export class Users {
  @PrimaryColumn("uuid")
  id: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column()
  isAdm: boolean

  @Column()
  isActive: boolean

  @Column()
  createdAt: Date

  @Column()
  updatedAt: Date

  @Column()
  name: string

  @OneToMany(() => SchedulesUserProperties, sch => sch.user)
  properties: Property[]

  constructor() {
    if(!this.id) this.id = uuid()
  }
}