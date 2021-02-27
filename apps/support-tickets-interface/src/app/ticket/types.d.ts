export interface IExistingSupportTicket {
  id: number;
  title: string;
  description: string
  priority: PriorityType // (selectable from a predefined list)
  status: StatusType     // (selectable from a predefined list)
  email: string
  refersTo: number[];   // <Relation to other Support tickets IDs>
}

export interface INewSupportTicket {
  id?: number;
  title?: string;
  description?: string
  priority?: PriorityType // (selectable from a predefined list)
  status?: StatusType     // (selectable from a predefined list)
  email?: string
  refersTo?: number[];   // <Relation to other Support tickets IDs>
}

// export type ISupportTicket = IExistingSupportTicket | INewSupportTicket;