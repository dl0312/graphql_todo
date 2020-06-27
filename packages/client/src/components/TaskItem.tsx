import React, { useState } from "react";
import { ITask } from "../interface";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import TaskQuery from "../queries/taskQuery";
import { Checkbox, Button, Space } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import styled from "styled-components";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { List } from "antd";

const Content = styled.div``;

interface Props {
  task: ITask;
}

export default function TaskItem({
  task: { id, content, done, createdAt },
}: Props) {
  const [editable, setEditable] = useState<boolean>(false);
  const [updateTask] = useMutation(TaskQuery.UPDATE_TASK, {
    update(cache, { data: { updateTask } }) {
      const data = cache.readQuery<{ tasks: ITask[] }>({
        query: TaskQuery.GET_TASKS,
      });
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
          query: TaskQuery.GET_TASKS,
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

  const handleOnChange = (e: CheckboxChangeEvent) => {
    console.log(e.target.value);
    console.log(e.target.checked);
    const { checked } = e.target;
    updateTask({ variables: { id, content, done: checked } });
  };

  return (
    <List.Item key={id}>
      <Checkbox
        className="custom-control-input"
        id={`exampleCustomCheckbox${id}`}
        checked={done}
        onChange={handleOnChange}
      ></Checkbox>
      <Content className="widget-content-left">{content}</Content>
      <Space>
        <Button shape="circle" icon={<EditOutlined />} />
        <Button
          type="primary"
          danger
          shape="circle"
          icon={<DeleteOutlined />}
        />
      </Space>
    </List.Item>
  );
}
