"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HospitalRepository = void 0;
const database_1 = require("../database");
class HospitalRepository {
    constructor() {
        this._db = database_1.db;
    }
    async getHospitalById(id) {
        return await database_1.db.selectFrom('Hospital')
            .where('id', '=', id)
            .selectAll()
            .executeTakeFirst();
    }
    async getHospital(criteria) {
        let query = this._db.selectFrom('Hospital');
        if (criteria.id) {
            query = query.where('id', '=', criteria.id);
        }
        return await query.selectAll().execute();
    }
    async getAllHospitals(operadoraId) {
        let query = this._db.selectFrom('Hospital')
            .innerJoin('OperadorasPorHospital', 'OperadorasPorHospital.operadoraId', 'Hospital.id')
            .select(['Hospital.id', 'Hospital.nome', 'Hospital.endereco'])
            .where('OperadorasPorHospital.operadoraId', '=', operadoraId);
        return await query.execute();
    }
    async updatePerson(id, updateWith) {
        await database_1.db.updateTable('Hospital').set(updateWith).where('id', '=', id).execute();
    }
    async createPerson(person) {
        return await database_1.db.insertInto('Hospital')
            .values(person)
            .returningAll()
            .executeTakeFirstOrThrow();
    }
    async deletePerson(id) {
        return await database_1.db.deleteFrom('Hospital').where('id', '=', id)
            .returningAll()
            .executeTakeFirst();
    }
}
exports.HospitalRepository = HospitalRepository;
