import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { StatsService } from '../stats/stats.service';
import { LinksService } from './links.service';
import { CreateLinkInputDto, LinkPublicResponseDto } from './links.dto';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Links')
@Controller('links')
export class LinksController {
    constructor(
        private readonly statsService: StatsService,
        private readonly linksService: LinksService,
    ) {}

    @ApiCreatedResponse({
        description: 'The link has been successfully shorted.',
        type: LinkPublicResponseDto,
    })
    @Post('create')
    public async createLink(@Body() body: CreateLinkInputDto) {
        const shortUrl = await this.linksService.generateUniqueLink();

        await this.linksService.setOriginalUrl(shortUrl, body.url);

        return new LinkPublicResponseDto({
            originalUrl: body.url,
            shortUrl,
        });
    }

    @ApiResponse({ type: LinkPublicResponseDto })
    @Get(':shortUrl')
    public async getLink(@Param('shortUrl') shortUrl: string) {
        const originalUrl = await this.linksService.getOriginalUrl(shortUrl);

        if (!originalUrl) {
            throw new NotFoundException();
        }

        const redirects = await this.statsService.getRedirects(shortUrl);

        return new LinkPublicResponseDto({
            originalUrl,
            shortUrl,
            redirects,
        });
    }
}
