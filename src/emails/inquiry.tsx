import * as React from 'react';
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Row,
  Column,
  Heading,
  Text,
  Hr,
  Tailwind,
} from '@react-email/components';

interface InquiryEmailProps {
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  customerCompany?: string;
  product?: string;
  details?: Record<string, string | number>;
}

const InquiryEmail = (props: InquiryEmailProps) => {
  const {
    customerName = "John Doe",
    customerEmail = "john@example.com",
    customerPhone = "",
    customerCompany = "",
    product = "VPS Hosting",
    details = { Plan: "CX22", vCPU: "2 Cores", RAM: "4 GB", "Monthly Price": "$4.82" },
  } = props;

  const detailEntries = Object.entries(details).filter(([, v]) => v !== undefined && v !== "");
  const now = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" });

  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white max-w-[600px] mx-auto rounded-[8px] shadow-sm">
            {/* Header */}
            <Section className="bg-[#111827] text-white p-[32px] rounded-t-[8px]">
              <Heading className="text-[24px] font-bold m-0 text-center">
                New Inquiry
              </Heading>
              <Text className="text-[16px] m-0 text-center mt-[8px] opacity-90">
                {product}
              </Text>
            </Section>

            {/* Customer Details */}
            <Section className="p-[32px] pb-[16px]">
              <Heading className="text-[20px] font-bold text-gray-800 mb-[16px] m-0">
                Customer Details
              </Heading>
              <Row>
                <Column className="w-[50%]">
                  <Text className="text-[14px] text-gray-600 m-0 mb-[4px] font-semibold">
                    Name:
                  </Text>
                  <Text className="text-[16px] text-gray-800 m-0 mb-[12px]">
                    {customerName}
                  </Text>
                  {customerPhone && (
                    <>
                      <Text className="text-[14px] text-gray-600 m-0 mb-[4px] font-semibold">
                        Phone:
                      </Text>
                      <Text className="text-[16px] text-gray-800 m-0">
                        {customerPhone}
                      </Text>
                    </>
                  )}
                </Column>
                <Column className="w-[50%]">
                  <Text className="text-[14px] text-gray-600 m-0 mb-[4px] font-semibold">
                    Email:
                  </Text>
                  <Text className="text-[16px] text-gray-800 m-0 mb-[12px]">
                    {customerEmail}
                  </Text>
                  {customerCompany && (
                    <>
                      <Text className="text-[14px] text-gray-600 m-0 mb-[4px] font-semibold">
                        Company:
                      </Text>
                      <Text className="text-[16px] text-gray-800 m-0">
                        {customerCompany}
                      </Text>
                    </>
                  )}
                </Column>
              </Row>
            </Section>

            <Hr className="border-gray-200 border-solid my-[16px] mx-[32px]" />

            {/* Order Details */}
            {detailEntries.length > 0 && (
              <Section className="px-[32px] pb-[16px]">
                <Heading className="text-[20px] font-bold text-gray-800 mb-[12px] m-0">
                  Order Details
                </Heading>
                <div className="border border-solid border-gray-200 rounded-[4px]">
                  {detailEntries.map(([key, value], index) => (
                    <Row key={key} className={`p-[12px] ${index !== detailEntries.length - 1 ? 'border-b border-solid border-gray-200' : ''}`}>
                      <Column className="w-[40%]">
                        <Text className="text-[14px] text-gray-600 m-0 font-semibold">
                          {key}
                        </Text>
                      </Column>
                      <Column className="w-[60%] text-right">
                        <Text className="text-[16px] text-gray-800 m-0 font-semibold">
                          {String(value)}
                        </Text>
                      </Column>
                    </Row>
                  ))}
                </div>
              </Section>
            )}

            <Hr className="border-gray-200 border-solid my-[16px] mx-[32px]" />

            {/* Timestamp */}
            <Section className="px-[32px] pb-[32px]">
              <Text className="text-[14px] text-gray-600 m-0 mb-[4px] font-semibold">
                Submitted:
              </Text>
              <Text className="text-[16px] text-gray-800 m-0">
                {now}
              </Text>
            </Section>

            {/* Footer */}
            <Section className="bg-gray-50 p-[32px] rounded-b-[8px] border-t border-solid border-gray-200">
              <Text className="text-[14px] text-gray-600 text-center m-0 mb-[8px]">
                This inquiry was submitted via momtaz.ws
              </Text>
              <Hr className="border-gray-300 border-solid my-[16px]" />
              <Text className="text-[12px] text-gray-500 text-center m-0">
                Momtaz Host | support@momtaz.ws
              </Text>
              <Text className="text-[12px] text-gray-500 text-center m-0 mt-[4px]">
                © {new Date().getFullYear()} Momtaz Host. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

InquiryEmail.PreviewProps = {
  customerName: "Ahmad Karimi",
  customerEmail: "ahmad@example.com",
  customerPhone: "+93 799 123 456",
  customerCompany: "Karimi Tech",
  product: "VPS Hosting",
  details: {
    Plan: "CX22",
    vCPU: "2 Cores",
    RAM: "4 GB",
    Storage: "40 GB NVMe",
    OS: "Ubuntu 24.04",
    Datacenter: "Falkenstein",
    "Monthly Price": "$4.82",
  },
};

export default InquiryEmail;
