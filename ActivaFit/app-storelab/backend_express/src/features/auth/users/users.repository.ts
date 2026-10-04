import { CreationAttributes, Op, Transaction } from "sequelize";
import { User } from "./user.model";

/**
 * Capa Repository del feature Users.
 *
 * Única capa que habla con Sequelize y el modelo User.
 * No contiene reglas de negocio ni conoce req/res.
 *
 * Las lecturas normales excluyen password.
 * Solo las consultas que lo necesitan lo incluyen explícitamente.
 */
export class UsersRepository {
  /**
   * Proyección sin credencial.
   *
   * Se utiliza en las lecturas normales de usuarios.
   */
  private static readonly WITHOUT_PASSWORD = {
    exclude: ["password"],
  };

  /**
   * Todos los usuarios activos, sin password.
   */
  public async findAllActive(): Promise<User[]> {
    return User.findAll({
      where: {
        status: "active",
      },
      attributes: UsersRepository.WITHOUT_PASSWORD,
    });
  }

  /**
   * Busca un usuario por ID, sin password.
   *
   * Acepta una transacción opcional.
   */
  public async findById(
    id: number,
    transaction?: Transaction
  ): Promise<User | null> {
    return User.findByPk(id, {
      attributes: UsersRepository.WITHOUT_PASSWORD,
      transaction,
    });
  }

  /**
   * Busca un usuario por ID incluyendo su hash.
   *
   * Uso exclusivo para cambio de contraseña.
   */
  public async findByIdWithPassword(
    id: number
  ): Promise<User | null> {
    return User.findByPk(id);
  }

  /**
   * Busca un usuario por username o email incluyendo su hash.
   *
   * Uso exclusivo para validación de credenciales en el login.
   */
  public async findByIdentifierWithPassword(
    identifier: string
  ): Promise<User | null> {
    const value = identifier.trim().toLowerCase();

    return User.findOne({
      where: {
        [Op.or]: [
          { username: value },
          { email: value },
        ],
      },
    });
  }

  /**
   * Busca conflictos por username o email.
   *
   * No devuelve password.
   */
  public async findConflicts(
    username: string,
    email: string
  ): Promise<User[]> {
    return User.findAll({
      where: {
        [Op.or]: [
          {
            username: username.trim().toLowerCase(),
          },
          {
            email: email.trim().toLowerCase(),
          },
        ],
      },
      attributes: ["id", "username", "email"],
    });
  }

  /**
   * Inserta un usuario.
   *
   * El hook del modelo User se encarga de hashear password.
   */
  public async create(
    data: CreationAttributes<User>
  ): Promise<User> {
    return User.create(data);
  }

  /**
   * Persiste cambios sobre una instancia existente.
   */
  public async update(
    user: User,
    data: Partial<User>
  ): Promise<User> {
    return user.update(data);
  }

  /**
   * Elimina físicamente una instancia.
   */
  public async delete(user: User): Promise<void> {
    await user.destroy();
  }
}
