import auth
from utils.http import cors_handler
import login

def setup(app):
    app.router.add_route('OPTIONS', '/{path:.*}', cors_handler)

    app.router.add_post('/auth/login', auth.login)
    app.router.add_post('/auth/refresh', auth.refresh)
    app.router.add_post('/auth/logout', auth.logout)
    app.router.add_post('/login/list', login.list)
