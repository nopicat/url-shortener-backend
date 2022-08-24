import { Controller, Get, Param } from '@nestjs/common';
import { StatsService } from './stats.service';
import { LinksService } from '../links/links.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { StatsPublicResponseDto } from './stats.dto';
import { LinkPublicResponseDto } from '../links/links.dto';

@ApiTags('Statistics')
@Controller('stats')
export class StatsController {
    constructor(
        private readonly statsService: StatsService,
        private readonly linksService: LinksService,
    ) {}

    @ApiResponse({
        description: 'The link stats provided.',
        type: StatsPublicResponseDto,
    })
    @Get(':shortUrl')
    public async getStats(@Param('shortUrl') shortUrl: string) {
        const originalUrl = await this.linksService.getOriginalUrl(
            shortUrl,
        );

        const redirects = await this.statsService.getRedirects(shortUrl);

        return new StatsPublicResponseDto({
            link: new LinkPublicResponseDto({
                originalUrl,
                shortUrl,
            }),
            redirects,
        });
    }
}
