import { EAppRouter } from '@routes/type';
import { Form, Page, TextField } from '@shopify/polaris';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ConversionHistory.module.scss';
import html2canvas from 'html2canvas-pro';
import downloadjs from 'downloadjs';

type Message = {
    value: string;
    id: number;
    isBot: boolean;
};

export default function ConversionHistory() {
    const [value, setValue] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            value: 'Hello',
            isBot: true,
        },
        {
            id: 2,
            value: 'Hi',
            isBot: false,
        },
    ]);
    const navigate = useNavigate();

    const handleChange = useCallback(
        (newValue: string) => setValue(newValue),
        []
    );

    const handleCallApi = async () => {
        try {
            console.log('Call API');
            html2canvas(
                document.querySelector('#AppFrameMain') as HTMLElement
            ).then((canvas) => {
                console.log(canvas);
                const image = canvas.toDataURL('image/png');
                downloadjs(image, 'chat.png', 'image/png');
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!value.trim()) return;
        setMessages([
            ...messages,
            {
                id: messages.length + 1,
                value,
                isBot: false,
            },
        ]);
        console.log(value);
    };
    return (
        <Page
            backAction={{
                content: 'Products',
                onAction: () => {
                    navigate(EAppRouter.root);
                },
            }}
            title="Conversion History"
            primaryAction={{ content: 'Call API', onAction: handleCallApi }}
        >
            <div
                className={styles.Wrapper}
                id="chat"
                style={{
                    height: window.innerHeight - 56 - 28 + 'px',
                }}
            >
                <div className={styles.Group}>
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={styles.MessageWrapper}
                            style={{
                                justifyContent: message.isBot
                                    ? 'flex-start'
                                    : 'flex-end',
                            }}
                        >
                            <div
                                className={styles.Message}
                                style={{
                                    backgroundColor: message.isBot
                                        ? 'lightblue'
                                        : 'lightgreen',
                                }}
                            >
                                {message.value}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="w-full">
                    <Form onSubmit={handleSubmit}>
                        <TextField
                            label={false}
                            autoComplete="off"
                            placeholder="Type a message"
                            value={value}
                            onChange={handleChange}
                        ></TextField>
                    </Form>
                </div>
            </div>
        </Page>
    );
}
