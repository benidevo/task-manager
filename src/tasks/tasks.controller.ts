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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(@Query() filterTaskDto: FilterTaskDto): Promise<Task[]> {
    return this.taskService.getAllTasks(filterTaskDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') taskId: string): Promise<Task> {
    return this.taskService.getTaskById(taskId);
  }

  @Delete('/:id')
  deleteTask(@Param('id') taskId: string): Promise<void> {
    return this.taskService.deleteTask(taskId);
  }

  @Post('/new')
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }

  @Put('/:id')
  updateTask(
    @Param('id') taskId: string,
    @Body() updateTaskDto: CreateTaskDto,
  ): Promise<Task> {
    return this.taskService.updateTask(taskId, updateTaskDto);
  }

  @Patch('/:id/status')
  async updateTaskStatus(
    @Param('id') taskId: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.taskService.updateTaskStatus(taskId, status);
  }
}
