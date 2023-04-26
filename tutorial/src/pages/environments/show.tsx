import { useShow, IResourceComponentsProps } from "@refinedev/core";

import { Show, MarkdownField, RefreshButton } from "@refinedev/antd";

import { Typography } from "antd";

import { IEnvironment } from "interfaces";

const { Title, Text } = Typography;

export const EnvironmentShow: React.FC<IResourceComponentsProps> = () => {
    const { queryResult } = useShow<IEnvironment>({
        metaData: {
            fields: [
                "id",
                "name",
                "description",
            ],
        },
    });
    const { data, isLoading } = queryResult;
    const record = data?.data;

    return (
        <Show
            isLoading={isLoading}
            headerProps={{
                extra: <RefreshButton onClick={() => queryResult.refetch()} />,
            }}
        >
            <Title level={5}>Id</Title>
            <Text>{record?.id}</Text>

            <Title level={5}>Title</Title>
            <Text>{record?.name}</Text>

            <Title level={5}>Description</Title>
            <Text>{record?.description}</Text>

        </Show>
    );
};
