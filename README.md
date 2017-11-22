# a2b

The live version of this is hosted here: [a2b.space](https://a2b.space/).

This website was an attempt to create a travel service which would help people find buses, ferries, trains and other ways of transportation all over Asia.

While working on it we failed to find any kind of financing (or interested users for that matter) and decided to stop working on the project. I was developing the frontend part of the service, and since it was in a pretty good working condition, I decided to clean it up and host it as a part of my portfolio.

It is developed using [Ember.js](https://www.emberjs.com/) framework and [Bootstrap 4](https://v4-alpha.getbootstrap.com/) as a HTML/CSS framework. Everything is hosted on Firebase.

This is just a frontend single page application. Originally backend API was developed by another human, but he since took it down, so at the moment it is using [Ember Mirage](http://www.ember-cli-mirage.com/) to mock a backend API.

The following are instructions for setting up the project for development.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* `cd a2b`
* `npm install`
* `bower install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

To deploy, build the project with production environment and deploy the `dist/` directory. For instance, for firebase:

* install [firebase](https://firebase.google.com/)
* setup the project in your directory (edit `.firebaserc` file)
* run `firebase deploy` to deploy the app

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

