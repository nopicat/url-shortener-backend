import { LinkPublicResponseDto } from '../links/links.dto';
import { ApiProperty } from '@nestjs/swagger';

export class StatsPublicResponseDto {
    @ApiProperty({ description: 'Link object', type: LinkPublicResponseDto })
    public link: LinkPublicResponseDto;

    @ApiProperty({ description: 'Redirects count', example: 50, type: Number })
    public redirects: number;

    constructor(data: Partial<StatsPublicResponseDto>) {
        Object.assign(this, data);
    }
}
