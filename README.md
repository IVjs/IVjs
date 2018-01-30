# IVjs

We can tweak the settings for building and such later. For now, the app.ts file
is for experimentation and anything in the "lib" directory is what we will
eventually package.

The IV class is basically a container/namespace. Use my example of how to add to it.
It is unlikely we will ever want any instance methods on that class. All static there.
But other chainable classes can be instantiated on it and be stored in that state
container.

## Fetch dependencies
```
npm install
```

## Run webpack
```
npm run build
```

## Start http-server
```
npm start
```
