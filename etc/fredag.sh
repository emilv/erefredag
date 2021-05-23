#!/bin/bash
set -e
TZ="Europe/Stockholm"
cd /home/emil/fredag/
if [ $(date +%u) -eq 5 ]; then
    echo "Set Friday to yes"
    cp yes.html index.html
else
    echo "Set Friday to nepp"
    cp nepp.html index.html
fi
