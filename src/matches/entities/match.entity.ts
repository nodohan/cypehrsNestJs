import { Entity, PrimaryColumn, Column } from "typeorm";

export type seasonType = '2022H' | '2022U' | '2023H' | '2023U' | '2021H' | '2021U';

@Entity("matches")
export class Matches {

    @PrimaryColumn()
    matchId: string;

    @Column({
        type: "enum",
        enum: ["ASC", "DESC"],
        default: "DESC"
    })
    season: seasonType;

    @Column("text")
    jsonData: JSON;

    @Column("datetime")
    matchDate: Date;

    @Column("varchar")
    isNickCollect: string;

    @Column("varchar")
    positionCollect: string;

    @Column("datetime")
    insertDate: Date;

}