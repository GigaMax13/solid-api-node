# Solid Architecture for an API made with Nodejs
:octocat: The goals of this project is trying to implement the [SOLID] architecture principles on an API using [Typescript]

---

### :chart_with_upwards_trend: [Typescript]
To implement well the [SOLID] principles we need some language features, so far, [Typescript] is our best approach when working with [Node.js]. As [Khalil Stemmler] writes on the [SOLID Principles]

> Since Interfaces don't exist in JavaScript, which makes all of this a whole lot harder to adhere to.

If you want some article more hands on, I recommended this one [Solid Principles Using Typescript] by [Alejandromarr]

### :file_folder: [Package by Feature]

> - Drawbacks of packaging classes by technical concerns:
>   - Poor overview of all classes that belong to a feature.
>   - Tendency to generic, reused and complex code, which is hard to understand and changes can easily break other use cases as the impact of a change is hard to grasp.
> - Instead, package by feature and create packages that contain all classes that are required for a feature. The benefits are:
>   - Better discoverability and overview
>   - Self-contained and independent
>   - Simpler code
>   - Testability


### :computer: Running Locally

To clone and run this application, you'll need [Git], [Node.js] and a package manager installed on your computer. From your command line:

#### [NPM]
```bash
# Install dependencies
$ npm install

# Run the API
$ npm run dev:start
```
#### [Yarn]
```bash
# Install dependencies
$ yarn install

# Run the API
$ yarn dev:start
```

### :memo: License
This project is under the MIT license. See the [LICENSE] for more information.


[SOLID]: <https://en.wikipedia.org/wiki/SOLID>
[Typescript]: <https://www.typescriptlang.org/>
[Khalil Stemmler]: <https://twitter.com/stemmlerjs>
[SOLID Principles]: <https://khalilstemmler.com/articles/solid-principles/solid-typescript/>
[Solid Principles Using Typescript]: <https://medium.com/@alejandromarr/solid-principles-using-typescript-c475031efcd3>
[Alejandromarr]: <https://medium.com/@alejandromarr>
[Package by Feature]: <https://phauer.com/2020/package-by-feature/>
[Git]: <https://git-scm.com>
[Node.js]: <http://nodejs.org>
[NPM]: <https://www.npmjs.com/get-npm>
[Yarn]: <https://yarnpkg.com/lang/en/>
[LICENSE]: <https://github.com/GigaMax13/solid-api-node/blob/main/LICENSE>
