"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentosRepository = void 0;
const database_1 = require("../database");
class DocumentosRepository {
    constructor() {
        this._db = database_1.db;
    }
    async getDocumentById(id) {
        return await database_1.db.selectFrom('DocumentosUsuario')
            .where('id', '=', id)
            .selectAll()
            .executeTakeFirst();
    }
    async getDocument(criteria) {
        let query = this._db.selectFrom('DocumentosUsuario');
        if (criteria.id) {
            query = query.where('id', '=', criteria.id);
        }
        if (criteria.tipo) {
            query = query.where('tipo', '=', criteria.tipo);
        }
        return await query.selectAll().execute();
    }
    async createDocument(documento) {
        return await database_1.db.insertInto('DocumentosUsuario')
            .values(documento)
            .returningAll()
            .executeTakeFirstOrThrow();
    }
}
exports.DocumentosRepository = DocumentosRepository;
