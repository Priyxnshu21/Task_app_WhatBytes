import { create } from 'zustand';
import { Task, NewTaskPayload } from '../../domain/models/Task';
import { TaskService } from '../../data/services/taskService';
import { useAuthStore } from './authStore';

interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  addTask: (taskPayload: Omit<Task, 'id' | 'userId' | 'isComplete'>) => Promise<void>;
  updateTask: (taskId: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  isLoading: false,
  error: null,

  fetchTasks: async () => {
    const userId = useAuthStore.getState().user?.uid;
    if (!userId) return;

    set({ isLoading: true, error: null });
    try {
      const tasks = await TaskService.getTasks(userId);
      set({ tasks, isLoading: false });
    } catch (e) {
      set({ error: 'Failed to fetch tasks.', isLoading: false });
    }
  },

  addTask: async (taskPayload) => {
    const userId = useAuthStore.getState().user?.uid;
    if (!userId) {
      set({ error: 'You must be logged in to create a task.' });
      return;
    }

    const newTaskData: NewTaskPayload = { ...taskPayload, userId, isComplete: false };
    
    try {
      const newTaskId = await TaskService.addTask(newTaskData);
      const newTaskWithId: Task = {
        id: newTaskId,
        ...newTaskData,
      };

      // This adds the new task to the screen instantly
      set(state => ({
        tasks: [...state.tasks, newTaskWithId].sort((a, b) => a.dueDate - b.dueDate)
      }));

    } catch (error) {
      console.error('Error saving task to Firestore:', error);
      set({ error: 'Failed to save task. Please try again.' });
    }
  },

  updateTask: async (taskId, updates) => {
    await TaskService.updateTask(taskId, updates);
    set(state => ({
        tasks: state.tasks.map(task => task.id === taskId ? {...task, ...updates} : task)
    }));
  },

  deleteTask: async (taskId) => {
    await TaskService.deleteTask(taskId);
    set(state => ({
        tasks: state.tasks.filter(task => task.id !== taskId)
    }));
  },
}));