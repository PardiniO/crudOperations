export interface iUsers {
    id: number;
    name: string;
    email: string;
    gender: string;
}

export type iCreateUser = Omit<iUsers, 'id'>;
