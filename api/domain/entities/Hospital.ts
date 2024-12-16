import {
    ColumnType,
    Generated,
    Insertable,
    JSONColumnType,
    Selectable,
    Updateable,
  } from 'kysely'

  export interface HospitalTable {
    id: Generated<number>
    nome: string
    cnpj: string
    endereco: string
    ativo: boolean
  }

  
    export type Hospital = Selectable<HospitalTable>
    export type NewHospital = Insertable<HospitalTable>
    export type HospitalUpdate = Updateable<HospitalTable>