/**
 * Created by tdzl2_000 on 2015-12-18.
 */

const filterMap = {};

export function addFilter(name, filter, priorty = 0){
  const filterList = filterMap[name] = filterMap[name] || {
      list: [],
  };
  filterList.sorted = false;
  filterList.list.push({
    filter,
    priorty,
    id: filterList.list.length,
  });
}

export function applyFilter(name, ...args){
  const filterList = filterMap[name];
  if (!filterList){
    return;
  }
  if (!filterList.sorted){
    filterList.list.sort()
  }
}
