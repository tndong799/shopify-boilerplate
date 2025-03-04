import { EAppRouter } from '@routes/type';
import { BlockStack, Icon, InlineStack, Page, Text } from '@shopify/polaris';
import { useNavigate } from 'react-router-dom';
import { AlertTriangleIcon, CheckCircleIcon } from '@shopify/polaris-icons';
import { useState } from 'react';

type Step = {
    id: number;
    title: string;
    status: 'completed' | 'loading' | 'error' | 'waiting';
};
export default function Workflow() {
    const [steps, setSteps] = useState<Step[]>([
        {
            id: 1,
            title: 'Capture Homepage Screenshot',
            status: 'loading',
        },
        {
            id: 2,
            title: 'Analyze UX/UI with HTML',
            status: 'waiting',
        },
        {
            id: 3,
            title: 'Compile Data & Generate Report',
            status: 'waiting',
        },
        {
            id: 4,
            title: 'Suggest Shopify Apps for Issue Resolution',
            status: 'waiting',
        },
    ]);
    const navigate = useNavigate();

    const handleCallApi = () => {
        console.log('Call API');
    };
    return (
        <Page
            backAction={{
                content: 'Products',
                onAction: () => {
                    navigate(EAppRouter.root);
                },
            }}
            title="Workflow"
            primaryAction={{ content: 'Call API', onAction: handleCallApi }}
        >
            <BlockStack gap="200" inlineAlign="start">
                {steps.map((step) => (
                    <InlineStack gap="150" key={step.id} align="start">
                        {step.status === 'completed' && (
                            <Icon source={CheckCircleIcon} tone="success" />
                        )}
                        {step.status === 'loading' && (
                            <div className="animate-spin size-5">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-loader-circle"
                                >
                                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                                </svg>
                            </div>
                        )}
                        {step.status === 'error' && (
                            <Icon source={AlertTriangleIcon} tone="critical" />
                        )}
                        {step.status === 'waiting' && (
                            <Icon
                                source='<svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                            >
                                <circle
                                    cx="10"
                                    cy="10"
                                    r="7"
                                    stroke="black"
                                    stroke-dasharray="3 3"
                                ></circle>
                            </svg>'
                                tone="base"
                            />
                        )}
                        <Text as="span">{step.title}</Text>
                    </InlineStack>
                ))}
            </BlockStack>
        </Page>
    );
}
