import React from 'react'
import { EditOutlined, EllipsisOutlined} from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import { Link } from 'react-router-dom';
const { Meta } = Card;

const Card_list = ({imgercard,titlecard,describecard,tinhnang}) => {
  return (
    <div style={{padding:'12px'}} align="center">
        <Card 
            style={{ width: 200,borderColor:'black'}}
            // cover={
            //     <img
            //         height="121px"
            //         alt="example"
            //         src={imgercard}
            //     />
            //     }
            actions={tinhnang ? [
                // <SettingOutlined key="setting" title='đóng lì xì' />,
                <EditOutlined key="edit" title='chỉnh sửa'/>,
                <Link to="/profile/li-xi-ca-nhan/thongtin">
                    <EllipsisOutlined key="ellipsis" title='thông tin'/>,
                </Link>
                
                ]:[]}
        >
            <Meta
            avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
            title={titlecard}
            description={describecard}
            />
        </Card>
    </div>
  )
}

export default Card_list