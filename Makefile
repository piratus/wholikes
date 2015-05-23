DIST_DIR ?= static/dist
PYTHON_ENV ?= env
NODE_ENV ?= development
WEBPACK_OPTIONS ?= --progress --colors

PIP = $(PYTHON_ENV)/bin/pip
PYTHON = $(PYTHON_ENV)/bin/python
WEBPACK = $(shell npm bin)/webpack $(WEBPACK_OPTIONS)

.PHONY: build clean install watch devserver static

build: install static

static:
	NODE_ENV=production $(WEBPACK) -p

clean:
	rm -rf .sass-cache
	rm -rf $(DIST_DIR)
	rm -rf $(PYTHON_ENV)
	rm -rf node_modules

env: requirements.txt
	rm -rf $(PYTHON_ENV)
	virtualenv $(PYTHON_ENV)
	$(PIP) install -r $<

node_modules: package.json
	npm install

install: env node_modules

devserver: install
	$(PYTHON) website.py

watch:
	$(WEBPACK) --watch --debug

