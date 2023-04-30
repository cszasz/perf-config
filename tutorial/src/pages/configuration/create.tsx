import React, { useEffect, useState } from "react";
import { IResourceComponentsProps } from "@refinedev/core";

import {
  Create,
  Edit,
  ListButton,
  RefreshButton,
  useForm,
  useSelect,
} from "@refinedev/antd";

import { Form, Input, Select, Space, Table } from "antd";

import {
  IConfiguration,
  IConfigurationTemplate,
  IPropertyInstance,
} from "interfaces";
import { Button } from "@mui/material";
import { API_URL } from "App";

export const ConfigurationsCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps } = useForm<IConfigurationTemplate>();

  /*
  const { selectProps: configurationTemplateSelectProps } = useSelect<IConfigurationTemplate>({
      resource: "configurationTemplates",
      defaultValue: "",
      optionLabel: "name",
      metaData: ["id", "name", "properties"],
    });
    

  const columns = [
    {
      title: "Interface",
      dataIndex: "interface",
      render: (text: string, record, index: number) => (
        <Input
          value={text}
          onChange={(e) =>
            handlePropertyChange(index, "interface", e.target.value)
          }
        />
      ),
    },
    ...data.map((d, index) => {
      return {
        title: d.name,
        dataIndex: index,
        render: (text: string, record, index2: number) => (
          <Input
            value={getText(text, record, d.name)}
            onChange={(e) =>
              handlePropertyChange(index2, d.name, e.target.value)
            }
          />
        ),
      };
    }),
    {
      title: "Action",
      dataIndex: "",
      render: (text: string, record, index: number) => (
        <Button onClick={() => handleRemoveProperty(index)}>Delete</Button>
      ),
    },
  ];
  */

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
      </Form>
    </Create>
  );
};
