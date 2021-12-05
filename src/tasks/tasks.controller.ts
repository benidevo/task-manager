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
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
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
  getAllTasks(
    @Query() filterTaskDto: FilterTaskDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.taskService.getAllTasks(filterTaskDto, user);
  }

  @Get('/:id')
  getTaskById(
    @Param('id') taskId: string,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskService.getTaskById(taskId, user);
  }

  @Delete('/:id')
  deleteTask(
    @Param('id') taskId: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.taskService.deleteTask(taskId, user);
  }

  @Post('/new')
  async createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskService.createTask(createTaskDto, user);
  }

  @Put('/:id')
  updateTask(
    @Param('id') taskId: string,
    @Body() updateTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskService.updateTask(taskId, updateTaskDto, user);
  }

  @Patch('/:id/status')
  async updateTaskStatus(
    @Param('id') taskId: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() user: User,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.taskService.updateTaskStatus(taskId, status, user);
  }
}
