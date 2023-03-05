export interface TaskModel {
  _id?: string;
  title: string;
  description: string;
  assignedTo: AssignedToModel;
}

export interface AssignedToModel {
  _id?: string;
}
