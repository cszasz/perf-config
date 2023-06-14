import React, { SetStateAction, useEffect, useState } from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import "./styles.css";

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
import { Diagram } from "./graph";
import {
  IntentFactory,
  IntentModel,
  IntentPortFactory,
  IntentPortModel,
} from "./Intent";
import {
  DefaultLinkModel,
  DefaultNodeModel,
  DiagramEngine,
  DiagramModel,
} from "storm-react-diagrams";
import Graph from "components/graph/Graph";

var gr;

export const ConfigurationsEdit: React.FC<
  IResourceComponentsProps<IConfiguration>
> = (x) => {
  const all = useForm<IConfiguration>({});
  const { form, formProps, saveButtonProps, queryResult } = all;

  const postData = queryResult?.data?.data;

  const propertiesArray: any = { init: true }; //Object.values(propertiesMap);

  const [properties, setProperties] = useState(propertiesArray);

  const engine = new DiagramEngine();
  const model = new DiagramModel();

  engine.installDefaultFactories();
  /*
  engine.registerPortFactory(
    new IntentPortFactory("diamond", (config) => new IntentPortModel())
  );
  engine.registerNodeFactory(new IntentFactory());
  */
  engine.installDefaultFactories();

  //const [propertiesSet, setPropertiesSet] = useState(postData?.properties);

  let initValue: any = 0;
  const [myValue, setMyValue] = useState(initValue);

  let initGraph: any = {
    nodes: [
      {
        id: "1",
        title: "",
        type: "start",
        x: -200,
        y: 200,
      },
      {
        id: "4",
        title: "",
        type: "end",
        x: 200,
        y: 200,
      },
    ],
    edges: [],
  };
  const [graph, setGraph2] = useState(initGraph);

  const setGraph = (g) => {
    setGraph2(g);
    form.setFieldValue("graph", g);
  };

  console.log(graph);

  if (JSON.stringify(graph) != JSON.stringify(gr)) {
    gr = graph;
  }

  const initSelected = {
    nodes: new Map(),
    edges: new Map(),
  };
  const [selected, setSelected] = useState(initSelected);

  if (properties.init && queryResult?.isSuccess && !queryResult?.isRefetching) {
    const props: any = { init: false };
    postData?.properties &&
      postData?.properties.forEach((p) => {
        if (!props[p.configuration_template]) {
          props[p.configuration_template] = {};
        }
        if (!props[p.configuration_template][p.configuration_template_id]) {
          props[p.configuration_template][p.configuration_template_id] = [];
        }
        var propertiesc: any = props[p.configuration_template][
          p.configuration_template_id
        ].find((pp) => pp["inter"] === p.inter);
        if (!propertiesc) {
          propertiesc = { inter: p.inter };
          props[p.configuration_template][p.configuration_template_id].push(
            propertiesc
          );
        }
        propertiesc[p.name] = p.value;
      });
    setProperties(props);
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
    const templates_used = selected?.nodes?.size
      ? Array.from(selected?.nodes.values()).map((t: any) => t?.template?.value)
      : [];

    if (templates_used.length) {
      const ff = async () => {
        let d: any = {};
        d = {
          ...data,
          init: myValue,
        };
        for (let i in templates_used) {
          const dd = await fetch(
            API_URL + "/configurationTemplates/" + templates_used[i]
          );
          const json = await dd.json();
          d[templates_used[i]] = {
            value: templates_used[i],
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
  }, [selected]);

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
      const templateValues = propertiesA[c];
      Object.keys(templateValues).forEach(
        (configuration_template_id: string) => {
          const node_values = templateValues[configuration_template_id];
          node_values.forEach((p) => {
            Object.keys(p).forEach((d) => {
              if (d === "inter") return;
              const o: IPropertyInstance = {
                configuration_template: Number(c),
                configuration_template_id: configuration_template_id,
                inter: String(p["inter"]),
                name: d,
                value: p[d],
              };
              props.push(o);
            });
          });
        }
      );
    });
    form.setFieldValue("properties", props);
  }

  const handlePropertyChange = (
    c: number,
    node_id: number,
    index2: number,
    name: string,
    value: any
  ) => {
    const propertiesArray = { ...properties };
    propertiesArray[c][node_id][index2][name] = value;
    setProperties(propertiesArray);
    //form.resetFields();
    updateProperties(propertiesArray);
  };

  const handleAddProperty = (c: number, node_id: number) => {
    const propertiesArray = { ...properties };
    const newRow = { inter: "" };
    data[c].properties.forEach((p) => {
      newRow[p.name] = p.value;
    });
    if (!propertiesArray[c]) propertiesArray[c] = {};
    if (!propertiesArray[c][node_id]) propertiesArray[c][node_id] = [];
    propertiesArray[c][node_id].push(newRow);
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

  const handleRemoveProperty = (c: number, node_id: number, index) => {
    const propertiesArray = { ...properties };
    propertiesArray[c][node_id].splice(index, 1);
    //updateProperties();
    form.resetFields();
    setProperties(propertiesArray);
    updateProperties(propertiesArray);
  };

  function getText(text: string, record: object, name: string) {
    return record[name];
  }

  if (!myValue && (!data || data["init"] !== postData?.graph)) {
    //let eee = postData?.configurationTemplate as unknown;
    //let ee = eee as SetStateAction<never[]>;
    setTimeout(() => {
      //setData({ init: ee });
      //setMyValue(ee);
      setGraph2(postData?.graph?.nodes.length ? postData?.graph : initGraph);
    }, 100);
  }

  /*
  useEffect(
    () => () => {
      setMyValue(0);
    },
    [myValue]
  );*/

  var columns: any[] = [];
  var template: number = 0;
  var configuration_template_id: number = 0;

  if (selected?.nodes?.size && data) {
    const node = Array.from(selected.nodes.values())[0];
    template = node.template.value;
    configuration_template_id = node.id;
    if (data[template])
      columns = [
        {
          title: "Interface",
          dataIndex: "inter",
          render: (text: string, record, index: number) => (
            <Input
              value={text}
              onChange={(e) => {
                handlePropertyChange(
                  template,
                  configuration_template_id,
                  index,
                  "inter",
                  e.target.value
                );
              }}
            />
          ),
        },
        ...data[template].properties.map((d, index) => {
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
                onChange={(e) => {
                  handlePropertyChange(
                    template,
                    configuration_template_id,
                    index2,
                    d.name,
                    e.target.value
                  );
                }}
              />
            ),
          };
        }),
        {
          title: "Action",
          dataIndex: "",
          render: (text: string, record, index: number) => (
            <Button
              onClick={() => {
                handleRemoveProperty(
                  template,
                  configuration_template_id,
                  index
                );
              }}
            >
              Delete
            </Button>
          ),
        },
      ];
  }

  //setColumns({ columns: ccolumns, handleAddProperty });
  //columns[c] = { columns: ccolumns, handleAddProperty, handlePropertyChange };

  // create four nodes in a way that straight links wouldn't work
  const nodes: any[] = [];
  nodes.push(new DefaultNodeModel("Node 1", "rgb(0,192,255)"));
  nodes[0].setPosition(340, 350);
  nodes[0].addOutPort("out");

  nodes.push(new DefaultNodeModel("Node 2", "rgb(255,255,0)"));
  nodes[1].setPosition(700, 450);
  nodes[1].addInPort("in");

  model.addAll(...nodes);

  const links: DefaultLinkModel[] = [];
  const link = new DefaultLinkModel();
  //const link = nodes[0].getPort("in").link(nodes[1].getPort("out"));
  link.setSourcePort(nodes[0].getOutPorts()[0]);
  link.setTargetPort(nodes[1].getInPorts()[0]);
  link.addLabel("jhgjhg");
  //link.setMarkers(true, false);
  links.push(link);

  model.addAll(...links);

  engine.setDiagramModel(model);

  const configuration = columns.length ? (
    <React.Fragment>
      <Form.Item
        name="properties"
        label={
          "Properties of type " +
            configurationTemplateSelectProps?.options?.find(
              (o) => o.value === template
            )?.label ?? ""
        }
      >
        <Table
          dataSource={
            properties[template]
              ? properties[template][configuration_template_id]
              : []
          }
          columns={columns}
        ></Table>
      </Form.Item>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "20px",
        }}
      >
        <Button
          onClick={() => handleAddProperty(template, configuration_template_id)}
        >
          Add
        </Button>
      </div>
    </React.Fragment>
  ) : null;

  //console.log("RENDER", properties);

  return (
    <Edit
      key="edit"
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
        key="form"
        {...formProps}
        layout="vertical"
        onFinish={(values) => {
          formProps.onFinish?.({
            ...values,
          } as any);
        }}
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
        <Form.Item key="graph" label="Configuration Templates" name="graph">
          <Graph
            key="graph"
            options={configurationTemplateSelectProps.options}
            selected={selected}
            setSelected={setSelected}
            graph={gr}
            setState={setGraph}
          />
        </Form.Item>
        {configuration}
      </Form>
    </Edit>
  );
  //  <Form.Item name="properties" label="Properties">
  //  <Table dataSource={propertiesArray} columns={columns}></Table>
  //</Form.Item>
  //  <Button onClick={handleAddProperty}>Add</Button>
};
