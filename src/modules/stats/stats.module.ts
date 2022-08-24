import { forwardRef, Module } from '@nestjs/common';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { LinksModule } from '../links/links.module';

@Module({
    imports: [forwardRef(() => LinksModule)],
    controllers: [StatsController],
    providers: [StatsService],
    exports: [StatsService],
})
export class StatsModule {}
