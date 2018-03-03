#! /bin/bash

set -e

DEPLOY_REPO="https://${DEPLOY_BLOG_TOKEN}@github.com/NerdsvilleCEO/newhavenio.github.io.git"

function main {
	  clean
	  get_current_site
	  build_site
    deploy
}

function clean {
	  echo "cleaning _site folder"
	  if [ -d "_site" ]; then rm -Rf _site; fi
}

function get_current_site {
	  echo "getting latest site"
	  git clone -b gh-pages --depth 1 $DEPLOY_REPO _site || true
}

function build_site {
	  echo "building site"
    npm run build
	  bundle exec jekyll build
}

function deploy {
	  echo "deploying changes"

	  if [ -z "$TRAVIS_PULL_REQUEST" ]; then
	      echo "except don't publish site for pull requests"
	      exit 0
	  fi

	  if [ "$TRAVIS_BRANCH" != "master" ]; then
	      echo "except we should only publish the master branch. stopping here"
	      exit 0
	  fi

	  git config --global user.name "Travis CI"
    git config --global user.email travis@newhaven.io
	  cd _site
	  git add -A
	  git status
	  git commit -m "Latest site built on successful travis build $TRAVIS_BUILD_NUMBER auto-pushed to github"
	  git push $DEPLOY_REPO gh-pages
}


main
