import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'routines', timestamps: true })
export class Routine extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare description: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare durationWeeks: number;
}
