#!/bin/bash

set -e

function main {
    clean
    build_site
    a11y_test
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

function a11y_test {
    echo "testing accessibility"
    jekyll serve & sleep 10
    yarn test-pa11y
}

main
