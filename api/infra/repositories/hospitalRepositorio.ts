import { Hospital, NewHospital, HospitalUpdate } from "../../domain/entities/Hospital";
import { db, dbInterface } from "../database";
import { Kysely } from 'kysely'

export class HospitalRepository {
  
  private _db : Kysely<dbInterface> ;

  constructor(){
    this._db = db;
  }

  async getHospitalById(id: number) {
    return await db.selectFrom('Hospital')
      .where('id', '=', id)
      .selectAll()
      .executeTakeFirst()
  }

  async getHospital(criteria: Partial<Hospital>) {
    let query = this._db.selectFrom('Hospital')
  
    if (criteria.id) {
      query = query.where('id', '=', criteria.id)
    }
  
    return await query.selectAll().execute()
  }

  async getAllHospitals(operadoraId: number) {
    let query = this._db.selectFrom('Hospital')
                        .innerJoin('OperadorasPorHospital', 'OperadorasPorHospital.hospitalId', 'Hospital.id')
                        .where('OperadorasPorHospital.operadoraId', '=', operadoraId)
                        .select(['Hospital.id', 'Hospital.nome', 'Hospital.endereco']);
    
    return await query.execute()
  }

  async updatePerson(id: number, updateWith: HospitalUpdate) {
    await db.updateTable('Hospital').set(updateWith).where('id', '=', id).execute()
  }
  
 async createPerson(person: NewHospital) {
  return await db.insertInto('Hospital')
    .values(person)
    .returningAll()
    .executeTakeFirstOrThrow()
}

  async deletePerson(id: number) {
    return await db.deleteFrom('Hospital').where('id', '=', id)
      .returningAll()
      .executeTakeFirst()
  }

}