-- Inserção de dados na tabela OperadoraPlanoSaude
INSERT INTO "OperadoraPlanoSaude" ("id", "nomeSocial", "cnpj", "registroANS", "ativado") VALUES
(1, 'Saude Total', '12345678000100', 'ANS12345', true),
(2, 'Vida Plena', '98765432000100', 'ANS67890', true),
(3, 'Bem Estar', '11223344000100', 'ANS11223', false);

-- Inserção de dados na tabela Usuario
INSERT INTO "Usuario" ("id", "nome", "numeroCPF", "dataNascimento", "email", "numeroCartaoOperadora", "cep", "endereco", "numeroEndereco", "telefone","status", "ativo", "operadoraId") VALUES
(1, 'João Silva', '12345678901', '1985-05-20', 'joao.silva@email.com', '12345','31333560', 'rua', '2', '31999999999',  'Ativo', true, 1),
(2, 'Maria Oliveira', '98765432100', '1990-08-15', 'maria.oliveira@email.com', '67890','31333560', 'rua', '2', '31999999999', 'Inativo', false, 2),
(3, 'Carlos Pereira', '11122233344', '1975-12-10', 'carlos.pereira@email.com', '11223','31333560', 'rua', '2', '31999999999', 'Ativo', true, 3);

-- Inserção de dados na tabela DocumentosUsuario
INSERT INTO "DocumentosUsuario" ("id", "usuarioId", "tipo", "data","dataCriacao") VALUES
(1, 1, 'biometria', E'\\x646f6331', '2024-01-01'),
(2, 2, 'carteiraIdentificacao', E'\\x646f6332', '2024-01-02'),
(3, 3, 'carteiraOperadora', E'\\x646f6333', '2024-01-03');

-- Inserção de dados na tabela Hospital
INSERT INTO "Hospital" ("id", "nome", "cnpj", "endereco", "ativo") VALUES
(1, 'Hospital Central', '12345678000100', 'Rua Principal, 123', true),
(2, 'Clinica Vida', '98765432000100', 'Avenida Secundária, 456', true),
(3, 'Hospital Esperança', '11223344000100', 'Travessa Terciária, 789', false);

-- Inserção de dados na tabela Especialidades
INSERT INTO "Especialidades" ("id", "nome", "descricao", "necessitaEncaminhamento") VALUES
(1, 'Cardiologia', 'Cuidados com o coração', true),
(2, 'Pediatria', 'Cuidados infantis', false),
(3, 'Ortopedia', 'Cuidados com ossos e articulações', true);

-- Inserção de dados na tabela EspecialidadesPorHospital
INSERT INTO "EspecialidadesPorHospital" ("id", "hospitalId", "especialidadeId", "disponibilidade") VALUES
(1, 1, 1, '{"dias": ["Segunda", "Quarta"], "horarios": ["08:00-12:00"]}'::json),
(2, 1, 2, '{"dias": ["Terça", "Quinta"], "horarios": ["14:00-18:00"]}'::json),
(3, 2, 3, '{"dias": ["Sexta"], "horarios": ["09:00-13:00"]}'::json);

-- Inserção de dados na tabela OperadorasPorHospital
INSERT INTO "OperadorasPorHospital" ("id", "hospitalId", "operadoraId", "disponibilidade") VALUES
(1, 1, 1, 10),
(2, 2, 2, 5),
(3, 3, 3, 0);

-- Inserção de dados na tabela Autorizacao
INSERT INTO "Autorizacao" ("id", "usuarioId", "hospitalId", "operadoraId", "especialidadeId", "dataSolicitacao", "statusAutorizacao", "valorAutorizado") VALUES
(1, 1, 1, 1, 1, '2024-12-01', 'Aprovado', 150.75),
(2, 2, 2, 2, 1,'2024-12-02', 'Pendente', 0.0),
(3, 3, 3, 3, 1,'2024-12-03', 'Negado', 0.0);

-- Inserção de dados na tabela GuiaAtendimento
INSERT INTO "GuiaAtendimento" ("id", "autorizacaoId", "identificadorGuia", "tokenQrCode", "dataEmissao", "dataValidade", "statusGuia", "autorizadorResponsavel") VALUES
(1, 1, 'G12345', 'QR12345', '2024-12-01', '2024-12-31', 'Ativo', 'Dr. João'),
(2, 2, 'G67890', 'QR67890', '2024-12-02', '2024-12-30', 'Pendente', 'Dr. Maria'),
(3, 3, 'G11223', 'QR11223', '2024-12-03', '2024-12-29', 'Cancelado', 'Dr. Carlos');