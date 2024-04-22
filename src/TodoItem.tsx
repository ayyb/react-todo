import React, { useState, useRef } from "react";

// src/TodoItem.tsx
interface Todo {
  id: number;
  text: string;
  completed: boolean; // 완료 상태 추가
  createdAt: Date; // 생성 시간 속성 추가
}

interface Props {
  todo: Todo;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (id: number, text: string) => void;
  toggleSelection: (id: number) => void;
  isSelected: boolean; // 이 항목이 선택되었는지 여부
}

const TodoItem = ({
  todo,
  toggleTodo,
  deleteTodo,
  updateTodo,
  toggleSelection,
  isSelected,
}: Props) => {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const editInputRef = useRef<HTMLInputElement>(null);

  const formattedDate = new Date(todo.createdAt).toLocaleDateString("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const handleEdit = () => {
    setEditing(true);
    setTimeout(() => {
      editInputRef.current?.focus(); // 포커스를 입력 필드에 설정
    }, 0);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value);
  };

  const handleUpdate = (id: number) => {
    updateTodo(id, editText);
    setEditing(false);
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleUpdate(todo.id);
    }
  };

  return (
    <tr className="border-b border-gray-200">
      <td className="px-4 py-2 text-center">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => toggleSelection(todo.id)}
        />
      </td>
      <td className="px-4 py-2 text-center">
        {editing ? (
          <input
            type="text"
            ref={editInputRef}
            value={editText}
            onChange={handleChange}
            onBlur={() => handleUpdate(todo.id)}
            onKeyDown={handleKeyDown}
            className="w-full"
          />
        ) : (
          <span
            onDoubleClick={handleEdit}
            className={`${todo.completed ? "line-through" : ""}`}
          >
            {todo.text}
          </span>
        )}
      </td>
      <td className="px-4 py-2 text-center">{formattedDate}</td>
      <td className="px-4 py-2 text-center">
        <button
          onClick={() => toggleTodo(todo.id)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
        >
          Toggle
        </button>
        {editing ? (
          <button
            onClick={() => handleUpdate(todo.id)}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded ml-2"
          >
            Save
          </button>
        ) : (
          <button
            onClick={handleEdit}
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded ml-2"
          >
            Edit
          </button>
        )}
        <button
          onClick={() => deleteTodo(todo.id)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TodoItem;
