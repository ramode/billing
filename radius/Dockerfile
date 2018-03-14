FROM alpine

RUN set -xe \
    && apk add --no-cache freeradius \
                          freeradius-postgresql \
                          freeradius-redis \
                          openssl

EXPOSE 1812/udp 1813/udp

CMD ["radiusd", "-fl", "stdout"]
