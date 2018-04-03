// Algorithms to perform searches, filters, etc.

import { ACTIONS, SUPPLIES } from "./Data";

/*
  Given some drink recipes and a list of available supplies, return all drink recipes
  that can be made with the supplies.
  Note that some drinks may require multiple of the same supply, and that the input
  array may have multiple of the same supply, indicating the available quantity.

  Parameter format:
  - drinks: array of drink objects:
      {
        name: drink name,
        steps: array of steps (strings) which come from either ACTIONS or SUPPLIES
      }
  - supplies: array of strings which come from SUPPLIES

  Return format:
  - array of drink objects whose recipes can be made with the supplies
*/
export function whatCanIMake(drinks, supplies) {
  let resultList = new Set();

  let supplyMap = constructMap(supplies); //hashmap for supplies

  for (let drink of drinks) {
    let drinkMap = constructMap(drink.steps);
    let match = true;
    drinkMap.forEach(function(value, key) {
      if (supplyMap.has(key) && supplyMap.get(key) >= drinkMap.get(key)) {
      } else match = false;
    });
    if (match === true) {
      resultList.add(drink);
    }
  }
  return Array.from(resultList);
}

/*
  Given some drink recipes and a given recipe, return any drink whose recipe matches
  the given recipe.

  Parameter format:
  - drinks: array of drink objects:
      {
        name: drink name,
        steps: array of steps (strings) which come from either ACTIONS or SUPPLIES
      }
  - recipe: array of strings of steps which come from either ACTIONS or SUPPLIES

  Return format:
  - array of drink objects whose recipes can be made with the supplies
*/
export function searchDrinks(drinks, recipe) {
  let resultList = new Set();
  let actionSet = new Set(ACTIONS);
  let diffMap = new Map();

  for (let drink of drinks) {
    if (drink.steps.length !== recipe.length);
    else {
      let targetFound = true;
      for (let i = 0; i < drink.steps.length; i += 1) {
        if (actionSet.has(drink.steps[i])) {
          //action as boundary
          if (diffMap.size !== 0) {
            targetFound = false;
            break;
          }
          if (recipe[i] !== drink.steps[i]) {
            //actions must be at same position
            targetFound = false;
            break;
          }
        } else {
          if (diffMap.has(drink.steps[i])) {
            //add item from drink
            if (diffMap.get(drink.steps[i]) === -1) {
              diffMap.delete(drink.steps[i]);
            } else {
              diffMap.set(drink.steps[i], diffMap.get(drink.steps[i]) + 1);
            }
          } else {
            diffMap.set(drink.steps[i], 1);
          }

          if (diffMap.has(recipe[i])) {
            //reduce item from recipe
            if (diffMap.get(recipe[i]) === 1) {
              diffMap.delete(recipe[i]);
            } else {
              diffMap.set(recipe[i], diffMap.get(recipe[i]) - 1);
            }
          } else {
            diffMap.set(recipe[i], -1);
          }
        }
      }
      if (diffMap.size !== 0) {
        targetFound = false;
        break;
      }
      if (targetFound) {
        resultList.add(drink);
      }
    }
  }
  return Array.from(resultList);
}

function constructMap(supplies) {
  let supplyMap = new Map();
  let actionSet = new Set(ACTIONS);
  supplies.forEach(function(supply) {
    if (!actionSet.has(supply)) {
      if (supplyMap.has(supply)) {
        supplyMap.set(supply, supplyMap.get(supply) + 1);
      } else {
        supplyMap.set(supply, 1);
      }
    }
  });
  return supplyMap;
}
