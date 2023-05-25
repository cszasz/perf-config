import React, { SetStateAction, useEffect, useState } from "react";
import { IResourceComponentsProps } from "@refinedev/core";

import {
  Edit,
  ListButton,
  RefreshButton,
  useForm,
  useSelect,
} from "@refinedev/antd";

import { Form, Input, Select, Space, Table } from "antd";

import QuestionCircledIcon from "@ant-design/icons/QuestionCircleOutlined";

import {
  IConfiguration,
  IConfigurationTemplate,
  IPropertyInstance,
} from "interfaces";
import { Button, Tooltip } from "@mui/material";
import { API_URL } from "App";
import { QuestionMark, QuestionMarkOutlined } from "@mui/icons-material";

export const ConfigurationsEdit: React.FC<
  IResourceComponentsProps<IConfiguration>
> = (x) => {
  const all = useForm<IConfiguration>({});
  const { form, formProps, saveButtonProps, queryResult } = all;

  const postData = queryResult?.data?.data;

  const propertiesArray: any = { init: true }; //Object.values(propertiesMap);

  const [properties, setProperties] = useState(propertiesArray);

  //const [propertiesSet, setPropertiesSet] = useState(postData?.properties);

  let initValue: any = 0;
  const [myValue, setMyValue] = useState(initValue);

  console.log(
    postData?.properties[0].inter,
    properties.init,
    queryResult?.isRefetching,
    queryResult?.isStale
  );

  if (properties.init && queryResult?.isSuccess && !queryResult?.isRefetching) {
    const props: any = { init: false };
    postData?.properties &&
      postData?.properties.forEach((p) => {
        if (!props[p.configuration_template]) {
          props[p.configuration_template] = [];
        }
        var propertiesc: any = props[p.configuration_template].find(
          (pp) => pp["inter"] === p.inter
        );
        if (!propertiesc) {
          propertiesc = { inter: p.inter };
          props[p.configuration_template].push(propertiesc);
        }
        propertiesc[p.name] = p.value;
      });
    setProperties(props);
    console.log("SET");
  }

  const { selectProps: configurationTemplateSelectProps } =
    useSelect<IConfigurationTemplate>({
      resource: "configurationTemplates",
      optionLabel: "name",
      //defaultValue: myValue || postData?.configurationTemplate || [],
    });

  const [data, setData] = useState({});

  //const [columns, setColumns] = useState(ccc);

  useEffect(() => {
    if (myValue && data["init"] !== myValue) {
      const ff = async () => {
        let d: any = {};
        d = {
          ...data,
          init: myValue,
        };
        for (let i in myValue) {
          const dd = await fetch(
            API_URL + "/configurationTemplates/" + myValue[i]
          );
          const json = await dd.json();
          d[myValue[i]] = {
            value: myValue[i],
            name: json.name,
            properties: json.properties,
          };
        }
        // if (JSON.stringify(d) !== JSON.stringify(data)) {
        setData(d);
        //}
      };
      ff();
    }
  }, [myValue, data]);

  useEffect(
    () => () => {
      setProperties({ init: true });
      //setMyValue(0);
    },
    [myValue]
  );

  function updateProperties(propertiesA) {
    const props: IPropertyInstance[] = [];
    Object.keys(propertiesA).forEach((c) => {
      if (c === "init") return;
      propertiesA[c].forEach((p) => {
        Object.keys(p).forEach((d) => {
          if (d === "inter") return;
          const o: IPropertyInstance = {
            configuration_template: Number(c),
            inter: String(p["inter"]),
            name: d,
            value: p[d],
          };
          props.push(o);
        });
      });
    });
    form.setFieldValue("properties", props);
  }

  const handlePropertyChange = (
    c: number,
    index2: number,
    name: string,
    value: any
  ) => {
    const propertiesArray = { ...properties };
    propertiesArray[c][index2][name] = value;
    setProperties(propertiesArray);
    //form.resetFields();
    updateProperties(propertiesArray);
  };

  const handleAddProperty = (c: number) => {
    const propertiesArray = { ...properties };
    const newRow = { inter: "" };
    data[c].properties.forEach((p) => {
      newRow[p.name] = p.value;
    });
    if (!propertiesArray[c]) propertiesArray[c] = [];
    propertiesArray[c].push(newRow);
    //form.setFieldValue("properties", [...properties]);
    form.resetFields();
    /*
    setTimeout(() => {
      setMyValue([...myValue]);
    }, 1000);
    */
    setProperties(propertiesArray);
    updateProperties(propertiesArray);
  };

  const handleRemoveProperty = (c: number, index) => {
    const propertiesArray = { ...properties };
    propertiesArray[c].splice(index, 1);
    //updateProperties();
    form.resetFields();
    setProperties(propertiesArray);
    updateProperties(propertiesArray);
  };

  function getText(text: string, record: object, name: string) {
    return record[name];
  }

  if (!myValue && (!data || data["init"] !== postData?.configurationTemplate)) {
    let eee = postData?.configurationTemplate as unknown;
    let ee = eee as SetStateAction<never[]>;
    setTimeout(() => {
      //setData({ init: ee });
      setMyValue(ee);
    }, 100);
  }

  /*
  useEffect(
    () => () => {
      setMyValue(0);
    },
    [myValue]
  );*/

  const columns = {};

  (myValue || (postData?.configurationTemplate ?? [])).forEach((c: number) => {
    if (!data || !data[c]) return;
    const ccolumns = [
      {
        title: "Interface",
        dataIndex: "inter",
        render: (text: string, record, index: number) => (
          <Input
            value={text}
            onChange={(e) =>
              handlePropertyChange(c, index, "inter", e.target.value)
            }
          />
        ),
      },
      ...data[c].properties.map((d, index) => {
        return {
          title: () => (
            <div>
              <span>{d.name} </span>
              {d.description ? (
                <Tooltip title={d.description}>
                  <QuestionCircledIcon />
                </Tooltip>
              ) : null}
            </div>
          ),
          dataIndex: index,
          render: (text: string, record, index2: number) => (
            <Input
              value={getText(text, record, d.name)}
              onChange={(e) =>
                handlePropertyChange(c, index2, d.name, e.target.value)
              }
            />
          ),
        };
      }),
      {
        title: "Action",
        dataIndex: "",
        render: (text: string, record, index: number) => (
          <Button onClick={() => handleRemoveProperty(c, index)}>Delete</Button>
        ),
      },
    ];

    //setColumns({ columns: ccolumns, handleAddProperty });
    columns[c] = { columns: ccolumns, handleAddProperty, handlePropertyChange };
  });

  //console.log("RENDER", properties);

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
          key="CN"
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
          key="CD"
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
          key="CT"
          label="Configuration Templates"
          name={["configurationTemplate"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            mode="multiple"
            //defaultValue={configurationTemplate.defaultValueQueryResult.data}
            //onBlur={() => configurationTemplateSelectProps?.onSearch?.("")}
            {...configurationTemplateSelectProps}
            onChange={(e, t) => {
              let eee = e as unknown;
              let ee = eee as SetStateAction<never[]>;
              setMyValue(ee);
            }}
          />
        </Form.Item>
        {(myValue || (postData?.configurationTemplate ?? [])).map(
          (c: number) => (
            <React.Fragment>
              <Form.Item
                name="properties"
                label={
                  "Properties of type " +
                    configurationTemplateSelectProps?.options?.find(
                      (o) => o.value === c
                    )?.label ?? ""
                }
              >
                <Table
                  dataSource={properties[c]}
                  columns={columns[c] ? columns[c].columns : []}
                ></Table>
              </Form.Item>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginRight: "20px",
                }}
              >
                <Button onClick={() => columns[c].handleAddProperty(c)}>
                  Add
                </Button>
              </div>
            </React.Fragment>
          )
        ) ?? null}
      </Form>
    </Edit>
  );
  //  <Form.Item name="properties" label="Properties">
  //  <Table dataSource={propertiesArray} columns={columns}></Table>
  //</Form.Item>
  //  <Button onClick={handleAddProperty}>Add</Button>
};
