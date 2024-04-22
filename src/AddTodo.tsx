import React, { useState } from 'react';

interface Props {
  onAddTodo: (text: string) => void;
}

const AddTodo = ({ onAddTodo }: Props) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 새로고침 방지
    if (text.trim() === '') {
      alert('메모를 입력해주세요');
      return; // 입력된 텍스트가 없으면 여기서 함수 실행을 중단
    }
    onAddTodo(text);
    setText(''); // 입력 필드 초기화
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center mt-5">
      <input type="text" value={text} onChange={e => setText(e.target.value)} className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">Add</button>
    </form>
  );
};

export default AddTodo;