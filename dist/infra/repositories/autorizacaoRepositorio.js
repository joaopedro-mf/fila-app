"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutorizacaoRepository = void 0;
const database_1 = require("../database");
class AutorizacaoRepository {
    constructor() {
        this._db = database_1.db;
    }
    async getAutorizacaoById(id) {
        return await database_1.db.selectFrom('Autorizacao')
            .where('id', '=', id)
            .selectAll()
            .executeTakeFirst();
    }
    async getAutorizacao(criteria) {
        let query = this._db.selectFrom('Autorizacao');
        if (criteria.id) {
            query = query.where('id', '=', criteria.id);
        }
        if (criteria.usuarioId) {
            query = query.where('usuarioId', '=', criteria.usuarioId);
        }
        return await query.selectAll().execute();
    }
    async createAutorizacao(autorizacao) {
        return await database_1.db.insertInto('Autorizacao')
            .values(autorizacao)
            .returningAll()
            .executeTakeFirstOrThrow();
    }
}
exports.AutorizacaoRepository = AutorizacaoRepository;
