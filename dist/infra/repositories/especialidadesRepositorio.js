"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EspecialidadesRepository = void 0;
const database_1 = require("../database");
class EspecialidadesRepository {
    constructor() {
        this._db = database_1.db;
    }
    async getEspecialidadesById(id) {
        return await database_1.db.selectFrom('Especialidades')
            .where('id', '=', id)
            .selectAll()
            .executeTakeFirst();
    }
    async getEspecialidades(criteria) {
        let query = this._db.selectFrom('Especialidades');
        if (criteria.id) {
            query = query.where('id', '=', criteria.id);
        }
        return await query.selectAll().execute();
    }
    async getAllEspecialidades() {
        let query = this._db.selectFrom('Especialidades');
        return await query.selectAll().execute();
    }
    async getAllEspecialidadesPorHospital(hospitalId) {
        let query = this._db.selectFrom('Especialidades')
            .innerJoin('EspecialidadesPorHospital', 'EspecialidadesPorHospital.especialidadeId', 'Especialidades.id')
            .select(['Especialidades.id', 'Especialidades.nome', 'Especialidades.descricao', 'Especialidades.necessitaEncaminhamento'])
            .where('EspecialidadesPorHospital.hospitalId', '=', hospitalId);
        return await query.execute();
    }
    async updatePerson(id, updateWith) {
        await database_1.db.updateTable('Especialidades').set(updateWith).where('id', '=', id).execute();
    }
    async createPerson(person) {
        return await database_1.db.insertInto('Especialidades')
            .values(person)
            .returningAll()
            .executeTakeFirstOrThrow();
    }
    async deletePerson(id) {
        return await database_1.db.deleteFrom('Especialidades').where('id', '=', id)
            .returningAll()
            .executeTakeFirst();
    }
}
exports.EspecialidadesRepository = EspecialidadesRepository;
