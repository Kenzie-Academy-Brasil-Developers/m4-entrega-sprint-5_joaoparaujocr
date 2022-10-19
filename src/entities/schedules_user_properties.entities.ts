import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";
import Property from "./properties.entities";
import { Users } from "./users.entities";
import { v4 as uuid } from "uuid";

@Entity("schedules_user_properties")
export default class SchedulesUserProperties {
  @PrimaryColumn("uuid")
  readonly id: string

  @Column("date")
  date: string

  @Column("time")
  hour: string

  @ManyToOne(() => Users, { eager: true })
  user: Users

  @ManyToOne(() => Property)
  property: Property

  constructor() {
    if(!this.id) this.id = uuid()
  }
}