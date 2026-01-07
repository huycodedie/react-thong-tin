import React, { useState } from "react";
import "./style.css";
import { Space, Input, InputNumber, message, DatePicker } from "antd";
import TableList from "../../../../components/TableComponents/Table_List";
// import {datajs} from './data.js'
import { CopyOutlined } from "@ant-design/icons";
// import anh from '../../../../../image/anh.jpg';
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import * as ProfileService from "../../../../services/ProfileService";

const onOk = (value) => {
  console.log("onOk: ", value);
};

const Envelope = () => {
  const location = useLocation();
  // const [data, setData] = useState([]);
  const [text, setText] = useState("50");
  const [messageApi, contextHolder] = message.useMessage();
  const [textvh, setTextVh] = useState("50");

  const idLuckyBox = location.state;
  const hand = (value) => {
    setText(value);
  };
  const handvh = (value) => {
    setTextVh(value);
  };

  const fetchGetEnvelopeUser = async () => {
    const res = await ProfileService.getUserBoxLiXi(idLuckyBox?.id);
    return res;
  };

  const fetchDeleteUserEnvelope = async (user) => {
    const res = await ProfileService.deleteUserBoxLiXi(idLuckyBox?.id, user);
    await refetch();
    return res;
  };

  const { data, refetch } = useQuery({
    queryKey: ["getEnvelope", idLuckyBox?.id], // key phải nằm trong object
    queryFn: fetchGetEnvelopeUser,
    enabled: !!idLuckyBox?.id,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
  });
  console.log("data", data);
  console.log("data lisst", data?.data.listUser);

  const valueInput = idLuckyBox?.id;

  const copy = () => {
    navigator.clipboard
      .writeText(valueInput)
      .then(() => messageApi.success("Đã sao chép"))
      .catch(() => messageApi.error("Sao chép thất bại"));
  };

  //    useEffect(() => {
  //   fetch('https://t.lixitet.top/api/the_loai')
  //     .then(response => response.json())
  //     .then(json => {
  //       const dataWithKey = json.map((item, index) => ({
  //         ...item,
  //         key: item.id_tl || index

  //       }));
  //       setData(dataWithKey);
  //     })
  //     .catch(error => console.error('Lỗi khi fetch:', error));
  // }, []);
  return (
    <>
      <div className="container-envelope">
        <h2>Tên lì xì: {data?.data.nameEnvelope} </h2>
      </div>
      <div style={{ padding: "15px" }}>
        <div style={{ paddingLeft: "15px", paddingTop: "15px" }}>
          <Space direction="vertical" align="center">
            <div style={{ display: "flex", alignItems: "center" }}>
              <span>Mã: </span>
              <Input
                placeholder="..."
                maxLength={60}
                value={valueInput}
                readOnly
              />
              <CopyOutlined style={{ paddingLeft: "5px" }} onClick={copy} />
              {contextHolder}
            </div>
          </Space>
        </div>
        <div className="input-gioihan">
          <div>
            <label style={{ display: "block" }}>
              Giá giới hạn {text} nghìn{" "}
            </label>
            <InputNumber
              min={1}
              max={999999}
              className="input-gh"
              value={text}
              onChange={hand}
            />
          </div>
          <div style={{ display: "" }}>
            <label style={{ paddingLeft: "0px", display: "block" }}>
              số lượng
            </label>
            <InputNumber
              style={{ width: "50px" }}
              min={1}
              max={10}
              defaultValue={2}
            />
          </div>
        </div>
        <div style={{ paddingTop: "10px" }}>
          <label style={{ display: "block" }}>Giá vô hạn {textvh} nghìn </label>
          <InputNumber
            min={1}
            max={999999}
            className="input-gh"
            value={textvh}
            onChange={handvh}
          />
        </div>

        {/* ngày bắt đầu và kết thúc */}

        <div className="container-time">
          <div>
            <div>
              <label style={{ display: "block" }}>Ngày bắt đầu:</label>
              <DatePicker
                showTime
                onChange={(value, dateString) => {
                  console.log("Selected Time: ", value);
                  console.log("Formatted Selected Time: ", dateString);
                }}
                onOk={onOk}
              />
            </div>
          </div>
          <div style={{ paddingTop: "10px" }}>
            <label style={{ display: "block" }}>Ngày kết thúc:</label>
            <DatePicker
              showTime
              onChange={(value, dateString) => {
                console.log("Selected Time: ", value);
                console.log("Formatted Selected Time: ", dateString);
              }}
              onOk={onOk}
            />
          </div>
        </div>
      </div>
      <TableList
        data={data?.data.listUser}
        DeleteUserEnvelope={fetchDeleteUserEnvelope}
      />
    </>
  );
};

export default Envelope;
