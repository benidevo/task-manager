import { Controller, Get } from '@nestjs/common';
import { Task } from './tasks.models';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get('/')
  getAllTasks(): Task[] {
    return this.taskService.getAllTasks();
  }
}
