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
    usuarioId: number
    tipo: number
    dataCriacao: ColumnType<Date, string | undefined, never>
    data: Text
  }

  export type DocumentosUsuario = Selectable<DocumentosTable>
  export type NewDocumentosUsuario= Insertable<DocumentosTable>
  export type DocumentosUsuarioUpdate = Updateable<DocumentosTable>