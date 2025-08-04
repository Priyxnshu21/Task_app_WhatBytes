export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: number;
  priority: 'low' | 'medium' | 'high';
  category: string;
  isComplete: boolean;
  userId: string;
}

export type NewTaskPayload = Omit<Task, 'id'>;