import { forwardRef, Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { LinksModule } from '../links/links.module';

@Module({
    imports: [forwardRef(() => LinksModule)],
    providers: [StatsService],
    exports: [StatsService],
})
export class StatsModule {}
