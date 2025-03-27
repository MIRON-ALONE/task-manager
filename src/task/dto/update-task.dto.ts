// update-task.dto.ts
import { IsString, IsOptional, IsEnum } from 'class-validator';
import { TaskStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
    @IsString()
    @IsOptional()
    @ApiProperty()
    name?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    description?: string;

    @IsEnum(TaskStatus)
    @IsOptional()
    @ApiProperty({ enum: TaskStatus })
    status?: TaskStatus;
}
