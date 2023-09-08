import { DynamicModule, Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
@Global()
@Module({
  imports: [],
  providers: [PrismaService, ConfigService],
  exports: [ConfigService, PrismaService],
})
export class PrismaModule {
  static forTest(prismaClient: PrismaClient): DynamicModule {
    return {
      module: PrismaModule,
      providers: [
        {
          provide: PrismaService,
          useFactory: () => prismaClient as PrismaService,
        },
      ],
    };
  }
}
