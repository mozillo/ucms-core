/**
 * Created by tdzl2_000 on 2015-12-18.
 */

const filterMap = {};

export function addFilter(name, filter, priority = 0) {
  const filterList = filterMap[name] = filterMap[name] || {
    list: [],
  };
  filterList.sorted = false;
  filterList.list.push({
    filter,
    priority,
    id: filterList.list.length,
  });
}

export async function applyFilter(name, ...args) {
  const filterList = filterMap[name];
  if (!filterList) {
    return null;
  }

  // sort list by priority (stable sort)
  if (!filterList.sorted) {
    filterList.list.sort((a, b) => {
      if (a.priority !== b.priority) {
        return a.priority - b.priority;
      }
      return a.id < b.id;
    });
    filterList.sorted = true;
  }

  // Invoke filters until got a true value.
  const copy = [...filterList.list];
  let result = null;
  for (let i = 0; i < copy.length; i++) {
    result = copy[i].filter(...args);
    if (typeof(result) === 'object' && typeof(result.then) === 'function') {
      // Wait for async functions.
      result = await result;
    }
    if (result) {
      // return a true value and ignore rest filters.
      return result;
    }
  }
  // return last false value
  return result;
}

export function doAction(name, ...args) {
  return applyFilter(name, ...args)
    .then(value => {
      if (value) {
        throw new Error('One filter of action `' + name + '` return a true value.');
      }
      return value;
    });
}
