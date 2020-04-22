import {AutoIncrement, Column, DataType, Default, Model, PrimaryKey, Table, Unique} from 'sequelize-typescript';

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

    @Unique
    @Column
    messageKey!: string;

    @Column
    text!: string;


    @Column({
        type: DataType.ENUM("N", "Y", "E"),
        defaultValue: "N"
    })
    isProcessed!: string;

    @Column
    processedAt!: Date
}