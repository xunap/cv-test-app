This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

--------------------------------------------

# CV Test App #

Assignment for Software Engineer @ Enhancv
This role is expected to work on the Enhancv resume editor, the public-facing website, our new products, sometimes devops and even product-related research. We ship small & quickly to bring value to customers. Impact, rather than lines of code (or efficiency), matters. Have that in mind while working on the assignment (but don’t get sloppy).

We’ve created this sample brief for a feature that analyzes a user's content and also suggests how to improve it (you might have seen it on enhancv.com). We also have screens and guidance.

Use a React-based tech stack to implement the small app. The assignment doesn’t require any backend / persistence logic, nor should it behave like our real app. We do expect your solution to be pixel perfect compared to the screens provided.

Please submit as you’d intend to ship to production. Reach out anytime for questions.


What problem are we solving and why?
Writing content often comes with language mistakes which people miss. Sometimes those mistakes can be the reason to not hear back from a recruiter.

We want to make sure that Enhancv’s users don’t miss the mistakes on their resumes and send a polished document to the recruiter.
User Stories
As an Enhancv user I want to see suggestions on how to write my content better in order to make it sound more professional.
As an Enhancv user I want to be able to ignore some of the suggestions shown which I deem irrelevant.
What do we want to measure
If user viewed a mistake
If a correction was made after viewing a mistake
If a mistake was ignored
[success criteria] additional revenue from feature -- not part of this assignment
Screens / Figma project
https://www.figma.com/file/gn8p13i4itbJsp4BqeFMc8/Enhancv-for-Devs?node-id=0%3A1 
Additional guidance
None of the navbar should be clickable (notifications, user icon). The resume title and save state are static texts as well. We only care about styling here, not about real interactive elements (like one enhancv.com). The only interactive element is the resume and the experience item. However, that doesn’t mean all code should be in one file.

[Editable text fields] 
Text fields in the resume should be editable and the Company description field should support text decoration like bold/underline/italic (no need to implement buttons, just ctrl/cmd+b/i/u). We do not expect any of the save functionality to work.

[Add/remove experience items] 
Focusing a field in Experience item should show a popover with Add/remove buttons. The functionality of these buttons should be implemented (they should remove items or add new one), however we do not expect any of the save functionality to work.

[Content mistakes] 
The content analysis (CA) feature has an endpoint that analyzes the Experience Company Description input and returns a range / position to be highlighted in red (index of the start and the end) and suggestions how to improve this mistake as a string. We do not expect you to integrate the endpoint. Just mock it. Here is an example input and output.

Input in experience’s description: I've done many projects
Output: 

[
  {
    "range": [10,23],
    "message": "This is vague. Instead of “Managed projects for many clients”, say “Managed projects for 10 clients including BlueBank.”"
  },
  {
    "range": [0,23],
    "message": "Include a valuable metric if possible. For example: \"Increased revenue by 20% within one month.\"."
  }
]

By entering “I've done many projects” the whole field should be highlighted in red, because the range of the second mistake is [0, 23].  By hovering over it, the text of the second mistake should be displayed in the popover. Hovering over “many projects” should display the message of the first mistake in the popover. 
