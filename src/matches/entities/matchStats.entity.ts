import { Entity, PrimaryColumn, Column, PrimaryGeneratedColumn } from "typeorm";

export type statsType = 'M' | 'W';
export type combiType = 'ATTACK' | 'TANKER';
export type sending = "ASC" | "DESC";

@Entity("match_stats")
export class MatchStats {

    @PrimaryGeneratedColumn()
    statsId: number;

    @Column("varchar", { length: 10 })
    statsDate: string;

    @Column({
        type: "enum",
        enum: ["M", "W"],
        default: "W"
    })
    statsType: statsType;

    @Column({
        type: "enum",
        enum: ["ATTACK", "TANKER"],
        default: "TANKER"
    })
    combiType: combiType;

    @Column("varchar", { length: 10 })
    statsFromDate: string;

    @Column("varchar", { length: 10 })
    statsToDate: string;

    @Column({
        type: "enum",
        enum: ["ASC", "DESC"],
        default: "DESC"
    })
    statsOrder: sending

    @Column("varchar", { length: 200 })
    combi: string;

    @Column("int")
    total: number;

    @Column("int")
    win: number;

    @Column("int")
    lose: number;

    @Column("int")
    late: number;

}