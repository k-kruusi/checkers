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

For the game state, I used a reducer pattern with a model that stores the transformations (actions) acted on it. If we were to host this or enable multiplayer, we could sync the game state between clients with these transformations. There's no need to store the entire state object; it can be deduced from the initial state and the application of the transformations. Most games complete with fewer than 80 actions which gives a rough idea of the state size, somewhere in the low kilobyte range. I used the `| null` instead of optional properties in the schema as its clearer intent when a property is expected to be null most of the time, additionally this means no undefined values to worry about.

I would need to add a small bit of additional logic to really support multiplayer if the game was hosted. Just like a separation of responsibility so both clients wouldnt end up sending duplicate events in some cases; (looking at the banner class specifically). 

the core of my logic is broken up in these files:

<CheckersProvider> hoist up the state data, and provides access to the dispatch event for the reduce
<NextMoveInspectorProvider> calculates the potentials moves for tiles you hover over or give it.
<ComputerPlayerProvider>  does the logic of selecting the computers moves
<LayoutSelector> picks the layout to use based on the devices. The layouts themselves are combinations of components, divs and styles.
<GameBoardController /> handles rendering of the board, and tile selection etc.

I enjoyed the algorithm part of this project. The logic to deduce possible moves—chaining jumps, or having a user perform one of the jumps and miss the larger chain, thereby not ending their turn. Then coding the computer player which really is just an extension on the original move highlighting logic. I considered integrating a request to ChatGPT pass it some representation of the board, possible moves and have it pick one, but I am quite happy with how the computer opponent turned out; its not smart by anymeans, but it does a good job.

I used synthetic drag-and-drop events for tile movement, which allowed me to reduce the number of props passed around, since you can pass data with both drag and drop events. Initially. I found this very cool as it greatly reduced complexity. However, during testing, I discovered that it wasn't well supported by touch events on mobile; So I had to add back in some of the complexity i removed for mobile support; I would probably spend more time refining the controls, but I chose some other areas to explore.

One of the more frustrating parts was using plane jane react CSS. I'm accustomed to using styled components or Tailwind, and while this didn't cause any issues, it broke my own rules of thumb for theming the buttons. I can explain more about this if there's interest. It's just a bit of a hassle to inject variables into the css, so I end up writing alot of the css in the class files.

Testing wise, theres tests for all the utility functions; and the moveAction. Snapshot tests for most of the UI components but not all. I tested with Edge, Firefox, and Chrome. No Safari, Im on a PC right now; but im used to working on mac. Locally tested a build version. Mobile support is included as well, portrait and landscape. Tablets there but it could a little work.

Best regards,
Kevin


