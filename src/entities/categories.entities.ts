import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import Property from "./properties.entities";

@Entity("categories")
export default class Category {
  @PrimaryColumn("uuid")
  id: string

  @Column({ type: "varchar", unique:  true})
  name: string

  @OneToMany(() => Property, property => property.category)
  properties: Property[]

  constructor(){
    if(!this.id) this.id = uuid()
  }
}