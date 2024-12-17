"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperadoraPlanoSaudeRepository = void 0;
const database_1 = require("../database");
class OperadoraPlanoSaudeRepository {
    constructor() {
        this._db = database_1.db;
    }
    async getOperadoraPlanoSaudeById(id) {
        return await database_1.db.selectFrom('OperadoraPlanoSaude')
            .where('id', '=', id)
            .selectAll()
            .executeTakeFirst();
    }
    async getOperadoraPlanoSaude(criteria) {
        let query = this._db.selectFrom('OperadoraPlanoSaude');
        if (criteria.id) {
            query = query.where('id', '=', criteria.id);
        }
        return await query.selectAll().execute();
    }
    async getAllOperadoraPlanoSaudes() {
        let query = this._db.selectFrom('OperadoraPlanoSaude');
        return await query.selectAll().execute();
    }
    async updatePerson(id, updateWith) {
        await database_1.db.updateTable('OperadoraPlanoSaude').set(updateWith).where('id', '=', id).execute();
    }
    async createPerson(person) {
        return await database_1.db.insertInto('OperadoraPlanoSaude')
            .values(person)
            .returningAll()
            .executeTakeFirstOrThrow();
    }
    async deletePerson(id) {
        return await database_1.db.deleteFrom('OperadoraPlanoSaude').where('id', '=', id)
            .returningAll()
            .executeTakeFirst();
    }
}
exports.OperadoraPlanoSaudeRepository = OperadoraPlanoSaudeRepository;
