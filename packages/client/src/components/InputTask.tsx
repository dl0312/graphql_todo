import React, { ReactElement, useState } from "react";
import { Space, Input, Button } from "antd";
import { TagsOutlined, PlusCircleOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useMutation } from "@apollo/react-hooks";
import TaskQuery from "../queries/taskQuery";
import { ITask } from "../interface";
import Search from "antd/lib/input/Search";

const Container = styled.div`
  display: flex;
`;
interface Props {}

export default function InputTask({}: Props): ReactElement {
  const [content, setContent] = useState<string>("");
  const [createTask] = useMutation(TaskQuery.CREATE_TASK, {
    update(cache, { data: { createTask } }) {
      const data = cache.readQuery<{ tasks: ITask[] }>({
        query: TaskQuery.GET_TASKS,
      });
      if (data) {
        const { tasks: prevTasks } = data;
        cache.writeQuery({
          query: TaskQuery.GET_TASKS,
          data: {
            tasks: [...prevTasks, createTask],
          },
        });
      } else {
      }
    },
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: content } = e.target;
    setContent(content);
  };

  const handleOnSubmit = (
    content: string,
    event?:
      | React.ChangeEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLElement, MouseEvent>
      | undefined
  ) => {
    createTask({ variables: { content } });
    setContent("");
  };

  return (
    <Container>
      <Search
        value={content}
        onChange={handleOnChange}
        prefix={<TagsOutlined />}
        placeholder="What needs to do done?"
        onSearch={handleOnSubmit}
        enterButton={
          <Button type="primary" icon={<PlusCircleOutlined />}>
            Add
          </Button>
        }
      />
    </Container>
  );
}
