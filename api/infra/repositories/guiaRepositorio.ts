import { Autorizacao } from "../../domain/entities/Autorizacao";
import { Guia, NewGuia, UpdateGuia } from "../../domain/entities/GuiaAtendimento";
import { db, dbInterface } from "../database";
import { Kysely } from 'kysely'

export class GuiaRepository {
  
  private _db : Kysely<dbInterface> ;

  constructor(){
    this._db = db;
  }

  async getGuiaById(id: number) {
    return await db.selectFrom('GuiaAtendimento')
      .where('id', '=', id)
      .selectAll()
      .executeTakeFirst()
  }

  async getGuia(criteria: Partial<Guia>) {
    let query = this._db.selectFrom('GuiaAtendimento')
  
    if (criteria.id) {
      query = query.where('id', '=', criteria.id)
    }

    if (criteria.autorizacaoId) {
        query = query.where('id', '=', criteria.autorizacaoId)
      }
  
    return await query.selectAll().execute()
  }

  async getGuiaByAutorizacao(criteria: Partial<Autorizacao>) {
    let query = this._db.selectFrom('GuiaAtendimento')
                        .innerJoin('Autorizacao', 'GuiaAtendimento.autorizacaoId', 'Autorizacao.id')
  
    if (criteria.id) {
      query = query.where('id', '=', criteria.id)
    }

    if (criteria.usuarioId) {
        query = query.where('usuarioId', '=', criteria.usuarioId)
      }
  
    return await query.selectAll().execute()
  }

  async updateGuia(id: number, updateWith: UpdateGuia) {
    await db.updateTable('GuiaAtendimento')
            .set(updateWith)
            .where('id', '=', id)
            .execute()
  }
  
 async createGuia(guia: NewGuia) {
    return await db.insertInto('GuiaAtendimento')
        .values(guia)
        .returningAll()
        .executeTakeFirstOrThrow()
    }


}