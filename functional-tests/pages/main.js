'use strict';

const { BasePage } = require('kakunin');

class MainPage extends BasePage {
  constructor() {
    super();

    this.url = '/';

    this.formLink = $('a[href="/form/simple"]');
    this.tabularDataLink = $('a[href="/tabular-data"]');
  }
}

module.exports = new MainPage();
