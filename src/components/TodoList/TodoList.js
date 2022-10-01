import { observer } from 'mobx-react';
import { useState } from 'react';
import store from '../../store/todoStore';
import './TodoList.scss';
import { IoIosAdd } from 'react-icons/io';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const TodoList = observer(() => {
  const [values, setValues] = useState('');

  const handleOnChange = (e) => {
    setValues(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    store.addTodo(values);
    setValues('');
  };

  return (
    <section className="todo">
      <h1 className="todo__title">TODO</h1>
      <form className="todo__form" onSubmit={handleSubmit}>
        <input
          className="todo__input"
          value={values}
          onChange={handleOnChange}
          type="text"
          name="title"
          placeholder="Create a new todo"
          required
        />
        <button className="todo__button" type="submit">
          <IoIosAdd color="white" size={50} />
        </button>
      </form>
      <ul className="todo__list">
        {store.todos.map((item) => {
          return (
            <li className="todo__item" key={item.id}>
              <label className="todo__label">
                <input
                  className="todo__checkbox"
                  id="checkbox"
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => store.completedTodo(item.id)}
                />
                <span className="checkbox__style"></span>
              </label>
              <h3
                className={
                  !item.completed
                    ? 'todo__subtitle'
                    : 'todo__subtitle todo__subtitle-check'
                }
              >
                {item.title}
              </h3>
              <button
                className="todo__removebtn"
                onClick={() => store.remove(item.id)}
              >
                <AiOutlineCloseCircle
                  color="white"
                  fontSize={20}
                  cursor="pointer"
                />
              </button>
            </li>
          );
        })}
      </ul>
      <div className="todo__counter">
        <p className="todo__counter-text">Total: {store.totalTodosCount}</p>
        <p className="todo__counter-text">
          Jobs done: {store.completedTodosCount}
        </p>
      </div>
    </section>
  );
});

export default TodoList;
