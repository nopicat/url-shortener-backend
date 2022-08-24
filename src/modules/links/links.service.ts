import { Injectable } from '@nestjs/common';
import { InjectRedis, Redis } from '@svtslv/nestjs-ioredis';

@Injectable()
export class LinksService {
    constructor(
        @InjectRedis()
        private readonly redis: Redis,
    ) {}

    private readonly symbols =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    public generateRandomLink(length: number = 7) {
        let result = '';

        for (let i = 0; i < length; i++) {
            result += this.symbols.charAt(
                Math.floor(Math.random() * this.symbols.length),
            );
        }

        return result;
    }

    public async generateUniqueLink(): Promise<string> {
        const generatedLink = this.generateRandomLink();

        const linkInDatabase = await this.getOriginalUrl(
            generatedLink,
        );

        return !linkInDatabase
            ? generatedLink
            : await this.generateUniqueLink();
    }

    public getOriginalUrl(shortUrl: string) {
        return this.redis.get(`URL:${shortUrl}`);
    }

    public setOriginalUrl(shortUrl: string, originalUrl: string) {
        return this.redis.set(`URL:${shortUrl}`, originalUrl);
    }
}
