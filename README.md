## NewHaven.io Jekyll site

New Jekyll site for NewHaven.io, using Bootstrap and Jekyll for more collaboration in development and blog writing.

## Setup Dev Dependencies

```
$ gem install bundler # if not already installed
$ npm -g install yarn
```

## Install Application Dependencies

```
$ bundle
$ yarn
```

## Run Application Server

make sure to build the webpacks bundle.js before serving
```
$ yarn start
```

## Contributing

1. Fork the repo and set up the local dev environment. Please see the above for how to do that.
2. Make a branch off of `develop`.
3. Make your changes. Write tests when appropriate.
4. Make a Pull Request to the upstream develop.

## Deployment

The site is built using travis. Successful builds on the develop branch commit the compiled site in its entirety to master. This is entirely automated. Only one user, @newhaven-io-deploybot can push to master.

## License ##

This program is licensed under the MIT License. Details can be found in `LICENSE.CODE`.
Blog posts (the textual content of files matching the glob `*.md` in the `posts` directory) are licensed under the Creative Commons Attribution 4.0 License. Details can be found in `LICENSE.CONTENT`.
