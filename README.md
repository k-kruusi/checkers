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

For the game state, I used a reducer model and stored all the actions on it. If we were to host this or enable multiplayer, we could sync the game state between clients by storing the transformations and players' paths. There's no need to store the entire state object; it can be deduced from the initial state and the application of all the transformations. Most games run with fewer than 80 actions. 

One of the trickiest parts was using baked in react CSS. I'm accustomed to using styled components or Tailwind, and while this didn't cause any issues, it broke my own rules for theming the buttons. I can explain more about this if there's interest.

I used synthetic drag-and-drop events for tile movement, which allowed me to reduce the number of props passed around, since you can pass data with both drag and drop events. Initially, I found this very cool as it greatly reduced complexity. However, during testing, I discovered that it wasn't well supported by touch events in a way I liked, so I had to code separate controls for mobile. Given more time, I think I could improve the mobile controls.

The most interesting part for me was the logic to deduce possible moves—chaining jumps, or having a user perform one of the jumps and miss the larger chain, thereby ending their turn or not. I considered integrating a request to ChatGPT to have it play, but the end result of my simple random-based player actually turned out pretty well and allowed me to write some interesting code. 

Thank you for your consideration.

Best regards,
Kevin


