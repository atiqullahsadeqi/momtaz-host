import * as React from 'react';
import {
    Html,
    Head,
    Body,
    Container,
    Section,
    Text,
    Button,
    Hr,
    Tailwind,
} from '@react-email/components';

interface ResetPasswordEmailProps {
    name: string;
    url: string;
}

export const ResetPasswordEmail = ({
    name = "Valued Customer",
    url = "#",
}: ResetPasswordEmailProps) => {
    return (
        <Html lang="en" dir="ltr">
            <Tailwind>
                <Head />
                <Body className="bg-gray-100 font-sans py-[40px]">
                    <Container className="bg-white rounded-[8px] px-[32px] py-[40px] max-w-[600px] mx-auto border border-gray-200">
                        {/* Header */}
                        <Section>
                            <Text className="text-[24px] font-bold text-gray-900 mb-[16px] mt-0">
                                Reset Your Password
                            </Text>
                            <Text className="text-[16px] text-gray-700 mb-[24px] mt-0">
                                Hi {name},
                            </Text>
                            <Text className="text-[16px] text-gray-700 mb-[24px] mt-0">
                                We received a request to reset the password for your Momtaz Host account. If you didn't request this, you can safely ignore this email.
                            </Text>
                        </Section>

                        {/* Action Button */}
                        <Section className="text-center mb-[32px]">
                            <Button
                                href={url}
                                className="bg-black text-white px-[32px] py-[16px] rounded-[8px] text-[16px] font-semibold no-underline box-border inline-block"
                            >
                                Reset Password
                            </Button>
                        </Section>

                        {/* Alternative Link */}
                        <Section>
                            <Text className="text-[14px] text-gray-600 mb-[24px] mt-0 text-center">
                                Or copy and paste this link into your browser:
                            </Text>
                            <Text className="text-[14px] text-blue-600 mb-[24px] mt-0 break-all text-center">
                                {url}
                            </Text>
                        </Section>

                        <Hr className="border-gray-200 mb-[32px]" />

                        {/* Security Notice */}
                        <Section>
                            <Text className="text-[14px] text-gray-600 mb-[32px] mt-0">
                                For security reasons, this link will expire in 1 hour. If you continue to have trouble accessing your account, please contact our support team.
                            </Text>
                        </Section>

                        <Hr className="border-gray-200 mb-[32px]" />

                        {/* Footer */}
                        <Section>
                            <Text className="text-[12px] text-gray-500 mb-[8px] mt-0 font-bold">
                                Momtaz Host Security Team
                            </Text>
                            <Text className="text-[12px] text-gray-500 mb-[16px] mt-0 m-0">
                                Momtaz Host, Afghanistan<br />
                                https://momtaz.ws
                            </Text>
                            <Text className="text-[12px] text-gray-500 mt-0 m-0 text-center w-full">
                                © {new Date().getFullYear()} Momtaz Host. All rights reserved.
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default ResetPasswordEmail;
