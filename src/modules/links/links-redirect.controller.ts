import { ApiTags } from '@nestjs/swagger';
import { All, Controller, NotFoundException, Param, Res } from '@nestjs/common';
import { StatsService } from '../stats/stats.service';
import { LinksService } from './links.service';
import { FastifyReply } from 'fastify';

@ApiTags('Links Redirect')
@Controller('')
export class LinksRedirectController {
    constructor(
        private readonly statsService: StatsService,
        private readonly linksService: LinksService,
    ) {}

    @All(':shortUrl')
    public async redirect(
        @Param('shortUrl') shortUrl: string,
        @Res() res: FastifyReply,
    ) {
        const originalUrl = await this.linksService.getOriginalUrl(
            shortUrl,
        );

        if (!originalUrl) {
            throw new NotFoundException();
        }

        await this.statsService.incrementRedirects(shortUrl);

        res.code(302).redirect(originalUrl);
    }
}
