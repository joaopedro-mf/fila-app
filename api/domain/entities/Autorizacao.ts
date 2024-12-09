import {
    ColumnType,
    Generated,
    Insertable,
    JSONColumnType,
    Selectable,
    Updateable,
  } from 'kysely'


export interface AutorizacaoTable {
    id: Generated<number>
    usuarioId: number
    hospitalId: number
    operadoraId: number
    dataSolicitacao: ColumnType<Date, string | undefined, never>
    statusAutorizacao: string
    valorAutorizado: number
    documentosAnexos: ColumnType<JSON, string | undefined, never>
    biometria: Buffer
    descricaoPedido: string
  }

  export type Autorizacao = Selectable<AutorizacaoTable>
  export type NewAutorizacao= Insertable<AutorizacaoTable>
  export type AutorizacaoUpdate = Updateable<AutorizacaoTable>