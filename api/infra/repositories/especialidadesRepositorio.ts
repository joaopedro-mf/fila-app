import { Especialidades, NewEspecialidades, EspecialidadesUpdate } from "../../domain/entities/Especialidades";
import { db, dbInterface } from "../database";
import { Kysely } from 'kysely'

export class EspecialidadesRepository {
  
  private _db : Kysely<dbInterface> ;

  constructor(){
    this._db = db;
  }

  async getEspecialidadesById(id: number) {
    return await db.selectFrom('Especialidades')
      .where('id', '=', id)
      .selectAll()
      .executeTakeFirst()
  }

  async getEspecialidades(criteria: Partial<Especialidades>) {
    let query = this._db.selectFrom('Especialidades')
  
    if (criteria.id) {
      query = query.where('id', '=', criteria.id)
    }
  
    return await query.selectAll().execute()
  }

  async getAllEspecialidadess() {
    let query = this._db.selectFrom('Especialidades')
    
    return await query.selectAll().execute()
  }

  async updatePerson(id: number, updateWith: EspecialidadesUpdate) {
    await db.updateTable('Especialidades').set(updateWith).where('id', '=', id).execute()
  }
  
 async createPerson(person: NewEspecialidades) {
  return await db.insertInto('Especialidades')
    .values(person)
    .returningAll()
    .executeTakeFirstOrThrow()
}

  async deletePerson(id: number) {
    return await db.deleteFrom('Especialidades').where('id', '=', id)
      .returningAll()
      .executeTakeFirst()
  }

}