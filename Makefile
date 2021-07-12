.PHONY: all build clean deploy

all: build deploy

build: dist dist/yes.html dist/nepp.html
	rsync -av --exclude index.html src/ dist/
	find dist/ -regex '.*\.\(js\|html\|css\)' -print0 | xargs -0 gzip -9 --keep -f

clean:
	rm -rvf dist/

deploy:
	rsync -avz dist/ erefredag.se:fredag/
	rsync -avz etc/fredag.sh erefredag.se:scripts/
	ssh erefredag.se scripts/fredag.sh

dist:
	mkdir -p $@

dist/yes.html: src/index.html dist
	cat src/index.html | sed 's/SMOL_ANSWER/yes/' | sed 's/BOOL_ANSWER/true/' | sed 's/ANSWER/Yes\!/' > $@

dist/nepp.html: src/index.html dist
	cat src/index.html | sed 's/SMOL_ANSWER/no/' | sed 's/BOOL_ANSWER/false/' | sed 's/ANSWER/Nepp/' > $@

