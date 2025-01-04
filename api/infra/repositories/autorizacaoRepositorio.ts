import { Autorizacao, NewAutorizacao } from "../../domain/entities/Autorizacao";
import { db, dbInterface } from "../database";
import { Kysely } from 'kysely'

export class AutorizacaoRepository {
  
  private _db : Kysely<dbInterface> ;

  constructor(){
    this._db = db;
  }

  async getAutorizacaoById(id: number) {
    return await db.selectFrom('Autorizacao')
      .where('id', '=', id)
      .selectAll()
      .executeTakeFirst()
  }

  async getAutorizacao(criteria: Partial<Autorizacao>) {
    let query = this._db.selectFrom('Autorizacao')
  
    if (criteria.id) {
      query = query.where('id', '=', criteria.id)
    }

    if (criteria.usuarioId) {
        query = query.where('usuarioId', '=', criteria.usuarioId)
      }
  
    return await query.selectAll().execute()
  }

 async createAutorizacao(autorizacao: NewAutorizacao) {
    return await db.insertInto('Autorizacao')
        .values(autorizacao)
        .returningAll()
        .executeTakeFirstOrThrow()
    }


}