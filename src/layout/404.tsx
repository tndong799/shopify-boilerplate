import { EmptyState } from '@shopify/polaris';
import { Text } from '@shopify/polaris';

const Error404: React.FC = () => {
    return (
        <EmptyState
            heading="404 Not found"
            image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
            fullWidth
        >
            <Text as="h6">Oops, you’ve lost in space</Text>
            <Text as="p">We can’t find the page that you’re looking for</Text>
        </EmptyState>
    );
};

export default Error404;
