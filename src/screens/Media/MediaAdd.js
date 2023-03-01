import { useState } from 'react';
import { Layout, Row, Col, Card, Button, Form, Select, Steps, message } from 'antd';
import { InfoCircleOutlined, VideoCameraAddOutlined, FileImageOutlined, SmileOutlined } from '@ant-design/icons';
import StepInfo from './StepInfo';
import StepUploadVideo from './StepUploadVideo';
import StepUploadThumbnail from './StepUploadThumbnail';

const steps = [
  {
    title: 'Media Information',
    status: 'finish',
    icon: <InfoCircleOutlined />,
    content: <StepInfo />,
  },
  {
    title: 'Upload Video',
    status: 'wait',
    icon: <VideoCameraAddOutlined />,
    content: <StepUploadVideo />,
  },
  {
    title: 'Upload Thumbnail',
    status: 'wait',
    icon: <FileImageOutlined />,
    content: <StepUploadThumbnail />,
  },
  {
    title: 'Complete!',
    status: 'wait',
    icon: <SmileOutlined />,
  },
];

function MediaAdd() {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const handleNext = async () => {
    try {
        await form.validateFields();
        setCurrent((prev) => prev + 1);
    } catch {}
  };

  const handlePrev = () => {
    setCurrent(current - 1);
  };

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Layout.Content style={{ padding: '0 50px' }}>
      <h1>MediaAdd</h1>

      <Row>
        <Col className="gutter-row" span={16}>
          <Steps
            current={current}
            items={items}
          />

          <div style={{ padding: '50px 0 20px' }}>
            <Form
              form={form}
              name="subtitleLanguagesForm"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 12 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >{steps[current].content}</Form>
          </div>

          <div style={{ marginTop: 24 }}>
            {current > 0 && (
              <Button style={{ margin: '0 8px' }} onClick={() => handlePrev()}>
                Previous
              </Button>
            )}
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => handleNext()}>
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button type="primary" onClick={() => message.success('Processing complete!')}>
                Done
              </Button>
            )}
          </div>
        </Col>
      </Row>
    </Layout.Content>
  );
}

export default MediaAdd;
