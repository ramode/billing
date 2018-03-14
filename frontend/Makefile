dev:
	cd billing; ng build --base-href='/admin/' --watch

prod:
	rm -rf dist/*.gz
	cd billing; ng build -aot --environment prod --prod --vendor-chunk=true --build-optimizer --base-href='/admin/'
	cd dist; gzip -9 --keep ./*


i18n:
	cd billing; ng xi18n --outputPath src/locale --locale en
