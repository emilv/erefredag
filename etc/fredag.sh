#!/bin/bash
set -e
TZ="Europe/Stockholm"
cd /home/emil/fredag/
if [ $(date +%u) -eq 5 ]; then
    echo "Set Friday to yes"
    cp yes.html index.html
    cp yes.html.gz index.html.gz
    echo "1" > api
else
    echo "Set Friday to nepp"
    cp nepp.html index.html
    cp nepp.html.gz index.html.gz
    echo "0" > api
fi
