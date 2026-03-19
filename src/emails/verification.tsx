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

interface VerificationEmailProps {
    name: string;
    url: string;
}

export const VerificationEmail = ({
    name = "Valued Customer",
    url = "#",
}: VerificationEmailProps) => {
    return (
        <Html lang="en" dir="ltr">
            <Tailwind>
                <Head />
                <Body className="bg-gray-100 font-sans py-[40px]">
                    <Container className="bg-white rounded-[8px] px-[32px] py-[40px] max-w-[600px] mx-auto border border-gray-200">
                        {/* Header */}
                        <Section>
                            <Text className="text-[24px] font-bold text-gray-900 mb-[16px] mt-0">
                                Verify Your Momtaz Host Account
                            </Text>
                            <Text className="text-[16px] text-gray-700 mb-[24px] mt-0">
                                Hi {name},
                            </Text>
                            <Text className="text-[16px] text-gray-700 mb-[24px] mt-0">
                                Thank you for choosing Momtaz Host! To complete your registration and start managing your services, please verify your email address by clicking the button below.
                            </Text>
                        </Section>

                        {/* Verification Button */}
                        <Section className="text-center mb-[32px]">
                            <Button
                                href={url}
                                className="bg-[#0070f3] text-white px-[32px] py-[16px] rounded-[8px] text-[16px] font-semibold no-underline box-border inline-block"
                            >
                                Verify Email Address
                            </Button>
                        </Section>

                        {/* Alternative Link */}
                        <Section>
                            <Text className="text-[14px] text-gray-600 mb-[24px] mt-0 text-center">
                                If the button above doesn't work, you can copy and paste this link into your browser:
                            </Text>
                            <Text className="text-[14px] text-blue-600 mb-[24px] mt-0 break-all text-center">
                                {url}
                            </Text>
                            <Text className="text-[14px] text-gray-600 mb-[32px] mt-0 text-center italic">
                                This verification link will expire in 24 hours for security reasons.
                            </Text>
                        </Section>

                        <Hr className="border-gray-200 mb-[32px]" />

                        {/* Security Notice */}
                        <Section>
                            <Text className="text-[14px] text-gray-600 mb-[16px] mt-0">
                                <strong>Security tip:</strong> If you didn't create an account with us, please ignore this email. Your email address will not be added to our system.
                            </Text>
                            <Text className="text-[14px] text-gray-600 mb-[32px] mt-0">
                                If you have any questions, feel free to contact our support team.
                            </Text>
                        </Section>

                        <Hr className="border-gray-200 mb-[32px]" />

                        {/* Footer */}
                        <Section>
                            <Text className="text-[12px] text-gray-500 mb-[8px] mt-0 font-bold">
                                Best regards,<br />
                                The Momtaz Host Team
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

export default VerificationEmail;
