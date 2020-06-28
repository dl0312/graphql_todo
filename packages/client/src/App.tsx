import React from "react";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import TaskItem from "./components/TaskItem";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { ITask } from "./interface";
import TaskQuery from "./queries/taskQuery";
import { List, Popconfirm, Button } from "antd";
import styled from "styled-components";
import InputTask from "./components/InputTask";
import { ClearOutlined } from "@ant-design/icons";

const Container = styled.div`
  display: grid;
  max-height: 100vh;
  display: grid;
  grid-template-rows: 1.5fr 17fr 1fr 1fr;
  grid-template-areas:
    "title"
    "tasks"
    "clear"
    "input";
  header {
    grid-area: header;
  }
  main {
    grid-area: main;
  }
  aside {
    grid-area: aside;
  }
  footer {
    grid-area: footer;
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  font-weight: bolder;
  font-size: 1.2rem;
  margin: 0.5rem 1rem;
  grid-area: title;
`;

export default function App() {
  const [deleteAllTasks] = useMutation(TaskQuery.DELETE_ALL_TASKS, {
    update(cache, { data: { deleteAllTasks } }) {
      const data = cache.readQuery<{ tasks: ITask[] }>({
        query: TaskQuery.GET_TASKS,
      });
      if (data) {
        if (deleteAllTasks) {
          const { tasks: prevTasks } = data;
          cache.writeQuery({
            query: TaskQuery.GET_TASKS,
            data: {
              tasks: [],
            },
          });
        }
      } else {
      }
    },
  });
  const { loading, error, data } = useQuery<{ tasks: ITask[] }>(
    TaskQuery.GET_TASKS
  );
  if (loading) return <div>loading</div>;
  if (error) return <div>error</div>;

  const handleOnClickDeleteButton = async (
    e: React.MouseEvent<HTMLElement, MouseEvent> | undefined
  ) => {
    const data = await deleteAllTasks();
    console.log(data);
  };

  if (data) {
    const { tasks } = data;
    return (
      <Container>
        <Title>GraphQL To Do</Title>
        <List
          bordered
          dataSource={tasks}
          renderItem={(task: ITask) => <TaskItem key={task.id} task={task} />}
          style={{
            gridArea: "tasks",
            overflow: "scroll",
          }}
        ></List>
        <Popconfirm
          title="Are you sure delete all tasks?"
          onConfirm={handleOnClickDeleteButton}
          onCancel={() => {}}
          okText="Yes"
          cancelText="No"
        >
          <Button
            type="primary"
            danger
            icon={<ClearOutlined />}
            style={{ gridArea: "clear" }}
          >
            Clear All Tasks
          </Button>
        </Popconfirm>
        <InputTask />
      </Container>
    );
  }
  return <div>error</div>;
}
