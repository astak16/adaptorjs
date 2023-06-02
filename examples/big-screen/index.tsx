import styled from "styled-components";
import AutoAdjust from "../../packages";
import { useEffect, useRef, useState } from "react";
import { PolygonLayer, Scene, GaodeMap } from "@antv/l7";
import fullScreenIcon from "./full-screen.png";
import LineChart from "./line-chart";
import dayjs from "dayjs";
import { Select } from "antd";
const { Option } = Select;

export default () => {
  const [time, setTime] = useState<string>();
  const timerRef = useRef<number>();
  useEffect(() => {
    new AutoAdjust({
      querySelector: ".big-screen1",
      extraQuerySelectors: [".dropdown__select"],
    });
    initTime();
  }, []);
  useEffect(() => {
    fetch(
      "https://gw.alipayobjects.com/os/bmw-prod/d6da7ac1-8b4f-4a55-93ea-e81aa08f0cf3.json"
    )
      .then((res) => res.json())
      .then((data) => {
        const scene = new Scene({
          id: "map",
          map: new GaodeMap({
            center: [110.770672, 34.159869],
            zoom: 3,
          }),
        });
        const chinaPolygonLayer = new PolygonLayer({})
          .source(data)
          .color("name", [
            "rgb(239,243,255)",
            "rgb(189,215,231)",
            "rgb(107,174,214)",
            "rgb(49,130,189)",
            "rgb(8,81,156)",
          ]);
        scene.addLayer(chinaPolygonLayer);
      });
  }, []);
  const initTime = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setTime(dayjs().format("YYYY-MM-DD HH:mm:ss"));
    }, 1000);
  };
  const onClickFillScreen = () => {
    // document.fullscreenElement();
    if (!document.fullscreenElement) {
      // 如果未进入全屏模式，则切换到全屏模式
      document.documentElement.requestFullscreen();
    } else {
      // 如果已经进入全屏模式，则退出全屏模式
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };
  function handleChange(value: string) {
    console.log(`selected ${value}`);
  }
  return (
    <Rooted className="big-screen1">
      <Header>
        <div className="left__component">{time}</div>
        <div className="title">可视化一张图</div>
        <div className="right__component">
          <img src={fullScreenIcon} onClick={onClickFillScreen} />
        </div>
      </Header>
      <Content>
        <Left>
          <SelectStyled>
            <Select
              defaultValue="lucy"
              style={{ width: 120 }}
              onChange={handleChange}
              popupClassName="dropdown__select"
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="disabled" disabled>
                Disabled
              </Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </SelectStyled>
          <LineChart style={{ height: 300 }} />
          <LineChart style={{ height: 300 }} />
          <LineChart style={{ height: 300 }} />
        </Left>
        <Center>
          <div id="map" />
        </Center>
        <Right>
          <LineChart style={{ height: 300 }} />
          <LineChart style={{ height: 300 }} />
          <LineChart style={{ height: 300 }} />
        </Right>
      </Content>
    </Rooted>
  );
};

const Rooted = styled.div`
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  position: relative;
  .title {
    font-size: 60px;
  }
  .left__component {
    position: absolute;
    left: 10px;
    top: 36px;
  }
  .right__component {
    position: absolute;
    right: 10px;
    top: 20px;
    cursor: pointer;
    img {
      height: 46px;
    }
  }
`;
const Content = styled.div`
  display: flex;
  height: 100%;
`;
const Left = styled.div`
  width: 450px;
`;
const Right = styled.div`
  width: 450px;
`;
const Center = styled.div`
  flex: 1;
  position: relative;
  #map {
    height: 400px;
    width: 400px;
  }
`;

const SelectStyled = styled.div``;
