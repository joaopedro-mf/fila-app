import { Repository } from "typeorm";
import { User } from "../../domain/entities/User";
import { AppDataSource } from "../database";

export class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async createUser(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    return await this.userRepository.save(user);
  }

  async findUserById(id: number): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User | null> {
    await this.userRepository.update(id, userData);
    return this.findUserById(id);
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }
}