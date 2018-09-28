let state = {
  newOrderCount: 0
}

function onDispatch(action) {
  switch (action.type) {
    case UPDATE_ORDER_NEW_COUNT:
      state.newOrderCount = action.count
      break
    case DECREMENT_ORDER_NEW_COUNT:
      state.newOrderCount -= 1
      break
      // ...
  }
}