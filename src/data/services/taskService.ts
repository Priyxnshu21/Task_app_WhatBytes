import { db } from '../firebaseConfig';
import { Task, NewTaskPayload } from '../../domain/models/Task';

const TASKS_COLLECTION = 'tasks';

export class TaskService {
  static async getTasks(userId: string): Promise<Task[]> {
    // Compat syntax for queries
    const snapshot = await db
      .collection(TASKS_COLLECTION)
      .where('userId', '==', userId)
      .orderBy('dueDate', 'asc')
      .get();
      
    const tasks: Task[] = [];
    snapshot.forEach((doc) => {
      tasks.push({ id: doc.id, ...doc.data() } as Task);
    });
    return tasks;
  }

  static async addTask(taskPayload: NewTaskPayload): Promise<string> {
    // Compat syntax for adding documents
    const docRef = await db.collection(TASKS_COLLECTION).add(taskPayload);
    return docRef.id;
  }

  static async updateTask(taskId: string, updates: Partial<Task>): Promise<void> {
    // Compat syntax for updating documents
    const taskDoc = db.collection(TASKS_COLLECTION).doc(taskId);
    return taskDoc.update(updates);
  }

  static async deleteTask(taskId: string): Promise<void> {
    // Compat syntax for deleting documents
    const taskDoc = db.collection(TASKS_COLLECTION).doc(taskId);
    return taskDoc.delete();
  }
}