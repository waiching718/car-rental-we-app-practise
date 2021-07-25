import React from "react";
import { Row, Col, Typography } from "antd";
import '../css/Home.scss';
import Container from "@material-ui/core/Container";

const { Title, Paragraph, Text } = Typography;

const Home = () =>{
    return(
        <>
            <Row>
                <Col className="banner" span={24} >
                    <img src={require("../img/home.jpg")} alt="home"/>
                </Col>
            </Row>
            <Container>
                <Typography>
                    <Title>Welcome</Title>
                    <Paragraph>
                        In the process of internal desktop applications development, many different design specs and
                        implementations would be involved, which might cause designers and developers difficulties and
                        duplication and reduce the efficiency of development.
                    </Paragraph>
                    <Paragraph>
                        After massive project practice and summaries, Ant Design, a design language for background
                        applications, is refined by Ant UED Team, which aims to
                        <Text strong>
                            uniform the user interface specs for internal background projects, lower the unnecessary
                            cost of design differences and implementation and liberate the resources of design and
                            front-end development
                        </Text>.
                    </Paragraph>

                    <Paragraph>
                        Scroll <Text keyboard>Down</Text> to see more...
                    </Paragraph>
                    <Row>
                        <Col  xs={22} sm={22} md={11} lg={11} xl={11}>

                        </Col>
                        <Col  xs={22} sm={22} md={11} lg={11} xl={11}>

                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>3</Col>
                    </Row>
                    <Row>
                        <Col span={24}>4</Col>
                    </Row>
                </Typography>
            </Container>

        </>
    );
}
export default Home;
