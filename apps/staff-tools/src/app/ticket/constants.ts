import { INewSupportTicket } from './types';
export enum PriorityType {
    LOW      = 0,
    HIGH     = 1,
    CRITICAL = 2
};

export const priorityColorMap = {
    0: 'black',
    1: 'orange',
    2: 'red'
};

export enum StatusType {
    OPEN       = 0,
    INPROGRESS = 1,
    DONE       = 2
};

export enum SaveType {
    CREATE,
    UPDATE
}

export const initialTicket: INewSupportTicket = {};