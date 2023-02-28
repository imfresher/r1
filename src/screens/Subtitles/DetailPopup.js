import { useState, useEffect } from 'react';
import { Row, Col, Button, Form, Input, Space, Modal } from 'antd';

function DetailPopup({
  itemSeleted,
  isPopupOpen,
  onPopupCancel,
  onPopupOpen,
  ...rest
}) {
  const [item, setItem] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    setItem(itemSeleted);
    // return subtitleActions.resetSubtitles;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemSeleted]);

  const handleDetailCancel = () => {
    onPopupCancel(false);
  };

  const handleDetailSubmit = () => {
    onPopupOpen(false);
  };

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <Modal
        title={item ? `Subtitle Edit - ${item.language}` : 'Subtitle Edit'}
        open={isPopupOpen}
        onOk={handleDetailSubmit}
        onCancel={handleDetailCancel}
      >
        DetailPopup
        <Row>
          <Col className="gutter-row" span={12}>
            <Form
              form={form}
              name="subtitleLanguagesForm"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label=""
                name="start_time"
                rules={[{ required: true, message: 'Please fill a start time subtitle' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label=""
                name="end_time"
                rules={[{ required: true, message: 'Please fill a end time subtitle' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="text"
                label=""
              >
                <Input.TextArea />
              </Form.Item>
            </Form>
          </Col>
          <Col className="gutter-row" span={12}>
            Col2
          </Col>
        </Row>
      </Modal>
    </div>
  );
}

export default DetailPopup;
