import { Injectable } from '@nestjs/common';
import { InjectRedis, Redis } from '@svtslv/nestjs-ioredis';

@Injectable()
export class StatsService {
    constructor(
        @InjectRedis()
        private readonly redis: Redis,
    ) {}

    public incrementRedirects(shortLink: string) {
        return this.redis.incr(`REDIRECTS:${shortLink}`);
    }

    public getRedirects(shortLink: string) {
        return this.redis.get(`REDIRECTS:${shortLink}`).then(Number);
    }
}
