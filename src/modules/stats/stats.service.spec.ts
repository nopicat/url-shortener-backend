import { Test, TestingModule } from '@nestjs/testing';
import { StatsService } from './stats.service';
import { forwardRef } from '@nestjs/common';
import { LinksModule } from '../links/links.module';
import { RedisModule } from '@svtslv/nestjs-ioredis';

describe('StatsService', () => {
    let service: StatsService;

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
        }).compile();

        service = module.get<StatsService>(StatsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
