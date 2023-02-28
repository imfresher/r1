import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { Button, Form, Select, Space, Modal } from 'antd';
import { subtitlesAtom } from '../../store';
import { useSubtitleActions } from '../../actions';

const { Option } = Select;

const languages = [
  {
    code: 'vi',
    name: 'Vietnamese (VN)',
    flag: '🇺🇸',
  },
  {
    code: 'us',
    name: 'American (USA)',
    flag: '🇺🇸',
  },
  {
    code: 'zh',
    name: 'Chinese (中国)',
    flag: '🇨🇳',
  },
];

export default function Subtitles() {
  const subtitles = useRecoilValue(subtitlesAtom);
  const subtitleActions = useSubtitleActions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    subtitleActions.getAll();

    return subtitleActions.resetSubtitles;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        console.log(values);
        const { language } = values;
        const languageSeleted = languages.find(x => x.code === language);

        subtitleActions.store({
          language: languageSeleted.name,
          languageCode: languageSeleted.code,
          languageFullCode: languageSeleted.code,
          content: null,
        });
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <h1>Subtitles</h1>

      <div className="register">
        <Button type="primary" onClick={showModal}>
          Open Modal
        </Button>
        <Modal title="Subtitle Languages" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
              label="Language"
              name="language"
              rules={[{ required: true, message: 'Please choose a subtitle language!' }]}
            >
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Choose a subtitle language"
                optionFilterProp="children"
                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
              >
                {languages.map((language, index) => (<Option value={language.code} label={language.name} key={index}>
                  <Space>
                    <span role="img" aria-label={language.name}>{language.flag}</span>
                    {language.name}
                  </Space>
                </Option>))}
              </Select>
            </Form.Item>

            {/*<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>*/}
          </Form>
        </Modal>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th style={{ width: '80%' }}>Languages</th>
            <th style={{ width: '20%' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subtitles?.map(subtitle =>
            <tr key={subtitle.id}>
              <td>{subtitle.language}</td>
              <td style={{ whiteSpace: 'nowrap' }}>
                <button onClick={() => {}} className="btn btn-sm btn-danger" style={{ width: '60px' }}>
                  <span>Delete</span>
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
