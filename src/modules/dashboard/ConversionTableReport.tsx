import { EAppRouter } from '@routes/type';
import {
    BlockStack,
    Box,
    Button,
    Card,
    Form,
    Grid,
    Icon,
    InlineStack,
    Page,
    Text,
    TextField,
} from '@shopify/polaris';
import { AlertTriangleIcon, CheckCircleIcon } from '@shopify/polaris-icons';
import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ConversionHistory.module.scss';
import {
    EventStreamContentType,
    fetchEventSource,
} from '@microsoft/fetch-event-source';
import { API_BASE_URL } from '@configs/env';
import { useAppBridge } from '@shopify/app-bridge-react';
import downloadjs from 'downloadjs';
import * as htmlToImage from 'html-to-image';
import { MessageReport } from './MessageReport';

type Step = {
    key: string;
    value: string;
    status: 'success' | 'loading' | 'error' | 'waiting';
};

type Message =
    | {
          type: 'message';
          data: string;
          isAgent: boolean;
      }
    | {
          type: 'report';
          data: Record<string, any>;
          isAgent: boolean;
      }
    | {
          type: 'suggestions';
          data: string[];
          isAgent: boolean;
      };

export default function ConversionTableReport() {
    const navigate = useNavigate();
    const shopify = useAppBridge();
    const [value, setValue] = useState('');
    const [steps, setSteps] = useState<Step[]>([
        {
            key: 'capture_homepage_screenshot',
            value: 'Capture Homepage Screenshot',
            status: 'waiting',
        },
        {
            key: 'analyze_ux_ui_with_html',
            value: 'Analyze UX/UI with HTML',
            status: 'waiting',
        },
        {
            key: 'compile_data_generate_report',
            value: 'Compile Data & Generate Report',
            status: 'waiting',
        },
        {
            key: 'suggest_shopify_apps_for_issue_resolution',
            value: 'Suggest Shopify Apps for Issue Resolution',
            status: 'waiting',
        },
    ]);

    const [messages, setMessages] = useState<Message[]>([
        {
            data: 'Hi Dong, how can I help you today?',
            isAgent: true,
            type: 'message',
        },
        {
            data: 'I want to Audit Homepage',
            isAgent: false,
            type: 'message',
        },
        {
            isAgent: true,
            type: 'report',
            data: {
                report_executive_summary:
                    'This audit evaluates the homepage of an online store focusing on elements crucial for conversion, such as the hero section, navigation, product highlights, and footer. Several opportunities for improvement have been identified, which could significantly enhance user engagement and trust, ultimately boosting conversion rates.',
                elements: {
                    general: {
                        why_audit:
                            'The general layout and presentation of the homepage significantly influence the initial impression, engagement, and conversion rates.',
                        element_score: {
                            clarity: 4,
                            engagement: 3,
                            trust: 3,
                            usability: 4,
                        },
                        current_situation:
                            'The homepage has a visually appealing hero section with a clear headline and prominent CTA, but lacks urgency signals.',
                        key_issues: [
                            'Hero section lacks urgency despite clear message',
                            'Limited use of trust signals in the hero area',
                            'Visuals do not strongly differentiate from competitors',
                        ],
                        recommendations: [
                            "Add urgency signals such as 'Limited Time Only' to the hero section.",
                            'Incorporate trust badges or customer ratings near the CTA.',
                            'Use unique visuals that align with brand identity to stand out.',
                        ],
                        conversion_impact:
                            'Enhancements in the hero section could improve engagement and click-through rates by 10-20%.',
                    },
                    navigation: {
                        why_audit:
                            'Effective navigation is critical to ensuring users can easily find products, enhancing user experience and conversion rates.',
                        element_score: {
                            clarity: 5,
                            engagement: 4,
                            trust: 4,
                            usability: 5,
                        },
                        current_situation:
                            'The navigation is clear and logical, with precise category labels and a sticky header for easy access.',
                        key_issues: [
                            'Lacks feedback on active navigation state',
                            'No visible indication of a search function in navigation',
                        ],
                        recommendations: [
                            'Add active state feedback to navigation elements.',
                            'Ensure the search bar is prominently visible in the navigation.',
                        ],
                        conversion_impact:
                            'Improved navigation can enhance user experience and reduce bounce rates, potentially increasing conversions by 5-15%.',
                    },
                    product_highlights: {
                        why_audit:
                            'Highlighting products effectively can captivate and convert visitors by showcasing value and driving purchase intent.',
                        element_score: {
                            clarity: 4,
                            engagement: 3,
                            trust: 3,
                            usability: 4,
                        },
                        current_situation:
                            'Product highlights are visually appealing with clear images and descriptions, but the copy lacks persuasive elements.',
                        key_issues: [
                            'Descriptions are factual but not persuasive',
                            'Lack of social proof directly associated with product highlights',
                        ],
                        recommendations: [
                            'Enhance product descriptions with persuasive language focused on benefits.',
                            'Include customer reviews or star ratings with product highlights.',
                        ],
                        conversion_impact:
                            'Optimizing product highlights can improve user engagement and increase sales by 10-20%.',
                    },
                    footer: {
                        why_audit:
                            'A footer consolidates essential information and trust signals, enhancing credibility and ease of navigation.',
                        element_score: {
                            clarity: 4,
                            engagement: 3,
                            trust: 5,
                            usability: 4,
                        },
                        current_situation:
                            'The footer contains crucial information like policy links and contact details but lacks strong visual elements to attract attention.',
                        key_issues: [
                            'No social media links or visual trust icons',
                            'Back to Top feature is missing',
                        ],
                        recommendations: [
                            'Add social media links with follower counts to enhance social proof.',
                            "Include trust badges and a 'Back to Top' link for improved usability.",
                        ],
                        conversion_impact:
                            'Enhancing the footer with social proof and navigation features can increase trust and encourage further exploration, boosting conversions by 5-10%.',
                    },
                },
            },
        },
        {
            isAgent: true,
            type: 'suggestions',
            data: [
                'I want to Audit Homepage',
                'I want to Audit Product Page',
                'I want to Audit Collection Page',
            ],
        },
    ]);
    const [abortController, setAbortController] = useState(
        new AbortController()
    );
    const isAudited = useMemo(() => {
        return messages.some(
            (message) =>
                message.data === 'I want to Audit Homepage' ||
                message.data === 'I want to Audit Product Page' ||
                message.data === 'I want to Audit Collection Page'
        );
    }, [messages]);

    const handleChange = useCallback(
        (newValue: string) => setValue(newValue),
        []
    );

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!value.trim()) return;
        setMessages([
            ...messages,
            {
                data: value,
                isAgent: false,
                type: 'message',
            },
        ]);
        setValue('');
    };

    const handleSuggestionClick = async (suggestion: string) => {
        try {
            setMessages((prevMessages) => {
                // remove all message has type = suggestions
                const newMessages = prevMessages.filter(
                    (message) => message.type !== 'suggestions'
                );
                return [
                    ...newMessages,
                    {
                        data: suggestion,
                        isAgent: false,
                        type: 'message',
                    },
                ];
            });

            setSteps((prevSteps) => {
                return prevSteps.map((step, index) => {
                    if (index === 0) {
                        return {
                            ...step,
                            status: 'loading',
                        };
                    }
                    return step;
                });
            });

            await fetchEventSource(API_BASE_URL + '/audit/get-workflow', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',

                    'ngrok-skip-browser-warning': '1',
                },
                openWhenHidden: true,
                signal: abortController.signal,
                onmessage(ev) {
                    console.log(ev);
                    if (ev.data) {
                        const data = JSON.parse(ev.data) as Step;
                        console.log(data);
                        const stepIndex = steps.findIndex(
                            (step) => step.key === data.key
                        );
                        setSteps((prevSteps) => {
                            return prevSteps.map((step, index) => {
                                if (index === stepIndex) {
                                    return {
                                        ...step,
                                        status: data.status,
                                    };
                                }
                                if (index === stepIndex + 1) {
                                    return {
                                        ...step,
                                        status: 'loading',
                                    };
                                }
                                return step;
                            });
                        });
                        if (
                            data.key ===
                                'suggest_shopify_apps_for_issue_resolution' &&
                            data.status === 'success'
                        ) {
                            handleCancelStream();
                            setMessages((prevMessages) => {
                                return [
                                    ...prevMessages,
                                    {
                                        isAgent: true,
                                        type: 'message',
                                        data: 'Here are some suggestions for you',
                                    },
                                ];
                            });
                        }
                    }
                },
                async onopen(response) {
                    // if (
                    //     response.ok &&
                    //     response?.headers
                    //         ?.get('content-type')
                    //         .includes(EventStreamContentType)
                    // ) {
                    //     return; // everything's good
                    // } else {
                    //     throw new Error();
                    // }
                },
                onerror(err) {
                    throw err;
                },
                onclose() {
                    return;
                },
            });
        } catch (error) {
            console.log(error);
            setSteps((prevSteps) => {
                return prevSteps.map((step, index) => {
                    if (step.status === 'loading') {
                        return {
                            ...step,
                            status: 'error',
                        };
                    }
                    return step;
                });
            });
            shopify.toast.show('Something went wrong. Please try again.');
        }
    };

    const handleCancelStream = () => {
        abortController.abort();
        setAbortController(new AbortController());
    };

    const handleExportImage = () => {
        const node = document.getElementById('root');
        htmlToImage
            .toPng(node as HTMLElement)
            .then((dataUrl) => {
                downloadjs(dataUrl, 'chat.png', 'image/png');
            })
            .catch((err) => {
                console.error('oops, something went wrong!', err);
            });
    };

    return (
        <Page
            backAction={{
                content: 'Products',
                onAction: () => {
                    navigate(EAppRouter.root);
                },
            }}
            title="Conversion"
            primaryAction={{
                content: 'Cancel Stream',
                onAction: handleCancelStream,
            }}
        >
            <Grid>
                <Grid.Cell columnSpan={{ xs: 6, lg: 8 }}>
                    <Card>
                        <BlockStack gap="200" inlineAlign="start">
                            <Text as="h2" variant="headingSm">
                                Conversion
                            </Text>
                            <div className={styles.Wrapper}>
                                <div className={styles.Group}>
                                    {messages.map((message, index) => {
                                        if (message.type === 'suggestions') {
                                            return (
                                                <Box
                                                    key={index}
                                                    paddingBlock="200"
                                                >
                                                    <InlineStack
                                                        gap="200"
                                                        align="center"
                                                    >
                                                        {message.data.map(
                                                            (
                                                                suggestion,
                                                                index
                                                            ) => (
                                                                <Button
                                                                    key={index}
                                                                    onClick={() =>
                                                                        handleSuggestionClick(
                                                                            suggestion
                                                                        )
                                                                    }
                                                                >
                                                                    {suggestion}
                                                                </Button>
                                                            )
                                                        )}
                                                    </InlineStack>
                                                </Box>
                                            );
                                        }
                                        if (message.type === 'report') {
                                            return (
                                                <MessageReport
                                                    data={message.data}
                                                />
                                            );
                                        }
                                        return (
                                            <div
                                                key={index}
                                                className={
                                                    styles.MessageWrapper
                                                }
                                                style={{
                                                    justifyContent:
                                                        message.isAgent
                                                            ? 'flex-start'
                                                            : 'flex-end',
                                                }}
                                            >
                                                <div
                                                    className={styles.Message}
                                                    style={{
                                                        backgroundColor:
                                                            message.isAgent
                                                                ? 'transparent'
                                                                : 'var(--p-color-bg-inverse',
                                                        color: message.isAgent
                                                            ? ''
                                                            : 'var(--p-color-text-brand-on-bg-fill)',
                                                    }}
                                                >
                                                    {message.type ===
                                                        'message' &&
                                                        message.data}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <Box width="100%">
                                    {
                                        <Form onSubmit={handleSubmit}>
                                            <TextField
                                                label={false}
                                                autoComplete="off"
                                                placeholder="Type a message"
                                                value={value}
                                                onChange={handleChange}
                                            ></TextField>
                                        </Form>
                                    }
                                </Box>
                            </div>
                        </BlockStack>
                    </Card>
                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 6, lg: 4 }}>
                    <Card>
                        <BlockStack gap="200" inlineAlign="start">
                            <Text as="h2" variant="headingSm">
                                Workflow
                            </Text>
                            <BlockStack gap="200" inlineAlign="start">
                                {steps.map((step) => (
                                    <InlineStack
                                        gap="150"
                                        key={step.key}
                                        align="start"
                                    >
                                        {step.status === 'success' && (
                                            <Icon
                                                source={CheckCircleIcon}
                                                tone="base"
                                            />
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
                                                >
                                                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                                                </svg>
                                            </div>
                                        )}
                                        {step.status === 'error' && (
                                            <Icon
                                                source={AlertTriangleIcon}
                                                tone="critical"
                                            />
                                        )}
                                        {step.status === 'waiting' && (
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
                                            >
                                                <path d="M10.1 2.182a10 10 0 0 1 3.8 0" />
                                                <path d="M13.9 21.818a10 10 0 0 1-3.8 0" />
                                                <path d="M17.609 3.721a10 10 0 0 1 2.69 2.7" />
                                                <path d="M2.182 13.9a10 10 0 0 1 0-3.8" />
                                                <path d="M20.279 17.609a10 10 0 0 1-2.7 2.69" />
                                                <path d="M21.818 10.1a10 10 0 0 1 0 3.8" />
                                                <path d="M3.721 6.391a10 10 0 0 1 2.7-2.69" />
                                                <path d="M6.391 20.279a10 10 0 0 1-2.69-2.7" />
                                            </svg>
                                        )}
                                        <Text as="span">{step.value}</Text>
                                    </InlineStack>
                                ))}
                            </BlockStack>
                        </BlockStack>
                    </Card>
                </Grid.Cell>
            </Grid>
        </Page>
    );
}
