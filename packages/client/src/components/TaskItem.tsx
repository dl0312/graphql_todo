import * as React from "react";
import { ITask } from "../interface";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { useEffect } from "react";
import { UPDATE_TASK, GET_TASKS } from "../gql";

interface Props {
  task: ITask;
}

export default function TaskItem({
  task: { id, content, done, createdAt },
}: Props) {
  const [updateTask] = useMutation(UPDATE_TASK, {
    update(cache, { data: { updateTask } }) {
      const data = cache.readQuery<{ tasks: ITask[] }>({ query: GET_TASKS });
      if (data) {
        const { tasks: prevTasks } = data;
        console.log(data, updateTask);
        console.log(
          prevTasks.map((task) => {
            if (task.id === id) {
              return updateTask;
            } else {
              return task;
            }
          })
        );
        cache.writeQuery({
          query: GET_TASKS,
          data: {
            tasks: prevTasks.map((task) => {
              if (task.id === id) {
                return updateTask;
              } else {
                return task;
              }
            }),
          },
        });
      } else {
      }
    },
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    console.log(e.target.checked);
    const { checked } = e.target;
    updateTask({ variables: { id, content, done: checked } });
  };

  return (
    <li className="list-group-item">
      <div className={`todo-indicator bg-${id}`} />
      <div className="widget-content p-0">
        <div className="widget-content-wrapper">
          <div className="widget-content-left mr-2">
            <div className="custom-checkbox custom-control">
              <input
                className="custom-control-input"
                id={`exampleCustomCheckbox${id}`}
                type="checkbox"
                checked={done}
                onChange={handleOnChange}
              />
              <label
                className="custom-control-label"
                htmlFor={`exampleCustomCheckbox${id}`}
              >
                &nbsp;
              </label>
            </div>
          </div>
          <div className="widget-content-left">
            <div className="widget-heading">{content}</div>
          </div>
          <div className="widget-content-right">
            <button className="border-0 btn-transition btn btn-outline-success">
              <i className="fa fa-check" />
            </button>
            <button className="border-0 btn-transition btn btn-outline-danger">
              <i className="fa fa-trash" />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
