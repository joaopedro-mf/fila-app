import {
    ColumnType,
    Generated,
    Insertable,
    JSONColumnType,
    Selectable,
    Updateable,
  } from 'kysely'

  export interface EspecialidadesPorHospitalTable {
    id: Generated<number>
    hospitalId: number
    especialidadeId: number
    disponibilidade: ColumnType<JSON, string | undefined, never>
  }