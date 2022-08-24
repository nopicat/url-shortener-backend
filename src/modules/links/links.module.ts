import { forwardRef, Module } from '@nestjs/common';
import { LinksService } from './links.service';
import { LinksController } from './links.controller';
import { StatsModule } from '../stats/stats.module';
import { LinksRedirectController } from './links-redirect.controller';

@Module({
    imports: [forwardRef(() => StatsModule)],
    providers: [LinksService],
    controllers: [LinksController, LinksRedirectController],
    exports: [LinksService],
})
export class LinksModule {}
