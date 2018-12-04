import React from 'react';
import {
    Page,
    Navbar,
    NavLeft,
    NavTitle,
    NavRight,
    Link,
    Toolbar,
    Block,
    BlockTitle,
    List,
    ListItem,
    Row,
    Col,
    Button,
    LoginScreen,
    LoginScreenTitle,
    ListButton,
    BlockFooter
} from 'framework7-react';

// export default class extends React.Component {
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       username: '',
//       password: '',
//     };
//   }
//
//   render() {
//     return (
//       <Page noToolbar noNavbar noSwipeback loginScreen>
//         <LoginScreenTitle>Framework7</LoginScreenTitle>
//         <List form>
//           <ListInput
//             label="Username"
//             type="text"
//             placeholder="Your username"
//             value={this.state.username}
//             onInput={(e) => {
//               this.setState({ username: e.target.value});
//             }}
//           />
//           <ListInput
//             label="Password"
//             type="password"
//             placeholder="Your password"
//             value={this.state.password}
//             onInput={(e) => {
//               this.setState({ password: e.target.value});
//             }}
//           />
//         </List>
//         <List>
//           <ListButton onClick={this.signIn.bind(this)}>Sign In</ListButton>
//           <BlockFooter>Some text about login information.<br />Lorem ipsum dolor sit amet, consectetur adipiscing elit.</BlockFooter>
//         </List>
//       </Page>
//     )
//   }
//   signIn() {
//     const self = this;
//     const app = self.$f7;
//     const router = self.$f7router;
//     app.dialog.alert(`Username: ${self.state.username}<br>Password: ${self.state.password}`, () => {
//       router.back();
//     });
//   }
// }


// function test(){
//   console.log('fuck you');
//   alert(123)
// }

export default class extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {isToggleOn: true};
  //
  //   // This binding is necessary to make `this` work in the callback
  //   this.handleClick = this.handleClick.bind(this);
  // }
  //
  // handleClick() {
  //   // alert(123)
  //   this.setState(state => ({
  //     isToggleOn: !state.isToggleOn
  //   }));
  // }
  constructor(props) {
    super(props);
    this.state = { hits: null };
  }

  onSearch = (e) => {
    e.preventDefault();

    const { value } = this.test;

    if (value === '') {
      return;
    }
    console.log(value);
  }

  onSetResult = (result) => {
    this.setState({ hits: result.hits });
  }
  render() {
   return (
      <Page>
        <Navbar>
          <NavLeft>
            <Link iconIos="f7:menu" iconMd="material:menu" panelOpen="left"></Link>
          </NavLeft>
          <NavTitle>My App</NavTitle>
          <NavRight>
            <Link iconIos="f7:menu" iconMd="material:menu" panelOpen="right"></Link>
          </NavRight>
        </Navbar>
        <Toolbar>
          <Link>Left Link</Link>
          <Link>Right Link</Link>
        </Toolbar>
        <Block strong>
          <p>Here is your blank Framework7 app. Let's see what we have here.</p>
        </Block>
        <BlockTitle>Navigation</BlockTitle>
        <List>
          <ListItem link="/about/" title="About"></ListItem>
          <ListItem link="/form/" title="Form"></ListItem>
        </List>
        <BlockTitle>Modals</BlockTitle>
        <Block strong>
        <form onSubmit={this.onSearch}>
          <input type="text" ref={node => this.test = node} />
          <button type="submit">Search</button>
        </form>
        <Block>
          <Button raised big fill loginScreenOpen=".demo-login-screen">As Overlay</Button>
        </Block>
          <Row>
            <Col width="50">
              <Button fill raised onClick={this.handleClick}>Popup</Button>
            </Col>
            <Col width="50">
              <Button fill raised loginScreenOpen="#login-screen">Login Screen</Button>
            </Col>
          </Row>
        </Block>
        <BlockTitle>Panels</BlockTitle>
        <Block strong>
          <Row>
            <Col width="50">
              <Button fill raised panelOpen="left">Left Panel</Button>
            </Col>
            <Col width="50">
              <Button fill raised panelOpen="right">Right Panel</Button>
            </Col>
          </Row>
        </Block>
        <List>
          <ListItem link="/dynamic-route/blog/45/post/125/?foo=bar#about" title="Dynamic Route"></ListItem>
          <ListItem link="/load-something-that-doesnt-exist/" title="Default Route (404)"></ListItem>
        </List>
      </Page>
    )
  }
}
