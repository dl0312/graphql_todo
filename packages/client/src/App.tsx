import React from "react";
import "react-perfect-scrollbar/dist/css/styles.css";
import "bootstrap/scss/bootstrap.scss";
import "font-awesome/scss/font-awesome.scss";
import "./App.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import TaskItem from "./components/TaskItem";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { ITask } from "./interface";
import { GET_TASKS } from "./gql";

export default function App() {
  const { loading, error, data } = useQuery<{ tasks: ITask[] }>(GET_TASKS);
  if (loading) return <div>loading</div>;
  if (error) return <div>error</div>;
  if (data) {
    const { tasks } = data;
    return (
      <div className="row d-flex justify-content-center container">
        <div className="col-md-8">
          <div className="card-hover-shadow-2x mb-3 card">
            <div className="card-header-tab card-header">
              <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                <i className="fa fa-tasks" />
                &nbsp;Task Lists
              </div>
            </div>
            <div className="scroll-area-sm">
              <PerfectScrollbar className="ps-show-limits">
                <div style={{ position: "static" }} className="ps ps--active-y">
                  <div className="ps-content">
                    <ul className="list-group list-group-flush">
                      {tasks &&
                        tasks.map((task) => (
                          <TaskItem key={task.id} task={task} />
                        ))}
                    </ul>
                  </div>
                </div>
              </PerfectScrollbar>
            </div>
            <div className="d-block text-right card-footer">
              <button className="mr-2 btn btn-link btn-sm">Cancel</button>
              <button className="btn btn-primary">Add Task</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <div>error</div>;
}
