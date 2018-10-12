import React, { Component } from 'react';
import theme from './Theme/theme'
import { MuiThemeProvider } from '@material-ui/core/styles';
import Navigation from './Navigation/Switch';
import { BrowserRouter } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <MuiThemeProvider theme={theme}>
            {Navigation}
          </MuiThemeProvider>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
