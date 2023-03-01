import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Form, Input } from 'antd';
import { videoAtom } from '../../store';

export default function StepInfo() {
  const video = useRecoilValue(videoAtom);
  const setVideo = useSetRecoilState(videoAtom);

  return (
    <>
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please fill a video title' }]}
      >
        <Input />
      </Form.Item>
    </>
  );
}
