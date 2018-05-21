#!/bin/bash

set -e

function main {
    clean
    build_site
}

function clean {
    echo "cleaning _site folder"
    if [ -d "_site" ]; then rm -Rf _site; fi
}

function build_site {
    echo "building site"
    yarn run webpack
    bundle exec jekyll build
}

main
