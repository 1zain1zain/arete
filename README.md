

#### Description
This is a Typescript app built with Nest, a Node.js framework.


```bash
# To run the tests
$ npm run test
```

```bash
# To run the app
$ npm run start
```
```bash
Use curl to test the endpoint from your cli. 
Or use Postman or Insomnia if you prefer a GUI.

# curl example to GET all 94 probabilities for ks between 6 and 99
> $ curl http://localhost:3000/roll

JSON response example: 
{ data: [p6,...,p99]}   

- - - - - -

# curl example to GET the probability for k=6
> $ curl -H "k:6" http://localhost:3000/roll

JSON response example: 
{ data: [p6]}   
```


```bash
# To build the app
$ npm run build
```

```bash
# To install pnpm, but you can still use npm.
$ npm install -g pnpm
```

#### Dependencies
1. [Nest](https://github.com/nestjs/nest) official repository.
2. [Node.js](https://nodejs.org/en) is required, installation includes npm.
3. [pnpm](https://pnpm.io/installation) is optional, use npm if you prefer.

<p align="left">
  This app is built with Nest. Nest is a progressive Node.js framework.
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="30" alt="Nest Logo" /></a>
</p>
