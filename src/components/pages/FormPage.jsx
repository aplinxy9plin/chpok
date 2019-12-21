import React from 'react';
import {
  Page,
  Navbar,
  List,
  ListItem,
  Input,
  Label,
  Toggle,
  BlockTitle,
  Row,
  Button,
  Range,
  Block,
  Popup,
  Link,
  Toolbar,
  Tabs,
  Tab,
  SwipeoutActions,
  SwipeoutButton,
  Col
} from 'framework7-react';

import not_found_image from './not.png'

const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);
var items;
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { posts: [], text: '' };
    // this.state = { hits: null };
    this.jir = React.createRef();
    this.uglevod = React.createRef();
    this.belki = React.createRef();
    this.kalorii = React.createRef();
    this.enterData = this.enterData.bind(this);
    this.asd = [];
    if(localStorage.getItem('id') == undefined){
      this.state = {
        popupOpened: true,
      }
    }else{
      this.state = {
        popupOpened: false,
      }
    }
    async function getImgae (name, index){
      const rawResponse = await fetch(`https://pixabay.com/api/?key=14692501-48f4193959b15584fe38ac0eb&q=${name}&lang=ru&category=food`);
      const content = await rawResponse.json();
      // console.log(content.hits[0].webformatURL);
      var json_products = JSON.parse(localStorage.getItem("products"))
      json_products[index].image = content.hits.length > 0 ? content.hits[0].webformatURL : not_found_image
      localStorage.setItem("products", JSON.stringify(json_products))
    }
    if(localStorage.getItem('status')){
      if(localStorage.getItem('id') && localStorage.getItem('status') == 'generate_product'){
        fetch('http://localhost:1337/data?id='+localStorage.getItem('id'), {mode: 'cors'})
        .then(response => response.json())
        .then((body) => {
          localStorage.setItem('products', JSON.stringify(body));
          for (let i = 0; i < body.length; i++) {
            getImgae(body[i].food_name, i)
          }
          localStorage.setItem('status', 'work');
        });
      }
      if(localStorage.getItem('id') && localStorage.getItem('status') == 'work'){
        var products = JSON.parse(localStorage.getItem('products'))
        items = products.map((number, index) =>
          <ListItem
            swipeout
            onSwipeoutDeleted={this.onDeleted.bind(this)}
            link="/product-info/"
            title={number.food_name}
            after="20 ₽"
            subtitle={"Калорий: "+number.Calories}
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
            ref={(ref) => this.asd[index] = ref}
          >
            <SwipeoutActions right>
              <SwipeoutButton color="red" onClick={this.onDeleted.bind(this, number, index)}>Заменить</SwipeoutButton>
            </SwipeoutActions>
            <img slot='media' src={number.image} width='80' />
          </ListItem>
        )
      }
    }
    // const element = (
    //   <div>
    //     <h1>Hello, world!</h1>
    //     <h2>It is {new Date().toLocaleTimeString()}.</h2>
    //   </div>
    // );
    // // highlight-next-line
    // render(element, document.getElementById('my_div'));
  }

  enterData(){
    var jir = this.jir.current.__reactRefs.inputEl.value,
        uglevod = this.uglevod.current.__reactRefs.inputEl.value,
        belki = this.belki.current.__reactRefs.inputEl.value,
        kalorii = this.kalorii.current.__reactRefs.inputEl.value;
    console.log(jir);
    console.log('http://localhost:1337/insert?jir='+jir+'&uglevod='+uglevod+'&belki='+belki+'&kalorii='+kalorii)
    fetch('http://localhost:1337/insert?jir='+jir+'&uglevod='+uglevod+'&belki='+belki+'&kalorii='+kalorii, {mode: 'cors'})
    .then(response => response.json())
    .then((body) => {
      console.log(body);
      localStorage.setItem('id', body.id)
      localStorage.setItem('status', 'generate_product');
      window.location.reload();
    });
  }
  // .then(response => {
  //   console.log(response);
  //   localStorage.setItem('id', JSON.stringify(response));
  //   localStorage.setItem('status', 'generate_product');
  // })
  onDeleted = (nubmer, index, e) => {
    var products = JSON.parse(localStorage.getItem('products'))
    for (var i = 0; i < products.length; i++) {
      if(products[i].food_name == this.asd[index].props.title){
        var cals = products[i].Calories,
            name = products[i].food_name
        fetch('http://localhost:1337/change_product?kalorii='+cals+'&name='+name, {mode: 'cors'})
        .then(response => response.text())
        .then((body) => {
          products.splice(index, 1, JSON.parse(body))
          localStorage.setItem('products', JSON.stringify(products))
          window.location.reload();
        });
      }
    }
  }

  render() {
   return (
     <Page>

      <Navbar title="Корзина" />

        <Toolbar tabbar labels bottomMd={this.state.isBottom}>
          <Link tabLink="#tab-1" tabLinkActive text="Корзина" iconIos="f7:bag" iconMd="material:email"></Link>
          <Link tabLink="#tab-2" text="Расписание" iconIos="f7:today_fill" iconMd="material:today"></Link>
          <Link tabLink="#tab-3" text="Настройки" iconIos="f7:bars" iconMd="material:file_upload"></Link>
        </Toolbar>

        <Tabs>
          <Tab id="tab-1" className="page-content" tabActive>
            <Block>
            <BlockTitle>Продукты</BlockTitle>
            <List mediaList>
            {items}
            {/*<ListItem
              swipeout
              onSwipeoutDeleted={this.onDeleted.bind(this)}
              link="/product-info/"
              title="Бананы"
              after="15 ₽"
              subtitle="Фрукты"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."

            >
              <SwipeoutActions right>
                <SwipeoutButton delete>Delete</SwipeoutButton>
              </SwipeoutActions>
              <img slot="media" src="https://edaplus.info/food_pictures/banana.jpg" width="80" />
            </ListItem>
            <ListItem
              swipeout
              onSwipeoutDeleted={this.onDeleted.bind(this)}
              link="/product-info/"
              title="Яблоки"
              after="30 ₽"
              subtitle="Фрукты"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."

            >
              <SwipeoutActions right>
                <SwipeoutButton delete>Delete</SwipeoutButton>
              </SwipeoutActions>
              <img slot="media" src="https://images.ua.prom.st/728972690_w640_h640_red_apple.jpeg" width="80" />
            </ListItem>
            <ListItem
              swipeout
              onSwipeoutDeleted={this.onDeleted.bind(this)}
              link="/product-info/"
              title="Курица"
              after="300 ₽"
              subtitle="Мясо"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."

            >
              <SwipeoutActions right>
                <SwipeoutButton delete>Delete</SwipeoutButton>
              </SwipeoutActions>
              <img slot="media" src="https://s16.stc.all.kpcdn.net/share/i/12/9920392/inx960x640.jpg" width="80" />
            </ListItem>
            <ListItem
              swipeout
              onSwipeoutDeleted={this.onDeleted.bind(this)}
              link="/product-info/"
              title="Йогурт"
              after="50 ₽"
              subtitle="Молочные"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."

            >
              <SwipeoutActions right>
                <SwipeoutButton delete>Delete</SwipeoutButton>
              </SwipeoutActions>
              <img slot="media" src="http://prinevskoe.ru/assets/images/production/milk/s_Jogurt-bez-nachinki-250g.JPG" width="80" />
            </ListItem>
            <ListItem
              swipeout
              onSwipeoutDeleted={this.onDeleted.bind(this)}
              link="/product-info/"
              title="Салат"
              after="20 ₽"
              subtitle="Овощи"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."

            >
              <SwipeoutActions right>
                <SwipeoutButton delete>Заменить</SwipeoutButton>
              </SwipeoutActions>
              <img slot="media" src="http://chtoem.ru/wp-content/uploads/2015/12/salat.jpg" width="80" />
            </ListItem>*/}
            </List>
            <Button className="col" big fill raised style={{background: "rgb(255, 224, 51)", color: "black"}}><b>Заказать доставку</b></Button>
            </Block>
          </Tab>
          <Tab id="tab-2" className="page-content">
            <Block>
              <p>Tab 2 content</p>
              ...
              <ul>
                {listItems}
                {items}
              </ul>
              <div id="my_div">

              </div>
            </Block>
          </Tab>
          <Tab id="tab-3" className="page-content">
            <Block>
              <p>Tab 3 content</p>
              ...
            </Block>
          </Tab>
        </Tabs>




        <Popup className="demo-popup" opened={this.state.popupOpened} onPopupClosed={() => this.setState({popupOpened : false})}>
        <Page>
        <Navbar title="Ввод данных" />
        <BlockTitle>Данные</BlockTitle>
        <List form formdata>
          <ListItem>
            <Label>Жиры</Label>
            <Input ref={this.jir} type="number" placeholder="Жиры" />
          </ListItem>
          <ListItem>
            <Label>Углеводы</Label>
            <Input ref={this.uglevod} type="number" placeholder="Углеводы" />
          </ListItem>
          <ListItem>
            <Label>Белки</Label>
            <Input ref={this.belki} type="number" placeholder="Белки" />
          </ListItem>
          <ListItem>
            <Label>Сумма калорий</Label>
            <Input ref={this.kalorii} type="number" placeholder="Сумма калорий" />
          </ListItem>
          <ListItem>
            <Label>Деньги</Label>
            <Input type="number" placeholder="Сколько денег вы готовы потратить" />
          </ListItem>
        </List>
        <Block>
        <Button popupOpen=".demo-popup" onClick={this.enterData} className="col" big fill raised color="green">Создать меню</Button>
        </Block>
        </Page>
        </Popup>

      </Page>
    )
  }
}
