import { EAppRouter } from '@routes/type';
import { BlockStack, Button, Card, Grid, Page, Text } from '@shopify/polaris';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
    // const { isLoading, data: photos = [] } = useFetchGET({ url: PHOTO_URL })
    // if (isLoading) return <Loading />

    return (
        <Page>
            <Grid>
                <Grid.Cell columnSpan={{ xs: 4 }}>
                    <Card>
                        <BlockStack inlineAlign="start" gap={'200'}>
                            <Text as="p">Workflow</Text>
                            <Link to={EAppRouter.workflow}>
                                <Button variant="primary">Start</Button>
                            </Link>
                        </BlockStack>
                    </Card>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 4 }}>
                    <Card>
                        <BlockStack inlineAlign="start" gap={'200'}>
                            <Text as="p">Conversion Table Report</Text>
                            <Link to={EAppRouter.conversionTableReport}>
                                <Button variant="primary">Start</Button>
                            </Link>
                        </BlockStack>
                    </Card>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 4 }}>
                    <Card>
                        <BlockStack inlineAlign="start" gap={'200'}>
                            <Text as="p">Conversion History</Text>
                            <Link to={EAppRouter.conversionHistory}>
                                <Button variant="primary">Start</Button>
                            </Link>
                        </BlockStack>
                    </Card>
                </Grid.Cell>
            </Grid>
        </Page>
    );
};

export default Dashboard;
