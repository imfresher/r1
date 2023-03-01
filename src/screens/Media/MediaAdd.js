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
  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
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
          <div>{steps[current].content}</div>
          <div style={{ marginTop: 24 }}>
            {current > 0 && (
              <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                Previous
              </Button>
            )}
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => next()}>
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
