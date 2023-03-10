import { InboxOutlined } from '@ant-design/icons';
import { message, Form, Upload } from 'antd';

export default function StepUploadVideo() {
  const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }

      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    }
  };

  const normalizingFileUpload = (event) => {
      if (Array.isArray(event)) {
          return event;
      }
      return event && event.fileList;
  };

  return (
    <>
      <Form.Item
        name='video'
        valuePropName='fileList'
        getValueFromEvent={normalizingFileUpload}
        rules={[
          {
            required: true,
            message: 'This cannot be empty'
          },
        ]}
      >
        <Upload.Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from uploading company data or other
            band files
          </p>
        </Upload.Dragger>
      </Form.Item>
    </>
  );
}
