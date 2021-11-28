import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.models';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: FilterTaskDto): Task[] {
    const { status, search } = filterDto;
    if (status && search) {
      return this.tasks.filter(
        (task) => task.status === status && task.title.includes(search),
      );
    }
    if (status) {
      return this.tasks.filter((task) => task.status === status);
    }
    if (search) {
      return this.tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  getTaskById(taskId: string): Task {
    return this.tasks.find((task) => task.id == taskId);
  }

  deleteTask(taskId: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  }

  updateTask(taskId: string, updateTaskDto: CreateTaskDto): Task {
    const task = this.getTaskById(taskId);
    const { title, description } = updateTaskDto;
    task.title = title;
    task.description = description;
    return task;
  }

  updateTaskStatus(taskId: string, status: TaskStatus): Task {
    const task = this.getTaskById(taskId);
    task.status = status;
    return task;
  }
}
