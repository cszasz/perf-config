import React, { useState } from "react";
import { IResourceComponentsProps } from "@refinedev/core";

import { Edit, ListButton, RefreshButton, useForm } from "@refinedev/antd";

import { Form, Input, Select, Space, List, Table } from "antd";

import { IConfigurationTemplate, IProperty } from "interfaces";
import { Button } from "@mui/material";

export const ConfigurationTemplateEdit: React.FC<
  IResourceComponentsProps<IConfigurationTemplate>
> = (x) => {
  const all = useForm<IConfigurationTemplate>({});
  const { form, formProps, saveButtonProps, queryResult } = all;

  const postData = queryResult?.data?.data;
  const properties: IProperty[] = postData?.properties ?? [];

  const handleAddProperty = () => {
    properties.push({ name: "", value: "" });
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
          } as any)
        }
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
        <Form.Item name="properties" label="Properties">
          <Table dataSource={properties} columns={columns}></Table>
        </Form.Item>
      </Form>
      <Button onClick={handleAddProperty}>Add</Button>
    </Edit>
  );
};
