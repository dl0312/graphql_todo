import React, { useState } from "react";
import { ITask } from "../interface";
import { useMutation } from "@apollo/react-hooks";
import TaskQuery from "../queries/taskQuery";
import { Checkbox, Button, Space, Popconfirm, Input } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import styled from "styled-components";
import { EditOutlined, DeleteOutlined, CheckOutlined } from "@ant-design/icons";
import { List } from "antd";

const Content = styled("div")<{ checked: boolean }>`
  text-decoration: ${({ checked }) => (checked ? "line-through" : undefined)};
  width: 100%;
  margin: 0 1rem;
`;

interface Props {
  task: ITask;
}

export default function TaskItem({
  task: { id, content, done, createdAt },
}: Props) {
  const [editable, setEditable] = useState<boolean>(false);
  const [editableContent, setEditableContent] = useState<string>(content);
  const [updateTask] = useMutation(TaskQuery.UPDATE_TASK, {
    update(cache, { data: { updateTask } }) {
      const data = cache.readQuery<{ tasks: ITask[] }>({
        query: TaskQuery.GET_TASKS,
      });
      if (data) {
        const { tasks: prevTasks } = data;
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

  const [deleteTask] = useMutation(TaskQuery.DELETE_TASK, {
    update(cache, { data: { deleteTask } }) {
      const data = cache.readQuery<{ tasks: ITask[] }>({
        query: TaskQuery.GET_TASKS,
      });
      if (data) {
        if (deleteTask) {
          const { tasks: prevTasks } = data;
          cache.writeQuery({
            query: TaskQuery.GET_TASKS,
            data: {
              tasks: prevTasks.filter((task) => task.id !== id),
            },
          });
        }
      } else {
      }
    },
  });

  const handleOnChangeCheckbox = (e: CheckboxChangeEvent) => {
    const { checked } = e.target;
    updateTask({ variables: { id, content, done: checked } });
  };

  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEditableContent(value);
  };

  const handleOnClickEditButton = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setEditable(true);
  };

  const handleOnClickInputEditConfirmButton = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    updateTask({ variables: { id, content: editableContent, done } });
    setEditable(false);
  };

  const handleOnClickDeleteButton = (
    e: React.MouseEvent<HTMLElement, MouseEvent> | undefined
  ) => {
    deleteTask({ variables: { id } });
  };

  return (
    <List.Item
      key={id}
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
      }}
    >
      <Checkbox checked={done} onChange={handleOnChangeCheckbox}></Checkbox>
      {editable ? (
        <Input
          value={editableContent}
          onChange={handleOnChangeInput}
          style={{ margin: "0 1rem" }}
        />
      ) : (
        <Content checked={done}>{content}</Content>
      )}
      <Space>
        {editable ? (
          <Button
            key="confirm_edit"
            onClick={handleOnClickInputEditConfirmButton}
            shape="circle"
            icon={<CheckOutlined />}
          />
        ) : (
          <Button
            key="edit"
            onClick={handleOnClickEditButton}
            shape="circle"
            icon={<EditOutlined />}
          />
        )}
        <Popconfirm
          title="Are you sure delete this task?"
          onConfirm={handleOnClickDeleteButton}
          onCancel={() => {}}
          okText="Yes"
          cancelText="No"
          placement="topRight"
        >
          <Button
            type="primary"
            danger
            shape="circle"
            icon={<DeleteOutlined />}
          />
        </Popconfirm>
      </Space>
    </List.Item>
  );
}
