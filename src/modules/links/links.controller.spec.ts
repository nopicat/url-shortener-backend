import { Test, TestingModule } from '@nestjs/testing';
import { LinksController } from './links.controller';
import { forwardRef } from '@nestjs/common';
import { StatsModule } from '../stats/stats.module';
import { LinksService } from './links.service';
import { LinksRedirectController } from './links-redirect.controller';
import { RedisModule } from '@svtslv/nestjs-ioredis';

describe('LinksController', () => {
    let controller: LinksController;

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
            providers: [LinksService],
            controllers: [LinksController, LinksRedirectController],
        }).compile();

        controller = module.get<LinksController>(LinksController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
