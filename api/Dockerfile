FROM python:3-alpine
ADD . /code
WORKDIR /code
RUN  apk add --no-cache --virtual .build-deps  \
  bzip2-dev \
  coreutils \
  expat-dev \
  gcc \
  g++ \
  libc-dev \
  libffi-dev \
#  linux-headers \
  make \
#  ncurses-dev \
  openssl \
  openssl-dev \
  pax-utils \
  readline-dev \
  sqlite-dev \
  xz-dev \
  zlib-dev \
  && pip install --no-cache-dir -r requirements.txt \
  && apk del .build-deps
CMD ["python", "billing/server.py"]
