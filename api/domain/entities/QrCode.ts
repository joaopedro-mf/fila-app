import * as jwt from 'jsonwebtoken';


const generateTokenQrCode = (operadoraId: number, usarioId: number, guiaId:number): string => {
    const secret = process.env.JWT_SECRET;
    const currentDate: Date = new Date();

    var payload ={
        "operadoraId": operadoraId,
        "usuarioId": usarioId,
        "guiaId": guiaId,
        "date": currentDate.toISOString()
    }
  
    return jwt.sign(payload, secret);
  }

export default generateTokenQrCode