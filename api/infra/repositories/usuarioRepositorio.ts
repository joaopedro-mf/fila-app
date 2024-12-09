import { Usuario, NewUsuario, UsuarioUpdate } from "../../domain/entities/Usuario";
import { db, dbInterface } from "../database";
import { Kysely } from 'kysely'

export class UsuarioRepository {
  
  private _db : Kysely<dbInterface> ;

  constructor(){
    this._db = db;
  }

  async getUsuarioById(id: number) {
    return await db.selectFrom('Usuario')
      .where('id', '=', id)
      .selectAll()
      .executeTakeFirst()
  }

  async getUsuario(criteria: Partial<Usuario>) {
    let query = this._db.selectFrom('Usuario')
  
    if (criteria.id) {
      query = query.where('id', '=', criteria.id)
    }
  
    return await query.selectAll().execute()
  }

  async getAllUsuarios() {
    let query = this._db.selectFrom('Usuario')
    
    return await query.selectAll().execute()
  }

  async updatePerson(id: number, updateWith: UsuarioUpdate) {
    await db.updateTable('Usuario').set(updateWith).where('id', '=', id).execute()
  }
  
 async createPerson(person: NewUsuario) {
  return await db.insertInto('Usuario')
    .values(person)
    .returningAll()
    .executeTakeFirstOrThrow()
}

  async deletePerson(id: number) {
    return await db.deleteFrom('Usuario').where('id', '=', id)
      .returningAll()
      .executeTakeFirst()
  }

}