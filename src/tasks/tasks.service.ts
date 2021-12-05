import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TaskStatus } from './tasks-status-enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { TaskRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getAllTasks(filterTaskDto: FilterTaskDto, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(filterTaskDto, user);
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const found = await this.taskRepository.findOne({ where: { id, user } });
    if (!found) {
      throw new UnauthorizedException();
    }
    return found;
  }

  async deleteTask(taskId: string, user: User): Promise<void> {
    const task = await this.getTaskById(taskId, user);
    await this.taskRepository.remove(task);
  }

  async updateTask(
    taskId: string,
    updateTaskDto: CreateTaskDto,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(taskId, user);
    const { title, description } = updateTaskDto;
    task.title = title;
    task.description = description;
    await this.taskRepository.save(task);
    return task;
  }

  async updateTaskStatus(
    taskId: string,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(taskId, user);
    task.status = status;
    await this.taskRepository.save(task);
    return task;
  }
}
