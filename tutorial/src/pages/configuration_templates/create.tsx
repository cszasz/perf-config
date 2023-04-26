import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";

import { Create, useForm } from "@refinedev/antd";

import { Button, Form, Input, Table } from "antd";

import { IConfigurationTemplate, IProperty } from "interfaces";

export const ConfigurationTemplateCreate: React.FC<
  IResourceComponentsProps<IConfigurationTemplate>
> = () => {
  const all = useForm<IConfigurationTemplate>();

  const { form, formProps, saveButtonProps } = all;

  formProps.initialValues = {
    name: "",
    description: "",
    properties: [],
  };
  const properties: IProperty[] = formProps.initialValues?.properties ?? [];

  const handleAddProperty = () => {
    const newProperties: IProperty[] = [...properties];
    properties.push({ name: "", value: "" });
    form.setFieldValue("name", "jhj");
    form.resetFields();
  };

  const handleRemoveProperty = (index) => {
    properties.splice(index, 1);
    form.resetFields();
  };

  const handlePropertyChange = (
    index: number,
    field: keyof IProperty,
    value: any
  ) => {
    const newProperties = [...properties];
    newProperties[index][field] = value;
    form.setFieldValue("properties", newProperties);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text: string, record: IProperty, index: number) => (
        <Input
          value={text}
          onChange={(e) => handlePropertyChange(index, "name", e.target.value)}
        />
      ),
    },
    {
      title: "Value",
      dataIndex: "value",
      render: (text: string, record: IProperty, index: number) => (
        <Input
          value={text}
          onChange={(e) => handlePropertyChange(index, "value", e.target.value)}
        />
      ),
    },
    {
      title: "Action",
      dataIndex: "",
      render: (text: string, record: IProperty, index: number) => (
        <Button onClick={() => handleRemoveProperty(index)}>Delete</Button>
      ),
    },
  ];

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
              required: false,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="properties" label="Properties">
          <Table dataSource={properties} columns={columns}></Table>
        </Form.Item>
        <Button onClick={handleAddProperty}>Add</Button>
      </Form>
    </Create>
  );
};
