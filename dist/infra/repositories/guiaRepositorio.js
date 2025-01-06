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
        let query = this._db.selectFrom('Autorizacao')
            .innerJoin('GuiaAtendimento', 'GuiaAtendimento.autorizacaoId', 'Autorizacao.id')
            .innerJoin('Hospital', 'Hospital.id', 'Autorizacao.hospitalId')
            .innerJoin('Especialidades', 'Especialidades.id', 'Autorizacao.especialidadeId')
            .innerJoin("Usuario", 'Usuario.id', "Autorizacao.usuarioId")
            .innerJoin("OperadoraPlanoSaude", "OperadoraPlanoSaude.id", "Autorizacao.operadoraId");
        if (criteria.id) {
            query = query.where('Autorizacao.id', '=', criteria.id);
        }
        if (criteria.usuarioId) {
            query = query.where('usuarioId', '=', criteria.usuarioId);
        }
        // TODO: Fazer consulta com inner join na tabela de hospital e especialidade para acessar detalhes dos campos hospitalId e especialdiadeId
        return await query
            .select(["GuiaAtendimento.id",
            "GuiaAtendimento.statusGuia",
            "GuiaAtendimento.dataEmissao",
            "Especialidades.nome as especialidade",
            "Hospital.nome as hospital",
            "Usuario.nome",
            "Usuario.numeroCartaoOperadora",
            "OperadoraPlanoSaude.nomeSocial as operadora"])
            .execute();
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
