import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { increment, decrement } from "../redux/counterSlice";

function ReduxCounter() {
  const count = useSelector(
    (state: RootState) => state.counter.value
  );

  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <h2>Redux Counter</h2>

      <p>Count: {count}</p>

      <button onClick={() => dispatch(increment())}>
        Increment
      </button>

      <button onClick={() => dispatch(decrement())}>
        Decrement
      </button>
    </div>
  );
}

export default ReduxCounter;
