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

import { IConfiguration, IEnvironment } from "interfaces";

export const EnvironmentLists: React.FC<IResourceComponentsProps> = () => {
  const { tableProps, sorter } = useTable<IEnvironment>({
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

  const importProps = useImport<IEnvironment>({
    mapData: (item) => {
      return {
        name: item.name,
        description: item.description,
      };
    },
    batchSize: 100,
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
        <Table.Column<IEnvironment>
          key="id"
          dataIndex="id"
          title="ID"
          sorter={{ multiple: 2 }}
          defaultSortOrder={getDefaultSortOrder("id", sorter)}
        />
        <Table.Column<IEnvironment>
          key="name"
          dataIndex="name"
          title="Name"
          sorter={{ multiple: 1 }}
        />
        <Table.Column<IEnvironment>
          key="description"
          dataIndex="description"
          title="Description"
          sorter={{ multiple: 1 }}
        />
        <Table.Column<IEnvironment>
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
