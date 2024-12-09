import {
    ColumnType,
    Generated,
    Insertable,
    JSONColumnType,
    Selectable,
    Updateable,
  } from 'kysely'

  export interface DocumentosUsuarioTable {
    id: Generated<number>
    usuarioId: number
    biometria: Buffer
    documentoIdentificacao: Buffer
    carteiraConvenio: Buffer
    dataCriacao: ColumnType<Date, string | undefined, never>
  }