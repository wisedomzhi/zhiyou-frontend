/**
 * 用户类型
 */

export type TeamType = {
    id?: number;
    teamName: string;
    teamDescription: string;
    teamPassword?: string;
    maxNum: Number;
    expireTime?: string;
    userId: Number;
    teamStatus: Number;
    createTime?: Date;
    updateTime?: Date;
    hasJoin:boolean;
};
