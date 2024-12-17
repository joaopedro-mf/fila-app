import { OperadoraPlanoSaude, NewOperadoraPlanoSaude, OperadoraPlanoSaudeUpdate } from "../../domain/entities/OperadoraPlanoSaude";
import { db, dbInterface } from "../database";
import { Kysely } from 'kysely'

export class OperadoraPlanoSaudeRepository {
  
  private _db : Kysely<dbInterface> ;

  constructor(){
    this._db = db;
  }

  async getOperadoraPlanoSaudeById(id: number) {
    return await db.selectFrom('OperadoraPlanoSaude')
      .where('id', '=', id)
      .selectAll()
      .executeTakeFirst()
  }

  async getOperadoraPlanoSaude(criteria: Partial<OperadoraPlanoSaude>) {
    let query = this._db.selectFrom('OperadoraPlanoSaude')
  
    if (criteria.id) {
      query = query.where('id', '=', criteria.id)
    }
  
    return await query.selectAll().execute()
  }

  async getAllOperadoraPlanoSaudes() {
    let query = this._db.selectFrom('OperadoraPlanoSaude')
    
    return await query.selectAll().execute()
  }

  async updatePerson(id: number, updateWith: OperadoraPlanoSaudeUpdate) {
    await db.updateTable('OperadoraPlanoSaude').set(updateWith).where('id', '=', id).execute()
  }
  
 async createPerson(person: NewOperadoraPlanoSaude) {
  return await db.insertInto('OperadoraPlanoSaude')
    .values(person)
    .returningAll()
    .executeTakeFirstOrThrow()
}

  async deletePerson(id: number) {
    return await db.deleteFrom('OperadoraPlanoSaude').where('id', '=', id)
      .returningAll()
      .executeTakeFirst()
  }

}