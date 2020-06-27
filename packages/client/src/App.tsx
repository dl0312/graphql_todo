import React from "react";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import TaskItem from "./components/TaskItem";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { ITask } from "./interface";
import TaskQuery from "./queries/taskQuery";
import { List } from "antd";
import styled from "styled-components";
import InputTask from "./components/InputTask";

const Container = styled.div`
  margin: 1rem;
`;

export default function App() {
  const { loading, error, data } = useQuery<{ tasks: ITask[] }>(
    TaskQuery.GET_TASKS
  );
  if (loading) return <div>loading</div>;
  if (error) return <div>error</div>;
  if (data) {
    const { tasks } = data;
    return (
      <Container>
        <InputTask></InputTask>
        <List
          bordered
          dataSource={tasks}
          renderItem={(task: ITask) => <TaskItem key={task.id} task={task} />}
        ></List>
      </Container>
    );
  }
  return <div>error</div>;
}
