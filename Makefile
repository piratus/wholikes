DIST_DIR ?= static/dist
VIRTUAL_ENV ?= ~/.virtualenvs/who
NODE_ENV ?= development
WEBPACK_OPTIONS ?= --progress --colors

PIP = $(VIRTUAL_ENV)/bin/pip
PYTHON = $(VIRTUAL_ENV)/bin/python
NODE = $(shell npm bin)


.PHONY: build clean install watch devserver static

build: install static

static:
	npm run-script build

clean:
	rm -rf node_modules

env: requirements.txt
	test -d $(VIRTUAL_ENV) || python3 -m venv $(VIRTUAL_ENV)
	$(PIP) install -r $<

node_modules: package.json
	npm install
	rm -f ./node_modules/react-icons/.babelrc

install: env node_modules

devserver:
	$(PYTHON) website.py

watch:
	npm start
