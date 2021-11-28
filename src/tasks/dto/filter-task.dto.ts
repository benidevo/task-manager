import { TaskStatus } from '../tasks.models';

export class FilterTaskDto {
  status: TaskStatus;
  search: string;
}
