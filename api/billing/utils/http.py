from aiohttp import web


async def cors_handler(request):
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type',
        'Access-Control-Max-Age': '86400',
        'Content-Type': 'text/plain charset=UTF-8',
        'Content-Length': '0'
    }
    return web.Response(status=204, headers=headers)
