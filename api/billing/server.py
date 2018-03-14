from setup_loop import loop
import aioredis
import aiohttp_session
import aiohttp_session.redis_storage
import asyncpg

import urls
from aiohttp import web

import logging

logging.basicConfig(format='%(asctime)s %(processName)s\%(name)-8s %(levelname)s: %(message)s', level=logging.INFO)


async def app_factory():
    redis = await aioredis.create_pool(('redis', 6379))
    storage = aiohttp_session.redis_storage.RedisStorage(redis)

    async def dispose_redis_pool(app):
        redis.close()
        await redis.wait_closed()

    app = web.Application(logger=logging.getLogger('http'))
    app['pg'] = await asyncpg.create_pool(database='billing', user='postgres', host='postgres')

    async def dispose_postgres(app):
        await app['pg'].close()

    app.middlewares.append(aiohttp_session.session_middleware(storage))
    app.on_cleanup.append(dispose_redis_pool)
    app.on_cleanup.append(dispose_postgres)

    urls.setup(app)
    return app


app = loop.run_until_complete(app_factory())

web.run_app(app)
