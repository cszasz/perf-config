import React, { useState } from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, Space } from "antd";

import { IConfiguration, IEnvironment } from "interfaces";

export const GoalCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps } = useForm<IEnvironment>();

  const [myValue, setMyValue] = useState({
    value: "",
    label: "",
  });

  const { selectProps: configurationSelectProps } = useSelect<IConfiguration>({
    resource: "configurations",
    defaultValue: "",
    optionLabel: "name",
  });

  const { selectProps: environmentSelectProps } = useSelect<IEnvironment>({
    resource: "environments",
    defaultValue: "",
    optionLabel: "name",
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
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
    </Create>
  );
};
