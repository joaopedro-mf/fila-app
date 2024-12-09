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