.PHONY: all build deploy

all: build deploy

build: dist dist/yes.html dist/nepp.html
	rsync -av --exclude index.html src/ dist/

deploy:
	rsync -avz dist/ erefredag.se:fredag/
	rsync -avz etc/fredag.sh erefredag.se:scripts/
	ssh erefredag.se scripts/fredag.sh

dist:
	mkdir -p $@

dist/yes.html: src/index.html dist
	sed 's/ANSWER/Yes\!/' src/index.html > $@

dist/nepp.html: src/index.html dist
	sed 's/ANSWER/Nepp/' src/index.html > $@
