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
    tokenQrCode: string
    dataEmissao: ColumnType<Date, string | undefined, never>
    dataValidade: ColumnType<Date, string | undefined, never>
    statusGuia: string
    assinatura:string
    biometriaDocumentoId:number
    assinaturaDocumentoId:number
  }

  export type Guia = Selectable<GuiaAtendimentoTable>
  export type NewGuia = Insertable<GuiaAtendimentoTable>
  export type UpdateGuia = Updateable<GuiaAtendimentoTable>