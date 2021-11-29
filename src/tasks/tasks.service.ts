import { Injectable, NotFoundException } from '@nestjs/common';
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
    const task: Task = this.tasks.find((task) => task.id == taskId);
    if (!task) {
      throw new NotFoundException(`Task with id ${taskId} not found`);
    }
    return task;
  }

  deleteTask(taskId: string): any {
    const task = this.getTaskById(taskId);
    this.tasks = this.tasks.filter((item) => item.id !== task.id);
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
