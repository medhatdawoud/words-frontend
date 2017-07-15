import { WordsFrontendPage } from './app.po';

describe('words-frontend App', () => {
  let page: WordsFrontendPage;

  beforeEach(() => {
    page = new WordsFrontendPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
