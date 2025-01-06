"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(db) {
    await db.schema
        .createTable('OperadoraPlanoSaude')
        .addColumn('id', 'serial', (col) => col.primaryKey())
        .addColumn('nomeSocial', 'varchar(100)', (col) => col.notNull())
        .addColumn('cnpj', 'varchar(50)', (col) => col.notNull())
        .addColumn('registroANS', 'varchar(50)', (col) => col.notNull())
        .addColumn('ativado', 'boolean', (col) => col.notNull())
        .execute();
    await db.schema
        .createIndex('OperadoraPlanoSaude_nome_index')
        .on('OperadoraPlanoSaude')
        .column('nomeSocial')
        .execute();
    await db.schema
        .createTable('DocumentosUsuario')
        .addColumn('id', 'serial', (col) => col.primaryKey())
        .addColumn('tipo', 'varchar(50)', (col) => col.notNull())
        .addColumn('data', 'bytea', (col) => col.notNull())
        .addColumn('dataCriacao', 'date', (col) => col.notNull())
        .execute();
    await db.schema
        .createTable('Usuario')
        .addColumn('id', 'serial', (col) => col.primaryKey())
        .addColumn('nome', 'varchar(100)', (col) => col.notNull())
        .addColumn('numeroCPF', 'varchar(11)', (col) => col.notNull().unique())
        .addColumn('dataNascimento', 'date')
        .addColumn('email', 'varchar(100)', (col) => col.notNull())
        .addColumn('numeroCartaoOperadora', 'varchar(50)', (col) => col.notNull())
        .addColumn('cep', 'varchar(10)', (col) => col.notNull())
        .addColumn('endereco', 'varchar(50)', (col) => col.notNull())
        .addColumn('complementoEndereco', 'varchar')
        .addColumn('numeroEndereco', 'varchar(5)', (col) => col.notNull())
        .addColumn('telefone', 'varchar(15)', (col) => col.notNull())
        .addColumn('status', 'varchar(50)')
        .addColumn('ativo', 'boolean', (col) => col.notNull())
        .addColumn('password', 'varchar', (col) => col.notNull())
        .addColumn('comprovanteResidenciaDocumentoId', 'serial')
        .addColumn('biometriaDocumentoId', 'serial')
        .addColumn('identificacaoDocumentoId', 'serial')
        .addColumn('carteiraDocumentoId', 'serial')
        .addColumn('imagemPerfil', 'serial')
        .addColumn('operadoraId', 'serial', (col) => col.references('OperadoraPlanoSaude.id').onDelete('cascade').notNull())
        .execute();
    await db.schema
        .createIndex('Usuario_cpf_index')
        .on('Usuario')
        .column('numeroCPF')
        .execute();
    await db.schema
        .createTable('Hospital')
        .addColumn('id', 'serial', (col) => col.primaryKey())
        .addColumn('nome', 'varchar(100)', (col) => col.notNull())
        .addColumn('cnpj', 'varchar(14)', (col) => col.notNull())
        .addColumn('endereco', 'varchar(100)', (col) => col.notNull())
        .addColumn('ativo', 'boolean', (col) => col.notNull())
        .execute();
    await db.schema
        .createIndex('Hospital_nome_index')
        .on('Hospital')
        .column('nome')
        .execute();
    await db.schema
        .createTable('Especialidades')
        .addColumn('id', 'serial', (col) => col.primaryKey())
        .addColumn('nome', 'varchar(50)', (col) => col.notNull())
        .addColumn('descricao', 'varchar(100)', (col) => col.notNull())
        .addColumn('necessitaEncaminhamento', 'boolean')
        .execute();
    await db.schema
        .createIndex('Especialidades_nome_index')
        .on('Especialidades')
        .column('nome')
        .execute();
    await db.schema
        .createTable('EspecialidadesPorHospital')
        .addColumn('id', 'serial', (col) => col.primaryKey())
        .addColumn('hospitalId', 'serial', (col) => col.references('Hospital.id').onDelete('cascade').notNull())
        .addColumn('especialidadeId', 'serial', (col) => col.references('Especialidades.id').onDelete('cascade').notNull())
        .addColumn('disponibilidade', 'json', (col) => col.notNull())
        .execute();
    await db.schema
        .createTable('OperadorasPorHospital')
        .addColumn('id', 'serial', (col) => col.primaryKey())
        .addColumn('hospitalId', 'serial', (col) => col.references('Hospital.id').onDelete('cascade').notNull())
        .addColumn('operadoraId', 'serial', (col) => col.references('OperadoraPlanoSaude.id').onDelete('cascade').notNull())
        .addColumn('disponibilidade', 'serial', (col) => col.notNull())
        .execute();
    await db.schema
        .createTable('Autorizacao')
        .addColumn('id', 'serial', (col) => col.primaryKey())
        .addColumn('usuarioId', 'serial', (col) => col.references('Usuario.id').onDelete('cascade').notNull())
        .addColumn('hospitalId', 'serial', (col) => col.references('Hospital.id').onDelete('cascade').notNull())
        .addColumn('operadoraId', 'serial', (col) => col.references('OperadoraPlanoSaude.id').onDelete('cascade').notNull())
        .addColumn('especialidadeId', 'serial', (col) => col.references('Especialidades.id').onDelete('cascade').notNull())
        .addColumn('dataSolicitacao', 'date', (col) => col.notNull())
        .addColumn('statusAutorizacao', 'varchar(50)', (col) => col.notNull())
        .addColumn('valorAutorizado', 'decimal')
        .addColumn('descricaoPedido', 'varchar(100)')
        .execute();
    await db.schema
        .createTable('GuiaAtendimento')
        .addColumn('id', 'serial', (col) => col.primaryKey())
        .addColumn('autorizacaoId', 'serial', (col) => col.references('Autorizacao.id').onDelete('cascade').notNull())
        .addColumn('tokenQrCode', 'varchar')
        .addColumn('dataEmissao', 'date', (col) => col.notNull())
        .addColumn('dataValidade', 'date', (col) => col.notNull())
        .addColumn('statusGuia', 'varchar(25)', (col) => col.notNull())
        .addColumn('biometriaDocumentoId', 'numeric', (col) => col.defaultTo(null))
        .addColumn('assinaturaDocumentoId', 'numeric', (col) => col.defaultTo(null))
        .execute();
}
async function down(db) {
    await db.schema.dropTable('OperadoraPlanoSaude').execute();
    await db.schema.dropTable('Usuario').execute();
    await db.schema.dropTable('DocumentosUsuario').execute();
    await db.schema.dropTable('Hospital').execute();
    await db.schema.dropTable('Especialidades').execute();
    await db.schema.dropTable('EspecialidadesPorHospital').execute();
    await db.schema.dropTable('OperadorasPorHospital').execute();
    await db.schema.dropTable('Autorizacao').execute();
    await db.schema.dropTable('GuiaAtendimento').execute();
}
