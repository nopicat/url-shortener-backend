import { IsUrl } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLinkInputDto {
    @ApiProperty({
        description: 'URL to short',
        example: 'https://example.com',
    })
    @IsUrl()
    @Transform(({ value }) =>
        value.startsWith('http') ? value : 'http://' + value,
    )
    public url: string;
}

export class LinkPublicResponseDto {
    @ApiProperty({
        description: 'Original URL',
        example: 'https://example.com',
    })
    public originalUrl: string;

    @ApiProperty({ description: 'Short URL code', example: 'E5VkRQi' })
    public shortUrl: string;

    @ApiProperty({ description: 'Redirects count', example: 50, type: Number, default: 0 })
    public redirects: number = 0;

    constructor(data: Partial<LinkPublicResponseDto>) {
        Object.assign(this, data);
    }
}
