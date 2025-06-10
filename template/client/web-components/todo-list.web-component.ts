import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";

interface TodoItem {
	text: string;
	done: boolean;
}

@customElement("todo-list")
export class TodoList extends LitElement {
	protected createRenderRoot() {
		return this;
	}

	@property({ type: String })
	value = "";

	@state()
	private todos: TodoItem[] = [];

	connectedCallback() {
		super.connectedCallback();
		this.updateTodos();
	}

	updated(changedProperties: Map<string, unknown>) {
		if (changedProperties.has("value")) {
			this.updateTodos();
		}
	}

	private updateTodos() {
		if (this.value && this.todos.length === 0) {
			try {
				const parsed = JSON.parse(this.value);
				this.todos = Array.isArray(parsed) ? parsed : [];
			} catch {
				this.todos = [];
			}
		}
	}

	@state()
	private newTodo = "";

	private addTodo() {
		const trimmed = this.newTodo.trim();
		if (trimmed) {
			this.todos = [...this.todos, { text: trimmed, done: false }];
			this.newTodo = "";
		}
	}

	private toggleTodo(index: number) {
		const updated = [...this.todos];
		updated[index].done = !updated[index].done;
		this.todos = updated;
	}

	private removeTodo(index: number) {
		this.todos = this.todos.filter((_, i) => i !== index);
	}

	private handleInput(e: Event) {
		const target = e.target as HTMLInputElement;
		this.newTodo = target.value;
	}

	protected render() {
		return html`
      <div class="max-w-md mx-auto bg-white shadow-md rounded-xl p-4">
        <h2 class="text-xl font-bold mb-4">Todo List</h2>
        <div class="flex gap-2 mb-4">
          <input
            type="text"
            class="flex-1 p-2 border rounded"
            placeholder="Add a new task"
            .value=${this.newTodo}
            @input=${this.handleInput}
            @keydown=${(e: KeyboardEvent) => {
							if (e.key === "Enter") this.addTodo();
						}}
          />
          <button
            @click=${this.addTodo}
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        <ul>
          ${this.todos.map(
						(todo, index) => html`
              <li
                class="flex justify-between items-center py-2 border-b last:border-none"
              >
                <label class="flex items-center gap-2">
                  <input
                    type="checkbox"
                    .checked=${todo.done}
                    @change=${() => this.toggleTodo(index)}
                  />
                  <span class=${todo.done ? "line-through text-gray-400" : ""}>
                    ${todo.text}
                  </span>
                </label>
                <button
                  @click=${() => this.removeTodo(index)}
                  class="text-red-500 hover:text-red-700"
                  title="Delete"
                >
                  ✕
                </button>
              </li>
            `,
					)}
        </ul>
      </div>
    `;
	}
}
