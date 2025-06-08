import { Fragment, type FC } from "hono/jsx";

export const HOME_TITLE = "Home";

export const Home: FC = () => {
  return (
    <Fragment>
      <div className="navbar bg-gray-300 shadow-md">
        <div class="flex-1">
          <a class="btn btn-ghost text-xl">yes</a>
        </div>
        <div class="flex-none">
          <ul class="menu menu-horizontal px-1">
            <li>
              <a>Link this is ok</a>
            </li>
            <li>
              <details>
                <summary>Parent and works as expected</summary>
                <ul class="bg-base-100 rounded-t-none p-2">
                  <li>
                    <a>Link 2</a>
                  </li>
                  <li>
                    <a>hey hello</a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
      <div x-data="{ count: 0 }">
        <button
          class="btn bg-blue-500 rounded-md text-white p-[39px]"
          x-on:click="count++"
        >
          Increment: <span x-text="count"></span>
        </button>
      </div>
    </Fragment>
  );
};
