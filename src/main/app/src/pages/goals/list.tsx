import { IResourceComponentsProps, useExport, useMany } from "@refinedev/core";

import {
  List,
  useTable,
  EditButton,
  ShowButton,
  DeleteButton,
  getDefaultSortOrder,
  FilterDropdown,
  useSelect,
  ExportButton,
  ImportButton,
  CreateButton,
  useImport,
  TextField,
} from "@refinedev/antd";

import { Table, Space, Select } from "antd";

import { IConfiguration, IEnvironment, IGoal } from "interfaces";

export const GoalLists: React.FC<IResourceComponentsProps> = () => {
  const { tableProps, sorter } = useTable<IGoal>({
    initialSorter: [
      {
        field: "id",
        order: "asc",
      },
    ],
    metaData: {
      fields: [
        "id",
        "title",
        {
          category: ["title"],
        },
      ],
    },
  });

  const { triggerExport, isLoading: exportLoading } = useExport<IEnvironment>({
    mapData: (item) => {
      return {
        id: item.id,
        name: item.name,
        description: item.description,
      };
    },
    metaData: {
      fields: ["id", "name"],
    },
  });

  const importProps = useImport<IGoal>({
    mapData: (item) => {
      return {
        name: item.name,
        description: item.description,
      };
    },
    batchSize: 100,
  });

  const configurationsIds = tableProps?.dataSource?.map((item) =>
    item ? Number(item?.configuration?.id) : 0
  ) ?? [0];

  const configurations = useMany<IConfiguration>({
    resource: "configurations",
    ids: configurationsIds,
    queryOptions: {
      enabled: configurationsIds.length > 0,
    },
  });

  const environmentsIds = tableProps?.dataSource?.map((item) =>
    item ? Number(item?.configuration?.id) : 0
  ) ?? [0];

  const environments = useMany<IEnvironment>({
    resource: "environments",
    ids: environmentsIds,
    queryOptions: {
      enabled: environmentsIds.length > 0,
    },
  });

  return (
    <List
      headerProps={{
        extra: (
          <Space>
            <ImportButton {...importProps} />
            <ExportButton onClick={triggerExport} loading={exportLoading} />
            <CreateButton />
          </Space>
        ),
      }}
    >
      <Table {...tableProps} rowKey="id">
        <Table.Column<IGoal>
          key="id"
          dataIndex="id"
          title="ID"
          sorter={{ multiple: 2 }}
          defaultSortOrder={getDefaultSortOrder("id", sorter)}
        />
        <Table.Column<IGoal>
          key="name"
          dataIndex="name"
          title="Name"
          sorter={{ multiple: 1 }}
        />
        <Table.Column<IGoal>
          key="description"
          dataIndex="description"
          title="Description"
          sorter={{ multiple: 1 }}
        />
        <Table.Column<IGoal>
          key="configuration"
          dataIndex={["environment", "id"]}
          title="Environment"
          sorter={{ multiple: 1 }}
          render={(value, record) => {
            if (environments.isLoading) {
              return <TextField value="Loading..." />;
            }
            return (
              <TextField
                value={
                  environments.data?.data.find((item) => item.id === value)
                    ?.name
                }
              />
            );
          }}
        />
        <Table.Column<IGoal>
          key="configuration"
          dataIndex={["configuration", "id"]}
          title="Configuration"
          sorter={{ multiple: 1 }}
          render={(value, record) => {
            if (configurations.isLoading) {
              return <TextField value="Loading..." />;
            }
            return (
              <TextField
                value={
                  configurations.data?.data.find((item) => item.id === value)
                    ?.name
                }
              />
            );
          }}
        />
        <Table.Column<IGoal>
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
