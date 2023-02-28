import { useState, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Layout, Row, Col, Card, Button, Form, Select, Space, Modal, Typography, Dropdown } from 'antd';
import { MoreOutlined, GlobalOutlined } from '@ant-design/icons';
import DetailPopup from './DetailPopup';
import LineLayout from '../../components/LineLayout';
import { history, from } from '../../helper';
import { subtitlesAtom } from '../../store';
import { useSubtitleActions } from '../../actions';
import './subtitles.css';

const { Content } = Layout;
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
  const setSubtitles = useSetRecoilState(subtitlesAtom);
  const subtitleActions = useSubtitleActions();
  const [initLoading, setInitLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [subtitleSeleted, setSubtitleSeleted] = useState(null);
  const [form] = Form.useForm();

  // setSubtitles(subtitlesState);

  useEffect(() => {
    subtitleActions.getAll().then((data) => {
      setInitLoading(false);
      setSubtitles(data);
    });

    // return subtitleActions.resetSubtitles;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showDetailModal = (item) => {
    setSubtitleSeleted(item);
    setIsDetailModalOpen(true);
  };

  const handleDetailSubmit = () => {
    setIsDetailModalOpen(false);
  };

  const handleDetailCancel = () => {
    setIsDetailModalOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        const { language } = values;
        const languageSeleted = languages.find(x => x.code === language);
        const newItem = {
          language: languageSeleted.name,
          languageCode: languageSeleted.code,
          languageFullCode: languageSeleted.code,
          content: null,
        };

        subtitleActions.store(newItem).then(setSubtitles((prev) => {
          return [
            ...prev,
            newItem
          ];
        }));

        history.push(from);
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

  const handleDownload = () => {

  };

  const handleEdit = () => {

  };

  const handleDelete = (id) => {
    console.log('ID: ', id);
    subtitleActions.destroy(id);
  };

  const handleAction = (e, item) => {
    switch (e.key) {
      case 'download':
        handleDownload();
        break;
      case 'edit':
        showDetailModal(item);
        break;
      case 'delete':
        handleDelete(item.id);
        break;
      default:
        // code block
    }
  };

  const actionItems = [
    {
      key: 'download',
      label: 'Download',
    },
    // {
    //   key: 'edit',
    //   label: 'Edit',
    // },
    {
      key: 'delete',
      label: 'Delete',
    }
  ];

  return (
    <Content style={{ padding: '0 50px' }}>
      <h1>Subtitles</h1>

      <Row>
        <Col className="gutter-row" span={8} offset={8}>
          <Card title="Subtitle Languages">
            {subtitles?.map((item, index) => (<LineLayout key={index} onClick={() => showDetailModal(item)}>
              <Typography.Title level={5} style={{ margin: 0 }}>{item.language}</Typography.Title>
              <Dropdown menu={{ items: actionItems, onClick: (e) => handleAction(e, item) }} placement="bottomRight">
                <a onClick={(e) => e.preventDefault()}>
                  <MoreOutlined />
                </a>
              </Dropdown>
            </LineLayout>))}
            <div className="register">
              <Button
                type="primary"
                size="large"
                icon={<GlobalOutlined />}
                onClick={showModal}
                block
              >Add language</Button>
              <Modal title="Subtitle Languages" open={isModalOpen} onOk={handleSubmit} onCancel={handleCancel}>
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
                </Form>
              </Modal>
            </div>
          </Card>
        </Col>
      </Row>
      <DetailPopup
        itemSeleted={subtitleSeleted}
        isPopupOpen={isDetailModalOpen}
        onPopupOpen={handleDetailSubmit}
        onPopupCancel={handleDetailCancel}
      />
    </Content>
  );
};
