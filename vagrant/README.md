# Vagrant Development Environment

This development environment is designed to allow you to start working quickly and from any OS which can install [Vagrant](https://www.vagrantup.com/) and [VirtualBox](https://www.virtualbox.org/wiki/Downloads).

This box comes packaged with all of the dependencies necessary to build and run a local server. The box will be synced with the repository allowing for the host machine to modify the site files using any editor. Additionally, the box will have port `4000` forwarded so the developer may access the site on the host machine using their favorite browser.

## Quick Start

1. Ensure you have [Vagrant](https://www.vagrantup.com/) and [VirtualBox](https://www.virtualbox.org/wiki/Downloads) installed
2. Clone the repository
3. Navigate to this directory
4. Run `vagrant up`
5. Run `vagrant ssh`
6. `cd newhavenio.github.io`
7. `bundle`
8. `yarn`
9. `jekyll serve --host 0.0.0.0`
10. Open a web browser and visit <http://localhost:4000>

## Halting and Destroying the VM

You can halt the VM by running `vagrant halt`. This will shut it down. The next time you run `vagrant up` any local changes will remain.

You can completely destroy the VM by running `vagrant destroy`. This will remove any local changes you've made to the box.

For more details on using Vagrant, see the [documentation](https://www.vagrantup.com/docs/index.html).

## Dependencies

1. [Vagrant](https://www.vagrantup.com/)
2. [VirtualBox](https://www.virtualbox.org/wiki/Downloads)

## Recommended Vagrant Plugins

### vagrant-notify-forwarder

[vagrant-notify-forwarder](https://github.com/mhallin/vagrant-notify-forwarder): A vagrant plugin that uses notify-forwarder to forward file system events from the host to the guest automatically on all shared folders.

This is useful if your filesystem doesn't automagically forward changes from the host to the guest.

Install by running `vagrant plugin install vagrant-notify-forwarder`

