from aiohttp import web
from aiohttp_session import get_session


async def list(request):
    session = await get_session(request)
    if not (session and 'login' in session.keys() and 'login.read' in session['login']['permission']):
        raise web.HTTPForbidden()

    request.app.logger.info(session['login'])
    con = await request.app['pg'].acquire()
    data = [dict(row) for row in await con.fetch('SELECT login,name,permission from login WHERE login.account_id = $1', session['login']['account_id'])]
    await request.app['pg'].release(con)
    return web.json_response(data)


async def write(request):
    session = await get_session(request)
    request.app.logger.info(session)
    if session and session.get('login') and 'login.write' not in session['login']['permission']:
        raise web.HTTPForbidden()

    con = await request.app['pg'].acquire()
    data = [dict(row) for row in await con.fetch(
        'SELECT login,name,permission from login WHERE login.account_id = $1',
        session['login']['account_id']
            )]
    await request.app['pg'].release(con)
    return web.json_response(data)
