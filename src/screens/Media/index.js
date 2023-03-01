import { Link } from "react-router-dom";
import { Layout, Row, Col, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

function Media() {
  return (
    <Layout.Content style={{ padding: '0 50px' }}>
      <h1>Media</h1>

      <Row>
        <Col className="gutter-row" span={8} offset={8}>
          <Link to="/medias/add">
            <Button
              type="primary"
              size="large"
              icon={<PlusOutlined />}
              block
            >Add Media</Button>
          </Link>
        </Col>
      </Row>
    </Layout.Content>
  );
}

export default Media;
