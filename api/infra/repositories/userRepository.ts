import { User, NewUser, UserUpdate } from "../../domain/entities/User";
import { db, dbInterface } from "../database";
import { Kysely } from 'kysely'

export class UserRepository {
  
  private _db : Kysely<dbInterface> ;

  constructor(){
    this._db = db;
  }

  async getUserById(id: number) {
    return await db.selectFrom('User')
      .where('id', '=', id)
      .selectAll()
      .executeTakeFirst()
  }

  async getUser(criteria: Partial<User>) {
    let query = this._db.selectFrom('User')
  
    if (criteria.id) {
      query = query.where('id', '=', criteria.id)
    }
  
    return await query.selectAll().execute()
  }

  async getAllUsers() {
    let query = this._db.selectFrom('User')
    
    return await query.selectAll().execute()
  }

  async updatePerson(id: number, updateWith: UserUpdate) {
    await db.updateTable('User').set(updateWith).where('id', '=', id).execute()
  }
  
 async createPerson(person: NewUser) {
  return await db.insertInto('User')
    .values(person)
    .returningAll()
    .executeTakeFirstOrThrow()
}

  async deletePerson(id: number) {
    return await db.deleteFrom('User').where('id', '=', id)
      .returningAll()
      .executeTakeFirst()
  }

}