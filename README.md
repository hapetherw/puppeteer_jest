# integration tests

this project hold the framework and test suites for the various Stoke applications.

it relies on [jest][1] and [puppeteer][2] (and [jest-puppeteer][3]) as test harness.

## setup

- make sure you have [node.js][4] installed
- navigate to the project root, and execute:
  
      npm i

## run

- to run all tests:
   
      npm run test

- to run a specific file, put its name at the end of the command line (you can use part of the name):
   
      npm run test jobPost

- to launch with a full browser (i.e. not headless), use this:
  
      env STAGE=local npm run test
   
   this is useful while writing tests, or if you want to trace/debug test failures more easily
- if some test was failed you can see the screenshot of failed test under screenshots folder

## dev 
- to add new tests:

       create new folder with name of page you want to create. 
       as list 3 files need to be:
       
       - the tests file
       - utils file 
       - selectors
       
       if you use with shared component for example table pleade use in files under resources/components folder





[1]: https://jestjs.io/docs/en/puppeteer
[2]: https://pptr.dev/
[3]: https://github.com/smooth-code/jest-puppeteer/tree/master/packages/jest-puppeteer
[4]: https://nodejs.org/en/
