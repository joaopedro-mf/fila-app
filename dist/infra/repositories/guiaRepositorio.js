"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuiaRepository = void 0;
const database_1 = require("../database");
class GuiaRepository {
    constructor() {
        this._db = database_1.db;
    }
    async getGuiaById(id) {
        return await database_1.db.selectFrom('GuiaAtendimento')
            .where('id', '=', id)
            .selectAll()
            .executeTakeFirst();
    }
    async getGuia(criteria) {
        let query = this._db.selectFrom('GuiaAtendimento');
        if (criteria.id) {
            query = query.where('id', '=', criteria.id);
        }
        if (criteria.autorizacaoId) {
            query = query.where('id', '=', criteria.autorizacaoId);
        }
        return await query.selectAll().execute();
    }
    async getGuiaByAutorizacao(criteria) {
        let query = this._db.selectFrom('GuiaAtendimento')
            .innerJoin('Autorizacao', 'GuiaAtendimento.autorizacaoId', 'Autorizacao.id');
        if (criteria.id) {
            query = query.where('id', '=', criteria.id);
        }
        if (criteria.usuarioId) {
            query = query.where('usuarioId', '=', criteria.usuarioId);
        }
        return await query.selectAll().execute();
    }
    async updateGuia(id, updateWith) {
        await database_1.db.updateTable('GuiaAtendimento')
            .set(updateWith)
            .where('id', '=', id)
            .execute();
    }
    async createGuia(guia) {
        return await database_1.db.insertInto('GuiaAtendimento')
            .values(guia)
            .returningAll()
            .executeTakeFirstOrThrow();
    }
}
exports.GuiaRepository = GuiaRepository;
