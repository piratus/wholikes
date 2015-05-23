DIST_DIR ?= static/dist
PYTHON_ENV ?= env
WEBPACK_OPTIONS ?= --progress

PIP = $(PYTHON_ENV)/bin/pip
PYTHON = $(PYTHON_ENV)/bin/python
WEBPACK = $(shell npm bin)/webpack $(WEBPACK_OPTIONS)
SASS = sass -I static/styles

.PHONY: build clean install watch devserver $(DIST_DIR)/app.bundle.js

build: install $(DIST_DIR)/app.bundle.js $(DIST_DIR)/app.css

$(DIST_DIR)/%.css: static/styles/%.sass
	$(SASS) --sourcemap=none --style=compressed $<:$@

$(DIST_DIR)/app.bundle.js:
	$(WEBPACK) -p

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
	$(WEBPACK) --watch & $(SASS) --watch static/styles/app.sass:$(DIST_DIR)/app.css

