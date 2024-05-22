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

I built the entire project using vanilla React with TypeScript as a challenge. The only package I added was for snapshot testing. 

For the game state, I used a reducer pattern with a model that stores the transformations (actions) acted on it. If we were to host this or enable multiplayer, we could sync the game state between clients with these transformations. There's no need to store the entire state object; it can be deduced from the initial state and the application of the transformations. Most games complete with fewer than 80 actions which gives a rough state size in the low kilobyte range. I used the `| null` instead of optional properties in the schema as its clearer intent when a property is expected to be null most of the time, additionally this means no undefined values to worry about.

One of the trickiest parts was using baked in react CSS. I'm accustomed to using styled components or Tailwind, and while this didn't cause any issues, it broke my own rules for theming the buttons. I can explain more about this if there's interest.

I used synthetic drag-and-drop events for tile movement, which allowed me to reduce the number of props passed around, since you can pass data with both drag and drop events. Initially, I found this very cool as it greatly reduced complexity. However, during testing, I discovered that it wasn't well supported by touch events on mobile; I added some quick mobile support but I would probably spend more time refining the controls if this was more then just a showcase.

The most interesting part for me was the logic to deduce possible moves—chaining jumps, or having a user perform one of the jumps and miss the larger chain, thereby not ending their turn. I considered integrating a request to ChatGPT pass it some representation and have it play, but I am quite happy with how the computer opponent turned out.

Testing wise, theres tests for all the utility functions; and the moveAction. Snapshot tests for most of the UI components but not all. I tested with Edge, Firefox, and Chrome. No Safari, Im on a PC right now; but im used to working on mac. Locally tested a build version.

Best regards,
Kevin


