import { preprocess } from 'svelte/compiler';
import autoprocessor from 'svelte-preprocess';
import * as fs from 'fs';
import path from 'path';
import glob from 'glob';

const doStuff = async () => {
  const srcPath = path.join(__dirname, 'src');
  const distPath = path.join(__dirname, 'dist');

  glob(
    path.join(srcPath, '**/*.{svelte,ts,js}!(stories.ts)'),
    {},
    (error, files) => {
      //handling error
      if (error) {
        return console.log('Unable to scan directory: ' + error);
      }
      //listing all files using forEach
      files.forEach(async (file) => {
        // juryrig to exclude storybook files
        if (file.includes('.stories.ts')) return;
        // Do whatever you want to do with the file
        console.log(file);

        const source = fs.readFileSync(file, 'utf-8');
        if (file.includes('.svelte')) {
          const distFile = file.replace('/src/', '/dist/');
          await preprocess(source, autoprocessor(), {
            filename: path.basename(distFile),
          })
            .then((item) => {
              fs.mkdirSync(path.dirname(distFile), {
                recursive: true,
              });
              fs.writeFileSync(distFile, item.code);
            })
            .catch((error) => {
              console.error(error.message);
            });
        }
      });
    }
  );
};

doStuff();
