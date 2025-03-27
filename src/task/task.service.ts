import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma/prisma.service';
import { TaskStatus } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) { }

  create(createTaskDto: CreateTaskDto, userId: string) {
    return this.prisma.task.create({ data: { ...createTaskDto, userId } });
  }

  findAll(userId: string) {
    return this.prisma.task.findMany({ where: { userId } });
  }

  async findOne(id: string, userId: string) {
    const task = await this.prisma.task.findUniqueOrThrow({ where: { id } });

    if (task.userId !== userId) {
      throw new UnauthorizedException('Unauthorized to access this task');
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto, userId: string) {
    // Find task by id
    const task = await this.prisma.task.findUnique({ where: { id } });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (task.userId !== userId) {
      throw new UnauthorizedException('Unauthorized to update this task');
    }

    // Update task
    const updatedTask = await this.prisma.task.update({
      where: { id },
      data: {
        ...updateTaskDto, // Only fields present in DTO will be updated
        updatedAt: new Date(),
      },
    });

    return updatedTask;
  }

  async remove(id: string, userId: string) {
    // Find task by id
    const task = await this.prisma.task.findUnique({ where: { id } });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (task.userId !== userId) {
      throw new UnauthorizedException('Unauthorized to remove this task');
    }

    // Delete task
    await this.prisma.task.delete({ where: { id } });

    return { message: 'Task deleted successfully' };
  }
}
