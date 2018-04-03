This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).


The goal of this project is to build a simple interface that a coffee shop could use to create
and view drink recipes.

A drink recipe combines actions and ingredients in an ordered list.

Modified by Troy

## Installing a Dependency

The generated project includes React and ReactDOM as dependencies. It also includes a set of scripts used by Create React App as a development dependency. You may install other dependencies (for example, React Router) with `npm`:

```
npm install --save
```


## Available Scripts

In the project directory, you can run:

```
npm start
```
Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


Start your app by running `npm start`, and start debugging in VS Code by pressing `F5` or by clicking the green debug icon. You can now write code, set breakpoints, make changes to the code, and debug your newly modified code—all from your editor.

##Main Function
This app support multiple operation over the recipe of coffee.
You can view the content of existing coffee recipe by clicking on the name of the coffee. Editing is possible if you click 'Edit coffee' after choosing one.
To check what coffee can you make, click on 'What can I make' and choose the ingredient you like to
add. The order of ingredient does not matter.
To search coffee, click on 'Search for drinks' and click on the steps listed. Remember you can only
add ingredient if the previous action is 'Add'.
You can also save your own drink by clicking 'Create New Drink'. Remember if the recipe is identical
 to existing coffee, you won't be able to add it.
