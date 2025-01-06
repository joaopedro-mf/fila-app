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
  
    if (criteria.numeroCPF) {
      query = query.where('numeroCPF', '=', criteria.numeroCPF)
    }
  
    return await query.selectAll().executeTakeFirst()
  }

  async getAllUsuarios() {
    let query = this._db.selectFrom('Usuario')
    
    return await query.selectAll().execute()
  }

  async updateUsuario(id: number, updateWith: Partial<UsuarioUpdate>) {
    await db.updateTable('Usuario')
            .set(updateWith)
            .where('id', '=', id)
            .executeTakeFirst()
  }
  
 async createUsuario(person: NewUsuario) {
  return await db.insertInto('Usuario')
    .values(person)
    .returningAll()
    .executeTakeFirstOrThrow()
}

  async deleteUsuario(id: number) {
    return await db.deleteFrom('Usuario').where('id', '=', id)
      .returningAll()
      .executeTakeFirst()
  }

}