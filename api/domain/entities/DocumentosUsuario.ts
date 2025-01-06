import {
    ColumnType,
    Generated,
    Insertable,
    JSONColumnType,
    Selectable,
    Updateable,
  } from 'kysely'

  export interface DocumentosTable {
    id: Generated<number>
    tipo: string
    dataCriacao: ColumnType<Date, string | undefined, never>
    data: Buffer
  }

  export type DocumentoUsuario = Selectable<DocumentosTable>
  export type NewDocumentoUsuario= Insertable<DocumentosTable>
  export type DocumentoUsuarioUpdate = Updateable<DocumentosTable>