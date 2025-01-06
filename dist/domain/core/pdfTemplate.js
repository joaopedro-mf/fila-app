"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGuiaDocumentTemplate = void 0;
const getGuiaDocumentTemplate = (generatePdfRequest) => {
    var textTemplate = htmlTemplate;
    textTemplate = textTemplate.replace('{nomePaciente}', generatePdfRequest.nomePaciente);
    textTemplate = textTemplate.replace('{numeroCartao}', generatePdfRequest.plano);
    textTemplate = textTemplate.replace('{operadora}', generatePdfRequest.operadora);
    textTemplate = textTemplate.replace('{especialidade}', generatePdfRequest.especialidade);
    textTemplate = textTemplate.replace('{data}', generatePdfRequest.dataEmissao);
    return textTemplate;
};
exports.getGuiaDocumentTemplate = getGuiaDocumentTemplate;
const htmlTemplate = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Guia de Autorização - Operadora de Saúde</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            padding: 0;
            background-color: #f4f4f9;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            text-align: center;
            color: #333;
        }
        .section {
            margin-bottom: 20px;
        }
        .section label {
            font-weight: bold;
            display: block;
            margin-bottom: 5px;
        }
        .section input, .section textarea {
            width: 100%;
            padding: 10px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        .footer {
            text-align: center;
            font-size: 0.9em;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Guia de Autorização</h1>
        <div class="section">
            <label for="patient-name-label">Nome do Paciente:</label>
            <p for="patient-name">{nomePaciente}</p>
        </div>
        <div class="section">
            <label for="plan-number-label">Número do Cartao:</label>
            <p for="plan-name">{numeroCartao}</p>
        </div>
        <div class="section">
            <label for="procedure-label">Operadora:</label>
            <p for="procedure">{operadora}</p>
        </div>
        <div class="section">
            <label for="doctor-label">Especialidade Solicitada:</label>
            <p for="doctor">{especialidade}</p>
        </div>
        <div class="section">
            <label for="date-label">Data da Solicitação:</label>
            <p for="date-name">{data}</p>
        </div>
        <div class="footer">
            <p>Este é um documento gerado automaticamente para fins de autorização de procedimentos médicos.</p>
        </div>
    </div>
</body>
</html>
`;
