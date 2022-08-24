import { Test, TestingModule } from '@nestjs/testing';
import { StatsController } from './stats.controller';
import { forwardRef } from '@nestjs/common';
import { LinksModule } from '../links/links.module';
import { StatsService } from './stats.service';
import { RedisModule } from '@svtslv/nestjs-ioredis';

describe('StatsController', () => {
    let controller: StatsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                RedisModule.forRoot({
                    config: {
                        host: 'redis',
                    },
                }),
                forwardRef(() => LinksModule),
            ],
            controllers: [StatsController],
            providers: [StatsService],
        }).compile();

        controller = module.get<StatsController>(StatsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
