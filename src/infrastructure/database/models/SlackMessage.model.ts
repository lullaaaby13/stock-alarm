import {AutoIncrement, Column, DataType, Default, Model, PrimaryKey, Table} from 'sequelize-typescript';

@Table({ timestamps: true, underscored: true })
export default class SlackMessage extends Model<SlackMessage> {

    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @Column
    channelName!: string;

    @Column
    channelId!: string;

    @Column
    text!: string;


    @Column({
        type: DataType.ENUM("N", "Y"),
        defaultValue: "N"
    })
    isProcessed!: string;

    @Column
    processedAt!: Date
}