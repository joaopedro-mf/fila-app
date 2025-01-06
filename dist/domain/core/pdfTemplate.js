"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gerarPDF = gerarPDF;
const PDFDocument = require("pdfkit");
function gerarPDF(res, dados) {
    const doc = new PDFDocument({ margin: 50 });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=guia_autorizacao.pdf');
    // Função auxiliar para adicionar seções
    function adicionarSecao(label, valor) {
        doc.font('Helvetica-Bold').fontSize(12).text(label);
        doc.font('Helvetica').fontSize(12).text(valor);
        doc.moveDown();
    }
    // Título
    doc.font('Helvetica-Bold').fontSize(18).text('Guia de Autorização', { align: 'center' });
    doc.moveDown(2);
    // Seções de informação
    adicionarSecao('Nome do Paciente:', dados.nomePaciente);
    adicionarSecao('Número do Cartão:', dados.numeroCartao);
    adicionarSecao('Operadora:', dados.operadora);
    adicionarSecao('Especialidade Solicitada:', dados.especialidade);
    adicionarSecao('Data da Solicitação:', dados.data);
    // Rodapé
    doc.moveDown(2);
    doc.fontSize(10).text('Este é um documento gerado automaticamente para fins de autorização de procedimentos médicos.', {
        align: 'center',
        width: 500
    });
    // Finalize o PDF e envie a resposta
    doc.on('data', (chunk) => res.write(chunk));
    doc.on('end', () => res.end());
    doc.end();
}
