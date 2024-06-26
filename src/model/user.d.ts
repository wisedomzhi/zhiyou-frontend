/**
 * 用户类型
 */

export type UserType = {
    id?: number;
    avatarUrl?: string;
    username?: string;
    userAccount?: string;
    gender?: number;
    phone?: string;
    email?:string;
    userRole?:number;
    userStatus?:number;
    tags?:string[];
    createTime?:Date;
    updateTime?:Date;
};
