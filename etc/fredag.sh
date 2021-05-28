#!/bin/bash
set -e
TZ="Europe/Stockholm"
cd /home/emil/fredag/
if [ $(date +%u) -eq 5 ]; then
    echo "Set Friday to yes"
    cp yes.html index.html
    cp yes.html.gz index.html.gz
else
    echo "Set Friday to nepp"
    cp nepp.html.gz index.html.gz
fi
