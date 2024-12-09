"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs_1 = require("fs");
const kysely_1 = require("kysely");
const database_1 = require("./database");
async function migrateToLatest() {
    const migrator = new kysely_1.Migrator({
        db: database_1.db,
        provider: new kysely_1.FileMigrationProvider({
            fs: fs_1.promises,
            path,
            migrationFolder: path.join(__dirname, '/migrations/'),
        }),
    });
    const { error, results } = await migrator.migrateToLatest();
    results === null || results === void 0 ? void 0 : results.forEach((it) => {
        if (it.status === 'Success') {
            console.log(`migration "${it.migrationName}" was executed successfully`);
        }
        else if (it.status === 'Error') {
            console.error(`failed to execute migration "${it.migrationName}"`);
        }
    });
    if (error) {
        console.error('failed to migrate');
        console.error(error);
        process.exit(1);
    }
    await database_1.db.destroy();
}
migrateToLatest();
