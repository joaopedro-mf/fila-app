import { DocumentoUsuario, NewDocumentoUsuario } from "../../domain/entities/DocumentosUsuario";
import { db, dbInterface } from "../database";
import { Kysely } from 'kysely'

export class DocumentosRepository {
  
  private _db : Kysely<dbInterface> ;

  constructor(){
    this._db = db;
  }

  async getDocumentById(id: number) {
    return await db.selectFrom('DocumentosUsuario')
      .where('id', '=', id)
      .selectAll()
      .executeTakeFirst()
  }

  async getDocument(criteria: Partial<DocumentoUsuario>) {
    let query = this._db.selectFrom('DocumentosUsuario')
  
    if (criteria.id) {
      query = query.where('id', '=', criteria.id)
    }

    if (criteria.tipo) {
        query = query.where('tipo', '=', criteria.tipo)
    }
  
    return await query.selectAll().execute()
  }

 async createDocument(documento: NewDocumentoUsuario) {
    return await db.insertInto('DocumentosUsuario')
        .values(documento)
        .returningAll()
        .executeTakeFirstOrThrow()
    }


}