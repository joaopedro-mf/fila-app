import {
    ColumnType,
    Generated,
    Insertable,
    JSONColumnType,
    Selectable,
    Updateable,
  } from 'kysely'


export interface UserTable {

    id: Generated<number>
  
    first_name: string

    last_name: string 

    email: string 
  }

  export type User = Selectable<UserTable>
  export type NewUser = Insertable<UserTable>
  export type UserUpdate = Updateable<UserTable>