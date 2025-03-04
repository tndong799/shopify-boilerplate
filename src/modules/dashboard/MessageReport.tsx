import {
    Badge,
    BlockStack,
    Box,
    Card,
    Divider,
    Icon,
    InlineStack,
    Tag,
    Text,
} from '@shopify/polaris';
import { AlertTriangleIcon, LightbulbIcon } from '@shopify/polaris-icons';

type Props = {
    data: Record<string, any>;
};

export const MessageReport = ({ data }: Props) => {
    const scoreMaps: Record<number, string> = {
        1: 'Poor',
        2: 'Below Average',
        3: 'Average',
        4: 'Good',
        5: 'Excellent',
    };
    return (
        <Box>
            <BlockStack gap={'200'}>
                <Text variant="headingLg" as="h4">
                    Homepage Audit Summary Report
                </Text>
                <Text as="span">{data.report_executive_summary}</Text>

                {Object.keys(data.elements).map((key) => {
                    const value = data.elements[key];
                    const scoreAvg =
                        (Object.values(value.element_score) as number[]).reduce(
                            (acc: number, curr: number) => acc + curr,
                            0
                        ) / Object.values(value.element_score).length;

                    return (
                        <Card key={key}>
                            <BlockStack gap={'200'}>
                                <InlineStack align="space-between">
                                    <Text variant="headingSm" as="h2">
                                        {key
                                            .split('_')
                                            .join(' ')
                                            .split(' ')
                                            .map(
                                                (word) =>
                                                    word
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                    word.slice(1)
                                            )
                                            .join(' ')}
                                    </Text>
                                    <Badge tone="success">
                                        {`${scoreMaps[Math.floor(scoreAvg)]}`}
                                    </Badge>
                                </InlineStack>

                                <Divider borderColor="border" />

                                <BlockStack gap="100">
                                    <Text
                                        as="h3"
                                        variant="headingSm"
                                        fontWeight="medium"
                                    >
                                        Why audit:
                                    </Text>
                                    <Text as="p" variant="bodyMd">
                                        {value.why_audit}
                                    </Text>
                                </BlockStack>

                                <BlockStack gap="100">
                                    <Text
                                        as="h3"
                                        variant="headingSm"
                                        fontWeight="medium"
                                    >
                                        Current situation:
                                    </Text>
                                    <Text as="p" variant="bodyMd">
                                        {value.current_situation}
                                    </Text>
                                </BlockStack>

                                <BlockStack
                                    gap="100"
                                    align="start"
                                    inlineAlign="start"
                                >
                                    <Text
                                        as="h3"
                                        variant="headingSm"
                                        fontWeight="medium"
                                    >
                                        Key issues:
                                    </Text>
                                    {value.key_issues.map(
                                        (issue: string, index: number) => (
                                            <InlineStack gap="100" key={index}>
                                                <Icon
                                                    source={AlertTriangleIcon}
                                                    tone="critical"
                                                />
                                                <Text as="p" variant="bodyMd">
                                                    {issue}
                                                </Text>
                                            </InlineStack>
                                        )
                                    )}
                                </BlockStack>

                                <BlockStack
                                    gap="100"
                                    align="start"
                                    inlineAlign="start"
                                >
                                    <Text
                                        as="h3"
                                        variant="headingSm"
                                        fontWeight="medium"
                                    >
                                        Recommendations:
                                    </Text>
                                    {value.recommendations.map(
                                        (issue: string, index: number) => (
                                            <InlineStack gap="100" key={index}>
                                                <Icon
                                                    source={LightbulbIcon}
                                                    tone="success"
                                                />
                                                <Text as="p" variant="bodyMd">
                                                    {issue}
                                                </Text>
                                            </InlineStack>
                                        )
                                    )}
                                </BlockStack>

                                <Box
                                    background="bg-surface-secondary"
                                    padding="200"
                                    borderRadius="100"
                                    borderInlineStartWidth="050"
                                    borderColor="border"
                                >
                                    <Text as="p" variant="headingMd">
                                        {value.conversion_impact}
                                    </Text>
                                </Box>
                            </BlockStack>
                        </Card>
                    );
                })}
            </BlockStack>
        </Box>
    );
};
