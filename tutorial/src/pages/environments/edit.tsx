import React, { useState } from "react";
import { HttpError, IResourceComponentsProps } from "@refinedev/core";

import {
  Edit,
  ListButton,
  RefreshButton,
  useForm,
  useSelect,
} from "@refinedev/antd";

import { Form, Input, Select, Space } from "antd";

import { IConfiguration, IEnvironment } from "interfaces";

export const EnvironmentEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm<
    IEnvironment,
    HttpError,
    IEnvironment
  >({
    metaData: {
      fields: ["id", "name", "description"],
    },
  });

  const postData = queryResult?.data?.data;

  const [myValue, setMyValue] = useState({
    value: "",
    label: "",
  });

  return (
    <Edit
      saveButtonProps={saveButtonProps}
      headerProps={{
        extra: (
          <Space>
            <ListButton />
            <RefreshButton onClick={() => queryResult?.refetch()} />
          </Space>
        ),
      }}
    >
      <Form
        {...formProps}
        layout="vertical"
        onFinish={(values) =>
          formProps.onFinish?.({
            ...values,
            //                        category: values.category?.id,
          } as any)
        } // eslint-disable-line
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Edit>
  );
};
