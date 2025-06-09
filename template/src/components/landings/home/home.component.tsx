import { html } from "hono/html";
import type { FC } from "hono/jsx";

export const HOME_TITLE = "Home";

export const Home: FC<unknown> = () => {
	return (
		<div class="container mx-auto px-4 py-8 flex flex-col gap-4">
			<div class="text-center">
				<h1 class="text-4xl font-bold text-gray-800 mb-4">
					Welcome to Our App
				</h1>
				<p class="text-lg text-gray-600 mb-4">
					Get started with our amazing features
				</p>
			</div>
			{html`
      <div class="flex justify-center">
        <div
          x-data="{
            open: false,
            toggle() {
              if (this.open) {
                return this.close()
              }
              this.$refs.button.focus()
              this.open = true
            },
            close(focusAfter) {
              if (! this.open) return
              this.open = false
              focusAfter && focusAfter.focus()
            }
          }"
          x-on:keydown.escape.prevent.stop="close($refs.button)"
          x-on:focusin.window="! $refs.panel.contains($event.target) && close()"
          x-id="['dropdown-button']"
          class="relative"
        >
          <button
            x-ref="button"
            x-on:click="toggle()"
            :aria-expanded="open"
            :aria-controls="$id('dropdown-button')"
            type="button"
            class="relative flex items-center whitespace-nowrap justify-center gap-2 py-2 rounded-lg shadow-sm bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 hover:border-gray-200 px-4"
          >
            <span>Options</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
              <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
            </svg>
          </button>
          <div
            x-ref="panel"
            x-show="open"
            x-transition.origin.top.left
            x-on:click.outside="close($refs.button)"
            :id="$id('dropdown-button')"
            x-cloak
            class="absolute left-0 min-w-48 rounded-lg shadow-sm mt-2 z-10 origin-top-left bg-white p-1.5 outline-none border border-gray-200"
          >
            <a href="#new" class="px-2 lg:py-1.5 py-2 w-full flex items-center rounded-md transition-colors text-left text-gray-800 hover:bg-gray-50 focus-visible:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              New Task
            </a>
            <a href="#edit" class="px-2 lg:py-1.5 py-2 w-full flex items-center rounded-md transition-colors text-left text-gray-800 hover:bg-gray-50 focus-visible:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              Edit Task
            </a>
            <a href="#delete" class="px-2 lg:py-1.5 py-2 w-full flex items-center rounded-md transition-colors text-left text-gray-800 hover:bg-red-50 hover:text-red-600 focus-visible:bg-red-50 focus-visible:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed">
              Delete Task
            </a>
          </div>
        </div>
      </div>
      `}
			<div class="max-w-md mx-auto" x-data="{ count: 0 }">
				<button
					type="button"
					class="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
					x-on:click="count++"
				>
					Click me: <span x-text="count" />
				</button>
			</div>
			<todo-list value={JSON.stringify([
				{ text: "Learn Hono", done: false },
				{ text: "Build web components", done: true },
				{ text: "Add HTMX integration", done: false }
			])} />
		</div>
	);
};
