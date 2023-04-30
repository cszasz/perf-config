import React, { useEffect, useState } from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import type { SelectProps } from 'antd';

import {
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

export const ConfigurationsEdit: React.FC<
  IResourceComponentsProps<IConfiguration>
> = (x) => {
  const all = useForm<IConfiguration>({});
  const { form, formProps, saveButtonProps, queryResult } = all;

  const propertiesMap = {};

  const postData = queryResult?.data?.data;

  const options: SelectProps['options'] = [];

  postData?.properties &&
    postData?.properties.forEach((p) => {
      if (!propertiesMap[p.interface]) {
        propertiesMap[p.interface] = { interface: p.interface };
      }
      propertiesMap[p.interface][p.name] = p.value;
    });

  const propertiesArray: object[] = Object.values(propertiesMap);

  //const properties: IProperty[][] = Object.values(propertiesMap);

  
  const { selectProps: configurationTemplateSelectProps } =
    useSelect<IConfigurationTemplate>({
      resource: "configurationTemplates",
      //defaultValue=postData?.configurationTemplate.map(a => {return {value: String(a) , label: String(a)}})
      defaultValue: postData?.configurationTemplate?.map(a => Number(a.id)) ?? "",
      optionLabel: "name",
      metaData: ["id", "name", "properties"],
    });

    console.log(postData?.configurationTemplate?.map(a => Number(a.id)));

    console.log(configurationTemplateSelectProps);
  

  const [myValue, setMyValue] = useState({
    value: "",
    label: "",
  });
  const [data, setData] = useState([{ name: "-", value: "" }]);

  /*
  if (
    postData?.configurationTemplate?.id &&
    myValue.value != (postData?.configurationTemplate?.id ?? "")
  ) {
    setMyValue({
      value: postData?.configurationTemplate?.id ?? "",
      label: postData?.configurationTemplate?.name ?? "",
    });
  }*/

  useEffect(() => {
    console.log(myValue);
    if (myValue.value)
      fetch(API_URL + "/configurationTemplates/" + myValue.value)
        .then((response) => response.json())
        .then((data) => {
          setData(data.properties);
        })
        .catch((error) => console.log(error));
  }, [myValue]);

  const handleAddProperty = () => {
    const newRow = [{ interface: "" }];
    data.forEach((p) => {
      newRow[p.name] = p.value;
    });
    propertiesArray.push(newRow);
    //form.setFieldValue("properties", [...properties]);
    form.resetFields();
  };

  const handleRemoveProperty = (index) => {
    propertiesArray.splice(index, 1);
    //form.setFieldValue("properties", [...properties]);
    updateProperties();
    form.resetFields();
  };

  function updateProperties() {
    const props: IPropertyInstance[] = [];
    propertiesArray.forEach((p) => {
      data.forEach((d) => {
        const o = {
          interface: String(p["interface"]),
          name: d.name,
          value: p[d.name],
        };
        props.push(o);
      });
    });
    form.setFieldValue("properties", props);
  }

  const handlePropertyChange = (index2: number, name: string, value: any) => {
    const newProperties = [...propertiesArray];
    newProperties[index2][name] = value;
    const props: IPropertyInstance[] = [];
    newProperties.forEach((p) => {
      data.forEach((d) => {
        const o = {
          interface: String(p["interface"]),
          name: d.name,
          value: p[d.name],
        };
        props.push(o);
      });
    });
    form.setFieldValue("properties", props);
  };

  function getText(text: string, record: object, name: string) {
    return record[name];
  }

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
        <Form.Item
          label="Configuration Template"
          name={["configurationTemplate", "id"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            mode="multiple"
            {...configurationTemplateSelectProps}
            
            onChange={(e, t) => setMyValue(e)}
          />
        </Form.Item>
        <Form.Item name="properties" label="Properties">
          <Table dataSource={propertiesArray} columns={columns}></Table>
        </Form.Item>
      </Form>
      <Button onClick={handleAddProperty}>Add</Button>
    </Edit>
  );
};
