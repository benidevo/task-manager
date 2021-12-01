import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks-status-enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { TaskRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getAllTasks(filterTaskDto: FilterTaskDto): Promise<Task[]> {
    return this.taskRepository.getTasks(filterTaskDto);
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }

  async deleteTask(taskId: string): Promise<void> {
    const result = await this.taskRepository.delete(taskId);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with id ${taskId} not found`);
    }
  }

  async updateTask(
    taskId: string,
    updateTaskDto: CreateTaskDto,
  ): Promise<Task> {
    const task = await this.getTaskById(taskId);
    const { title, description } = updateTaskDto;
    task.title = title;
    task.description = description;
    await this.taskRepository.save(task);
    return task;
  }

  async updateTaskStatus(taskId: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(taskId);
    task.status = status;
    await this.taskRepository.save(task);
    return task;
  }
}
