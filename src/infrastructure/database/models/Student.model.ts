import {Table, Column, Model, HasMany} from 'sequelize-typescript';

@Table({ timestamps: true })
export default class Student extends Model<Student> {

    @Column
    name!: string;

}