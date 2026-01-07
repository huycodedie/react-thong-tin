import React, { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import './stype.css'
const App = ({data, DeleteUserEnvelope}) => {
  console.log('dataaaa',data)
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex, nestedKey = null) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
    onFilter: (value, record) => {
      const fieldValue = nestedKey
        ? record[dataIndex]?.[nestedKey]   // Nếu có nestedKey thì lấy sâu bên trong
        : record[dataIndex];

      return fieldValue
        ? fieldValue.toString().toLowerCase().includes(value.toLowerCase())
        : false;
    },
    render: (text, record) => {
      const value = nestedKey
        ? record[dataIndex]?.[nestedKey]
        : text;

      return searchedColumn === dataIndex
        ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={value ? value.toString() : ''}
          />
        ) : (
          value
        );
    }

  });
  const columns = [
    {
      title: 'Name',
    dataIndex: 'user', // user là object
    key: 'name',
    width: '30%',
    render: (user) => user?.name || '—',   // 👈 Lấy name từ object user
    ...getColumnSearchProps('user', 'name'),
    },
    {
      title: 'Số tiền',
      dataIndex: 'valuemoney',
      key: 'valuemoney',
      width: '20%',
      ...getColumnSearchProps('valuemoney'),
    },
    {
      title: 'T/g Nhận',
      dataIndex: 'receivingTime',
      key: 'receivingTime',
      ...getColumnSearchProps('receivingTime'),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      ...getColumnSearchProps('status')
    },{
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <button className="link-button">Sửa</button>
        <button className="link-button" onClick={()=>{const userId = record.user?._id; DeleteUserEnvelope(userId)}}>Delete</button>
      </Space>
    ),
  },
  ];
  return <Table columns={columns} dataSource={data} />;
};
export default App;