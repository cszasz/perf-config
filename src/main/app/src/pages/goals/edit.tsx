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

import { IConfiguration, IEnvironment, IGoal } from "interfaces";

export const GoalEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm<
    IGoal,
    HttpError,
    IGoal
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

  const { selectProps: configurationSelectProps } = useSelect<IConfiguration>({
    resource: "configurations",
    defaultValue: postData?.configuration?.id ?? "",
    optionLabel: "name",
  });

  const { selectProps: environmentSelectProps } = useSelect<IEnvironment>({
    resource: "environments",
    defaultValue: postData?.environment?.id ?? "",
    optionLabel: "name",
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
        <Form.Item
          label="Environment"
          name={["environment", "id"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            {...environmentSelectProps}
            onChange={(e, t) => setMyValue(e)}
          />
        </Form.Item>
        <Form.Item
          label="Configuration"
          name={["configuration", "id"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            {...configurationSelectProps}
            onChange={(e, t) => setMyValue(e)}
          />
        </Form.Item>
      </Form>
    </Edit>
  );
};
