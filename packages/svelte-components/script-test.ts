import { preprocess } from 'svelte/compiler';
import autoprocessor from 'svelte-preprocess';
import * as fs from 'fs';

const doStuff = async () => {
  const source = fs.readFileSync(
    `${__dirname}/src/Button/Button.svelte`,
    'utf-8'
  );

  await preprocess(source, autoprocessor(), { filename: 'Button.svelte' })
    .then((item) => {
      console.log('Svelte Code: ', item.code);
      fs.mkdirSync(`${__dirname}/dist/Button/`, {
        recursive: true,
      });
      fs.writeFileSync(`${__dirname}/dist/Button/Button.svelte`, item.code);
    })
    .catch((error) => {
      console.error(error.message);
    });
};

doStuff();
