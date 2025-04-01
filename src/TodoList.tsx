import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import AddTodo from "./AddTodo";
import FilterButton from "./FilterButton";

interface Todo {
  id: number;
  text: string;
  completed: boolean; // 완료 상태 추가
  createdAt: Date; // 생성 시간 속성 추가
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const todos = localStorage.getItem("todos");
    console.log("todos", todos);
    if (todos) {
      setTodos(JSON.parse(todos));
    }
  }, []);

  const filteredTodos = todos.filter((todo) => {
    // 필터 조건 적용
    if (filter === "active" && todo.completed) {
      return false;
    } else if (filter === "completed" && !todo.completed) {
      return false;
    }
    // 검색 조건 적용
    return todo.text.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: todos.length + 1,
      text,
      completed: false,
      createdAt: new Date(),
    };
    setTodos([...todos, newTodo]);
    localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    localStorage.setItem(
      "todos",
      JSON.stringify(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      )
    );
  };
  const deleteTodo = (id: number) => {
    const shouldDelete = window.confirm("정말 삭제하시겠습니까?");
    if (shouldDelete) {
      setTodos(todos.filter((todo) => todo.id !== id));
      localStorage.setItem(
        "todos",
        JSON.stringify(todos.filter((todo) => todo.id !== id))
      );
    }
  };
  const updateTodo = (id: number, text: string) => {
    const updatedTodos = todos.map((todo) => (todo.id === id ? { ...todo, text } : todo));
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const toggleSelection = (id: number) => {
    const newSelectedIds = new Set(selectedIds);
    if (newSelectedIds.has(id)) {
      newSelectedIds.delete(id);
    } else {
      newSelectedIds.add(id);
    }
    setSelectedIds(newSelectedIds);
  };
  const deleteSelectedTodos = () => {
    if(selectedIds.size === 0) {
        alert('선택된 항목이 없습니다.')
        return;
    }
    setTodos(todos.filter((todo) => !selectedIds.has(todo.id))); //불변성 유지
    localStorage.setItem(
      "todos",
      JSON.stringify(todos.filter((todo) => !selectedIds.has(todo.id)))
    );
    setSelectedIds(new Set()); // 선택된 항목 초기화
  };

  const handleFilterChange = (
    selectedFilter: "all" | "active" | "completed"
  ) => {
    setFilter(selectedFilter);
  };

  return (
    <div className="container mx-auto mt-10">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search todos..."
        className="input-field-class shadow rounded border p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700 border-gray-300 bg-white"
      />
      <AddTodo onAddTodo={addTodo} />
      <FilterButton onClick={handleFilterChange} />
      <div className="mt-5">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="px-4 py-2">
                <input
                  type="checkbox"
                  checked={filteredTodos.length > 0 && selectedIds.size === filteredTodos.length}
                  onChange={(e) => {
                    if (e.target.checked) {
                      const allIds = filteredTodos.map((todo) => todo.id);
                      setSelectedIds(new Set(allIds));
                    } else {
                      setSelectedIds(new Set());
                    }
                  }}
                />
              </th>
              <th className="px-4 py-2">내용</th>
              <th className="px-4 py-2">날짜</th>
              <th className="px-4 py-2">기능</th>
            </tr>
          </thead>
          <tbody>
            {filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
                updateTodo={updateTodo}
                isSelected={selectedIds.has(todo.id)}
                toggleSelection={toggleSelection}
              />
            ))}
            
          </tbody>
        </table>
        <button
              onClick={deleteSelectedTodos}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Delete Selected
            </button>
      </div>
    </div>
  );
};

export default TodoList;
