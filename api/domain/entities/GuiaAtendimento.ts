import {
    ColumnType,
    Generated,
    Insertable,
    JSONColumnType,
    Selectable,
    Updateable,
  } from 'kysely'

  export interface GuiaAtendimentoTable {
    id: Generated<number>
    autorizacaoId: number
    identificadorGuia: string
    tokenQrCode: string
    dataEmissao: ColumnType<Date, string | undefined, never>
    dataValidade: ColumnType<Date, string | undefined, never>
    statusGuia: string
    autorizadorResponsavel: string
  }