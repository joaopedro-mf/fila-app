import {
    ColumnType,
    Generated,
    Insertable,
    JSONColumnType,
    Selectable,
    Updateable,
  } from 'kysely'



export interface OperadorasPorHospitalTable {
    id: Generated<number>
    hospitalId: number
    operadoraId: number
    disponibilidade: number
  }