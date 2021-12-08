import express from 'express';

import Handlebars from 'handlebars';

import tpl from './templates/test.hbs';

export const app = express();
export const port = parseInt(process.env.PORT || '') || 3000;

app.get('/', (req, res) => {
  const data: any = {
    time: Date.now()    
  };

  const view = Handlebars.template(tpl);

  res.send(view({
    data
  }));
});
