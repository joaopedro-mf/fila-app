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
        if (criteria.numeroCPF) {
            query = query.where('numeroCPF', '=', criteria.numeroCPF);
        }
        return await query.selectAll().executeTakeFirst();
    }
    async getAllUsuarios() {
        let query = this._db.selectFrom('Usuario');
        return await query.selectAll().execute();
    }
    async updateUsuario(id, updateWith) {
        await database_1.db.updateTable('Usuario')
            .set(updateWith)
            .where('id', '=', id)
            .executeTakeFirst();
    }
    async createUsuario(person) {
        return await database_1.db.insertInto('Usuario')
            .values(person)
            .returningAll()
            .executeTakeFirstOrThrow();
    }
    async deleteUsuario(id) {
        return await database_1.db.deleteFrom('Usuario').where('id', '=', id)
            .returningAll()
            .executeTakeFirst();
    }
}
exports.UsuarioRepository = UsuarioRepository;
