from aiohttp import web
from aiohttp_session import get_session

async def login(request):
    DATA = await request.json()

    con = await request.app['pg'].acquire()
    user = await con.fetchrow('SELECT deleted,account,account_id,login,permission,permission_mask,login.name from login,account WHERE login.login = $1 and login.password = $2', DATA['login'], DATA['password'])

    await request.app['pg'].release(con)

    if user and not user['deleted']:
        data = dict(user)
        session = await get_session(request)
        session['login'] = data
        session.changed()
        return web.json_response(data)
    else:
        raise web.HTTPForbidden()


async def logout(request):
    session = await get_session(request)
    session.invalidate()
    return web.json_response(True)


async def refresh(request):
    session = await get_session(request)
    if session.new or not session.get('login'):
        raise web.HTTPForbidden()
    request.app.logger.info(session)
    data = session.get('login')

    request.app.logger.info(data)

    return web.json_response(data)


