import React from 'react';
import { Page, Navbar, Link, Block, BlockTitle } from 'framework7-react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

const YandexMap = () => (
  <YMaps>
    <Map defaultState={{ center: [56.486112, 84.958607], zoom: 14 }} width={"100%"} height={"30%"}>
      <Placemark geometry={[56.486112, 84.958607]} />
    </Map>
  </YMaps>
);

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hits: null };
  }
  render() {
   return (
    <Page style={{backgroundColor: "#fff"}}>
    <img src="https://edaplus.info/food_pictures/banana.jpg" width="100%" />
        <Navbar title="Продукт" backLink="Назад"></Navbar>
        <Block strong>
          <h1>Бананы</h1>
          <h4>150 ккал</h4>
          <p>Категория: фрукты</p>
          <p>Бананы - очень полезны и питательны для организма. Они содержат большое количество относительно редкого витамина В6, калия и клетчатки, а также целый ряд микроэлементов: железо, медь, цинк, селен, магний, кальций и фосфор. Также считается, что те, кто регулярно употребляют бананы в значительно меньшей степени подвержены риску раковых и сердечных заболеваний.</p>
        </Block>
        <BlockTitle>Магазины рядом:</BlockTitle>
        <YandexMap />
        <br />
      </Page>
    )
  }
};
