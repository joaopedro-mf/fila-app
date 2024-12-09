import {
    ColumnType,
    Generated,
    Insertable,
    JSONColumnType,
    Selectable,
    Updateable,
  } from 'kysely'

  export interface EspecialidadesTable {
    id: Generated<number>
    nome: string
    descricao: string
    necessitaEncaminhamento: boolean
  }