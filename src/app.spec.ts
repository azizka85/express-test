import request from 'supertest';

import { app } from './app';

import Handlebars from 'handlebars';

import tpl from './templates/test.hbs';

describe('app test', () => {
  test('Request get /', async () => {
    const response = await request(app).get('/');

    expect(response.text).toBeTruthy();
  });

  test('Template test', () => {
    const view = Handlebars.template(tpl);

    const content = view({
      data: {
        time: Date.now()
      }
    });

    expect(tpl).toBeTruthy();
    expect(typeof tpl).toEqual('object');
    expect(content).toBeTruthy();
  });
});
