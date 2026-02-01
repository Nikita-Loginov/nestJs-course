import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";

@Injectable()
export class TaskService {
  private tasks = [
    {
      id: 1,
      title: "Learn nest js",
      isCompleted: false,
    },
    {
      id: 2,
      title: "Learn js",
      isCompleted: true,
    },
  ];

  findAll() {
    return this.tasks;
  }

  findById(id: number) {
    const task = this.tasks.find(task => Number(task.id) === Number(id));

    if (!task) {
      throw new NotFoundException("Нет такой задачи");
    }

    return task;
  }

  create(dto: CreateTaskDto) {
    const { title, priority, tags } = dto;

    const newTask = {
      id: this.tasks.length + 1,
      title,
      priority,
      tags,
      isCompleted: false,
    };

    this.tasks.push(newTask);

    return this.tasks;
  }

  update(id: number, dto: UpdateTaskDto) {
    const task = this.findById(id);

    task.title = dto.title;

    task.isCompleted = dto.isCompleted;

    return task;
  }

  patchUpdateTask(id: number, dto: Partial<UpdateTaskDto>) {
    const task = this.findById(id);

    const safeDto = { ...dto };

    const updatedTask = Object.assign(task, safeDto);

    return updatedTask;
  }

  delete(id: number) {
    const task = this.findById(id);

    this.tasks = this.tasks.filter(task => task.id !== id);

    return true;
  }
}
