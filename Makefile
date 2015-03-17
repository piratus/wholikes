.PHONY: build clean install watch

STATIC_OUT_DIR = static/dist

PYTHON_ENV = env/
PIP = $(PYTHON_ENV)bin/pip
PYTHON = $(PYTHON_ENV)bin/python

NPM = node_modules/.bin/
JSPM = $(NPM)jspm
UGLIFY = $(NPM)uglifyjs --screw-ie8 --compress
SASS = sass -I static/styles

build: install $(STATIC_OUT_DIR)/app.min.js $(STATIC_OUT_DIR)/app.css

$(STATIC_OUT_DIR)/%.css: static/styles/%.sass
	$(SASS) --sourcemap=none --style=compressed $<:$@

$(STATIC_OUT_DIR)/app.js:
	$(JSPM) bundle-sfx app $@

$(STATIC_OUT_DIR)/%.min.js: $(STATIC_OUT_DIR)/%.js
	cat static/jspm_packages/babel-polyfill.js > $@
	$(NPM)babel-external-helpers | $(UGLIFY) >> $@
	$(UGLIFY) --stats $< >> $@

clean:
	rm -rf .sass-cache
	rm -rf $(STATIC_OUT_DIR)
	rm -rf $(PYTHON_ENV)
	rm -rf node_modules
	rm -rf static/jspm_packages

env: requirements.txt
	rm -rf $(PYTHON_ENV)
	virtualenv $(PYTHON_ENV)
	$(PIP) install -r $<

node_modules: package.json
	npm install --install-dev

static/jspm_packages: node_modules
	$(JSPM) install

install: env node_modules static/jspm_packages

devserver: install
	$(PYTHON) website.py

watch:
	$(SASS) --watch static/styles/app.sass:$(STATIC_OUT_DIR)/app.css

