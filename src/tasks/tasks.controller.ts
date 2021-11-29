import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task, TaskStatus } from './tasks.models';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(@Query() filterTask: FilterTaskDto): Task[] {
    if (Object.keys(filterTask).length) {
      return this.taskService.getTasksWithFilters(filterTask);
    } else {
      return this.taskService.getAllTasks();
    }
  }

  @Get('/:id')
  getTaskById(@Param('id') taskId: string): Task {
    return this.taskService.getTaskById(taskId);
  }

  @Delete('/:id')
  deleteTask(@Param('id') taskId: string): void {
    this.taskService.deleteTask(taskId);
  }

  @Post('/new')
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.createTask(createTaskDto);
  }

  @Put('/:id')
  updateTask(
    @Param('id') taskId: string,
    @Body() updateTaskDto: CreateTaskDto,
  ): Task {
    return this.taskService.updateTask(taskId, updateTaskDto);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') taskId: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Task {
    const { status } = updateTaskStatusDto;
    return this.taskService.updateTaskStatus(taskId, status);
  }
}
