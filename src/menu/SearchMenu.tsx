import {Select, Button} from 'antd';
import {
  SearchOutlined ,
} from '@ant-design/icons';
const { Option } = Select;

const SearchMenu = (props: any) => {
  return(
    <div className="form-group">
      <p className="label">집계기준</p>
      <div className="form">
        <Select defaultValue="year" className="select-layout"  onChange={props.onChange} >
          <Option value="year">년</Option>
          <Option value="quarter">분기</Option>
          <Option value="week">주기</Option>
        </Select>
        <Button icon={<SearchOutlined />} size="middle" onClick={props.onClick}>
          조회
        </Button>
      </div>
    </div>

)

};

export default SearchMenu ;