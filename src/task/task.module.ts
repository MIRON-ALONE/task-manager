import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [PrismaModule, SharedModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
