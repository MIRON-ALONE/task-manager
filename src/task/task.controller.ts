import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from 'src/shared/auth.guard';
import { Request } from 'express';

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Post()
  create(@Req() request: Request, @Body() createTaskDto: CreateTaskDto) {
    const userId = request.user!.userId;
    return this.taskService.create(createTaskDto, userId);
  }

  @Get()
  findAll(@Req() request: Request) {
    const userId = request.user!.userId;
    return this.taskService.findAll(userId);
  }

  @Get(':id')
  findOne(@Req() request: Request, @Param('id') id: string) {
    const userId = request.user!.userId;
    return this.taskService.findOne(id, userId);
  }

  @Patch(':id')//+
  update(@Req() request: Request, @Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    const userId = request.user!.userId;
    return this.taskService.update(id, updateTaskDto, userId);
  }

  @Delete(':id')
  remove(@Req() request: Request, @Param('id') id: string) {
    const userId = request.user!.userId
    return this.taskService.remove(id, userId);
  }
}
