import React, {useState, useEffect} from 'react';
import { Layout, Menu } from 'antd';
import { PictureOutlined,  BarChartOutlined, TagOutlined } from '@ant-design/icons';
import {useNavigate, Outlet} from 'react-router';
const { Header, Content, Footer, Sider } = Layout;

const HomeLayout = (props) => {
  const [keys, setKeys] = useState(['/']);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    navigate('/');
    setKeys(['/']);
  }, []);

  const go=({ item, key, keyPath, domEvent })=> {
    //onClik那里虽然看不到传值,但是默认会传过来四个参数,详见官网
    setKeys(keyPath);
    navigate(key); //编程式导航
  }

  return (
    <Layout className={'layout'}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={broken => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        {/*<div className="logo" >*/}
        {/*  <DoubleLeftOutlined style={{color: '#fff'}} />*/}
        {/*</div>*/}
        <Menu theme="dark" onClick={go} mode="inline" selectedKeys={keys}>
          <Menu.Item key="/" icon={<BarChartOutlined />}>数据展示</Menu.Item>
          <Menu.Item key="/comic" icon={<PictureOutlined />}>漫画</Menu.Item>
          {/*<Menu.Item key="/origin" icon={<TagOutlined />}>缘由</Menu.Item>*/}
          {/*<Menu.Item key="/sign" icon={<PictureOutlined />}>签名</Menu.Item>*/}
        </Menu>
      </Sider>
      <Layout>
        <Header className="site-layout-sub-header-background" />
        <Content style={{ margin: '24px 16px 0', padding: 24, background: '#fff' }}>
          <div className="site-layout-background">
            {/*content*/}
            {/*相当于this.props.children*/}
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          <a href="https://beian.miit.gov.cn/" target="_blank">粤ICP备18102156号</a>
        </Footer>
      </Layout>
    </Layout>
  );
}

export default HomeLayout