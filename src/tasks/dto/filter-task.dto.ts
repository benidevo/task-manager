import { IsEnum, IsString, IsOptional } from 'class-validator';
import { TaskStatus } from '../tasks.models';

export class FilterTaskDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsOptional()
  @IsString()
  search: string;
}
