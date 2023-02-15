import { Entity, PrimaryColumn, Column } from "typeorm";

export type statsType = 'M' | 'W';
export type sending = "ASC" | "DESC";

@Entity("match_stats")
export class MatchStats {

    @PrimaryColumn()
    statsDate: string;

    @PrimaryColumn({
        type: "enum",
        enum: ["M", "W"],
        default: "w"
    })
    statsType: statsType;

    @PrimaryColumn()
    combiType: string;

    @Column("varchar", { length: 10 })
    statsFromDate: string;

    @Column("varchar", { length: 10 })
    statsToDate: string;

    @PrimaryColumn({
        type: "enum",
        enum: ["ASC", "DESC"],
        default: "DESC"
    })
    order: sending

    @PrimaryColumn()
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