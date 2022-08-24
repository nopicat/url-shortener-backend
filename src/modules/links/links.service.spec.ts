import { Test, TestingModule } from '@nestjs/testing';
import { LinksService } from './links.service';
import { forwardRef } from '@nestjs/common';
import { StatsModule } from '../stats/stats.module';
import { RedisModule } from '@svtslv/nestjs-ioredis';

describe('LinksService', () => {
    let service: LinksService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                RedisModule.forRoot({
                    config: {
                        host: 'redis',
                    },
                }),
                forwardRef(() => StatsModule),
            ],
        }).compile();

        service = module.get<LinksService>(LinksService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
