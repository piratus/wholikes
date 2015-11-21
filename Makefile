DIST_DIR ?= static/dist
PYTHON_ENV ?= env
NODE_ENV ?= development
WEBPACK_OPTIONS ?= --progress --colors

PIP = $(PYTHON_ENV)/bin/pip
PYTHON = $(PYTHON_ENV)/bin/python
NODE = $(shell npm bin)

CURL ?= curl --silent --show-error --fail
OPEN_BROWSER ?= open -a 'Google Chrome'
FONTELLO_DIR ?= ./static/styles/fontello
FONTELLO_HOST ?= http://fontello.com


.PHONY: build clean install watch devserver static fontopen fontsave

build: install static

static:
	npm run-script build

clean:
	rm -rf node_modules

env: requirements.txt
	test -d $(PYTHON_ENV) || python3 -m venv $(PYTHON_ENV)
	$(PIP) install -r $<

node_modules: package.json
	npm install

install: env node_modules

devserver:
	$(PYTHON) website.py

watch:
	npm start

fontopen:
	${CURL} --output .fontello --form "config=@${FONTELLO_DIR}/config.json" ${FONTELLO_HOST}
	${OPEN_BROWSER} ${FONTELLO_HOST}/`cat .fontello`


fontsave:
	@if test ! -e .fontello ; then echo 'Run `make fontopen` first.' >&2 ; exit 128 ; fi
	rm -rf .fontello.src .fontello.zip
	${CURL} --output .fontello.zip ${FONTELLO_HOST}/`cat .fontello`/get
	unzip .fontello.zip -d .fontello.src
	rm -rf ${FONTELLO_DIR}
	mv `find ./.fontello.src -maxdepth 1 -name 'fontello-*'` ${FONTELLO_DIR}
	rm -rf .fontello.src .fontello.zip

	mv ${FONTELLO_DIR}/font/icons.woff ${FONTELLO_DIR}/icons.woff
	sass-convert ${FONTELLO_DIR}/css/icons-codes.css ${FONTELLO_DIR}/icons-codes.sass

	rm -rf ${FONTELLO_DIR}/css
	rm -rf ${FONTELLO_DIR}/font
	rm ${FONTELLO_DIR}/*.txt
	rm ${FONTELLO_DIR}/*.html
