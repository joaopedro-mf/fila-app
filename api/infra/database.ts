import * as dotenv from 'dotenv'
import { Pool } from 'pg'
import { Kysely, PostgresDialect } from 'kysely'

import {AutorizacaoTable} from "../domain/entities/Autorizacao";
import {DocumentosUsuarioTable} from "../domain/entities/DocumentosUsuario";
import {EspecialidadesTable} from "../domain/entities/Especialidades";
import {EspecialidadesPorHospitalTable} from "../domain/entities/EspecialidadesPorHospital";
import {GuiaAtendimentoTable} from "../domain/entities/GuiaAtendimento";
import {HospitalTable} from "../domain/entities/Hospital";
import {OperadoraPlanoSaudeTable} from "../domain/entities/OperadoraPlanoSaude";
import {OperadorasPorHospitalTable} from "../domain/entities/OperadorasPorHospital";
import {UsuarioTable} from "../domain/entities/Usuario";

dotenv.config();

export interface dbInterface {
  OperadoraPlanoSaude: OperadoraPlanoSaudeTable
  Usuario: UsuarioTable
  DocumentosUsuario: DocumentosUsuarioTable
  Hospital: HospitalTable
  Especialidades: EspecialidadesTable
  EspecialidadesPorHospital: EspecialidadesPorHospitalTable
  OperadorasPorHospital: OperadorasPorHospitalTable
  Autorizacao: AutorizacaoTable
  GuiaAtendimento: GuiaAtendimentoTable
}

var activeSsl = parseInt(process.env.DB_LOCAL) == 1 ?  false : true

const dialect = new PostgresDialect({
  pool: new Pool({
    database: 'fila',
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    user:  process.env.DB_USER,
    port: parseInt(process.env.DB_PORT || '5432'),
    max: 10,
    ssl: activeSsl
  })
})

export const db = new Kysely<dbInterface>({
  dialect,
})