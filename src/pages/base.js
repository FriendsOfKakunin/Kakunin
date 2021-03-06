import config from '../helpers/config.helper';

class Page {
  constructor() {
    this.isExternal = false;
  }

  visit() {
    if (this.isExternal || config.type === 'otherWeb') {
      return protractor.browser.get(this.url);
    }

    return protractor.browser.setLocation(this.url);
  }

  visitWithParameters(data) {
    let url  = this.url;

    for (const item of data.raw()) {
      url = url.replace(`:${item[0]}`, item[1]);
    }

    if (this.isExternal || config.type === 'otherWeb') {
      return protractor.browser.get(url);
    }

    return protractor.browser.setLocation(url);
  }

  click(element) {
    return this[element].click();
  }

  isDisabled(element) {
    return this[element].getAttribute('disabled').then(function (disabled) {
      return ['disabled', true, 'true'].indexOf(disabled) !== -1;
    });
  }

  isVisible(element) {
    return this[element].isDisplayed();
  }

  isPresent(element) {
    return this[element].isPresent();
  }

  isOn() {
    const self = this;

    return browser.wait(this.waitForUrlChangeTo(self.url), config.waitForPageTimeout * 1000).then(function (resultParameters) {
      return resultParameters;
    });
  }

  waitForUrlChangeTo(newUrl) {
    return () => {
      const self = this;

      return browser.getCurrentUrl().then(function (url) {
        url = self.extractUrl(url);

        const urlSplit = url.split('/');
        const newUrlSplit = newUrl.split('/');
        const resultParameters = {};

        if (urlSplit.length !== newUrlSplit.length) {
          return false;
        }

        for (let i = 0; i < urlSplit.length; i++) {
          const template = newUrlSplit[i];
          const actual = urlSplit[i];

          if (template.startsWith(':')) {
            resultParameters[template.substr(1)] = actual;
          } else if (template !== actual) {
            return false;
          }
        }

        return resultParameters;
      });
    };
  }

  extractUrl(url) {
    let newUrl = url;

    if (newUrl.indexOf('://') > 0) {
      newUrl = newUrl.substr(newUrl.indexOf('://') + 3);
      newUrl = newUrl.substr(newUrl.indexOf('/'));
    }

    return newUrl;
  }

  getNumberOfElements(elementName) {
    return this[elementName].count();
  }

  scrollIntoElement(elementName, elementIndex = undefined) {
    if (elementIndex !== undefined) {
      return browser.executeScript('arguments[0].scrollIntoView(false);', this[elementName].get(elementIndex).getWebElement());
    }

    return browser.executeScript('arguments[0].scrollIntoView(false);', this[elementName].getWebElement());
  }
}

export default Page;
