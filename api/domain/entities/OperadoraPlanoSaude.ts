import {
    ColumnType,
    Generated,
    Insertable,
    JSONColumnType,
    Selectable,
    Updateable,
  } from 'kysely'

  export interface OperadoraPlanoSaudeTable {
    id: Generated<number>
    nomeSocial: string
    cnpj: string
    registroANS: string
    ativado: boolean
  }

    export type OperadoraPlanoSaude = Selectable<OperadoraPlanoSaudeTable>
    export type NewOperadoraPlanoSaude = Insertable<OperadoraPlanoSaudeTable>
    export type OperadoraPlanoSaudeUpdate = Updateable<OperadoraPlanoSaudeTable>