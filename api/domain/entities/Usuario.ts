import {
    ColumnType,
    Generated,
    Insertable,
    JSONColumnType,
    Selectable,
    Updateable,
  } from 'kysely'

  export interface UsuarioTable {
    id: Generated<number>
    nome: string
    numeroCPF: string
    dataNascimento: ColumnType<Date, string | undefined, never>
    email: string
    numeroCartaoOperadora: string
    status: string
    ativo: boolean
    operadoraId: number
    cep: string
    endereco: string
    numeroEndereco: string
    complementoEndereco: string
    telefone: string
  }

  export type Usuario = Selectable<UsuarioTable>
  export type NewUsuario = Insertable<UsuarioTable>
  export type UsuarioUpdate = Updateable<UsuarioTable>