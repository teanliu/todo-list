import { getTodos, createTodo, patchTodo, deleteTodo } from '../api/todos';
import { Footer, Header, TodoCollection, TodoInput } from 'components';
import { useState, useEffect } from 'react';


const TodoPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const numOfTodos = todos.length;

  const handleChange = (value) => {
    setInputValue(value);
  }
  const handleAddTodo = async () => {
    if (!inputValue.length) return;

    try {
      const data = await createTodo({
        title: inputValue,
        isDone: false,
      });

      setTodos((prevTodos) => {
        return [...prevTodos, {
          id: data.id,
          title: data.title,
          isDone: data.isDone,
          isEdit: false,
        }]
      })
      setInputValue("");
    } catch (e) {
      console.error(e)
    }
  };
  const handleKeyDown = async () => {
    if (!inputValue.length) return;

    try {
      const data = await createTodo({
        title: inputValue,
        isDone: false,
      });

      setTodos((prevTodos) => {
        return [
          ...prevTodos,
          {
            id: data.id,
            title: data.title,
            isDone: data.isDone,
            isEdit: false,
          },
        ];
      });
      setInputValue('');
    } catch (e) {
      console.error(e);
    }
  };
  const handleToggleDone = async (id) => {

    const currentTodo = todos.find((todo) => todo.id === id);
    try {
      await patchTodo({
        id,
        isDone: !currentTodo.isDone,
      });
      setTodos((prevTodos) => {
        return prevTodos.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              isDone: !todo.isDone,
            };
          }
          return todo;
        });
      });
    } catch (e) {
      console.error(e);
    }
  };
  const handleChangeMode = ({ id, isEdit }) => {
    setTodos((prevTodos) => {
      return prevTodos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            isEdit
          };
        }
        return {
          ...todo,
          isEdit: false,
        };
      });
    });
  };
  const handleSave = async ({ id, title }) => {
    
    try {
      await patchTodo({
        id,
        title,
      });
      setTodos(prevTodos => {
        return prevTodos.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              title,
              isEdit: false,
            };
          }
          return todo;
        });
      });
    } catch (e) {
      console.error(e);
    }
  };
  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (e) {
      console.error(e);
    }
    
  };

  useEffect(() => {
    const getTodosAsync = async () => {
      try {
        const todos = await getTodos();
        setTodos(todos.map((todo) => ({
          ...todo,
          isEdit: false
        })))
      } catch (e) {
        console.error(e);
      }
    };
    getTodosAsync();
  }, [])


  return (
    <div>
      TodoPage
      <Header />
      <TodoInput inputValue={inputValue} onChange={handleChange} onAddTodo={handleAddTodo} onKeyDown={handleKeyDown}/>
      <TodoCollection todos={todos} onToggleDone={handleToggleDone} onChangeMode={handleChangeMode} onSave={handleSave} onDelete={handleDelete}/>
      <Footer numOfTodos={numOfTodos}/>
    </div>
  );
};

export default TodoPage;
