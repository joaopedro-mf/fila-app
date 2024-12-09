"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioRepository = void 0;
const database_1 = require("../database");
class UsuarioRepository {
    constructor() {
        this._db = database_1.db;
    }
    async getUsuarioById(id) {
        return await database_1.db.selectFrom('Usuario')
            .where('id', '=', id)
            .selectAll()
            .executeTakeFirst();
    }
    async getUsuario(criteria) {
        let query = this._db.selectFrom('Usuario');
        if (criteria.id) {
            query = query.where('id', '=', criteria.id);
        }
        return await query.selectAll().execute();
    }
    async getAllUsuarios() {
        let query = this._db.selectFrom('Usuario');
        return await query.selectAll().execute();
    }
    async updatePerson(id, updateWith) {
        await database_1.db.updateTable('Usuario').set(updateWith).where('id', '=', id).execute();
    }
    async createPerson(person) {
        return await database_1.db.insertInto('Usuario')
            .values(person)
            .returningAll()
            .executeTakeFirstOrThrow();
    }
    async deletePerson(id) {
        return await database_1.db.deleteFrom('Usuario').where('id', '=', id)
            .returningAll()
            .executeTakeFirst();
    }
}
exports.UsuarioRepository = UsuarioRepository;
