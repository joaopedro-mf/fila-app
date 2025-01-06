import { Request, Response } from "express";
import { UsuarioRepository } from "../infra/repositories/usuarioRepositorio";
import { UsuarioUpdate } from "../domain/entities/Usuario"

export class UsuarioController {
  private usuarioRepository: UsuarioRepository;

  constructor() {
    this.usuarioRepository = new UsuarioRepository();
  }


  async getUsuario(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const user = await this.usuarioRepository.getUsuarioById(id);
      if (user) {
        var response ={
          "nome":user.nome,
          "numeroCPF": user.numeroCPF,
          "dataNascimento": user.dataNascimento,
          "email": user.email,
          "numeroCartaoOperadora": user.numeroCartaoOperadora,
          "cep": user.cep,
          "endereco": user.endereco,
          "complementoEndereco": user.complementoEndereco,
          "numeroEndereco": user.numeroEndereco,
          "telefone": user.telefone,
          "status": user.status,
        }
        res.json(response);
      } else {
        res.status(404).json({ error: "Usuário não encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar usuário" });
    }
  }

  async UpdateUsuarios(req: Request, res: Response): Promise<void> {
    try {

      const dataToUpdate: Partial<UsuarioUpdate> = {};

      var updateData = req.body
      Object.keys(updateData).forEach(key => {
        console.log(key)
        if (updateData[key] !== undefined && key !== 'tokenJwt') {
          dataToUpdate[key] = updateData[key];
        }
      });

      var usuarioUpdate = await this.usuarioRepository.updateUsuario(req.body.tokenJwt.usuarioId, dataToUpdate)

      res.json(usuarioUpdate);  
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar usuário" });
    }
  }

}