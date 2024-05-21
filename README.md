# Getting Started with Checkers

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

To run the unit tests.


### Explainations

I tried to build the entire thing with vanilla react with typescript as a bit of a challenge.

I used a reducer model for the game state and stored all the actions on it. If we were to host this or allow for multiplayer, we could sync the game state between clients by storing the transformations and players' paths. There is no need to store the entire state object; it can be deduced from the initial state plus the application of all the transformations. Most games run sub 80 actions.

One of the trickiest parts was just using "standard" CSS. I'm very used to using styled components or Tailwind, and it didn't cause any issues, but it sort of broke my own rules for theming the buttons. I can explain more about this if there's any interest, but essentially, using the CSS hooks for :hover and :active is much easier to control the style of the buttons rather than swapping styles with React based on synthetic events.

The most interesting part of it for me was the logic to deduce possible moves; chaining the jumps, or having a user just do one of the jumps, missing the larger chain; but not ending their turn. I thought about actually hooking up a request to ChatGPT and having it play but the end result of my dumb random based player, actually turned out pretty good; and allowed me to write some interesting code.

Cheers:
  -Kevin


